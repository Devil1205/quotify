const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://quotifyapi.onrender.com/quotifyAuthAPI/github/callback",
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

passport.use(
  new MicrosoftStrategy(
    {
      clientID: process.env.MICROSOFT_CLIENT_ID,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
      callbackURL: "https://quotifyapi.onrender.com/quotifyAuthAPI/microsoft/callback",
      scope: ["user.read"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await User.create({
            microsoftId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        } else if (!user.microsoftId) {
          user.microsoftId = profile.id;
          await user.save();
        }

        const token = jwt.sign(
          { user: { id: user._id } },
          process.env.JWT_SECRET,
          { expiresIn: "20d" }
        );

        done(null, { user, token });
      } catch (err) {
        done(err, false);
      }
    }
  )
);
