const express = require("express");
const router = express.Router();
const User = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt_secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const passport = require("passport");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//loginUser Route
router.post(
  "/quotifyAuthAPI/login",

  //Req Res function
  async (req, res) => {
    //Return if email or phone not unique
    try {
      //checking user credentials
      // console.log(req.body);
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email/password" });
      }
      const passCompare = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passCompare) {
        return res.status(400).json({ error: "Invalid email/password" });
      }
      //Return valid user
      const payload = {
        user: {
          id: user._id,
        },
      };
      user = await User.findOne({ email: req.body.email }).select("-password");
      const authToken = jwt.sign(payload, jwt_secret, { expiresIn: "20d" });
      res.status(200).json({ user, authToken });
    } catch (e) {
      // console.log(e);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post("/quotifyAuthAPI/google", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    let user = await User.findOne({ email: payload.email }).select("-password");

    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        googleId: payload.sub,
      });
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      await user.save();
    }

    const authToken = jwt.sign(
      { user: { id: user._id } },
      process.env.JWT_SECRET,
      {
        expiresIn: "20d",
      }
    );

    res.json({ user, authToken });
  } catch (err) {
    res.status(400).json({ message: "Google token verification failed" });
  }
});

// GitHub login
router.get(
  "/quotifyAuthAPI/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub callback
router.get(
  "/quotifyAuthAPI/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "http://localhost:5173/#/user",
  }),
  (req, res) => {
    const { token } = req.user;
    const user = JSON.stringify(req.user.user);
    res.redirect(`http://localhost:5173/#/?token=${token}&user=${user}`);
  }
);

module.exports = router;
