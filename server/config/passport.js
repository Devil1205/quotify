const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/quotifyAuthAPI/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let email = profile.emails?.[0]?.value;
        // fallback if email is not in profile
        if (!email) {
          const res = await fetch("https://api.github.com/user/emails", {
            headers: {
              Authorization: `token ${accessToken}`,
              "User-Agent": "node.js",
            },
          });
          const emails = await res.json();
          email = emails.find((e) => e.primary && e.verified)?.email;
        }

        let user = await User.findOne({ email }).select("-password");

        if (!user) {
          user = await User.create({
            githubId: profile.id,
            name: profile.displayName || profile.username,
            email,
          });
        } else if (!user.githubId) {
          user.githubId = profile.id;
          await user.save();
        }

        const token = jwt.sign(
          { user: { id: user._id } },
          process.env.JWT_SECRET,
          {
            expiresIn: "20d",
          }
        );

        return done(null, { user, token });
      } catch (err) {
        return done(err, false);
      }
    }
  )
);
