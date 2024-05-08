const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./config/passport-setup");
require("dotenv").config();

const app = express();

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

// Define routes here
app.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile"],
	})
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		failureRedirect: "/login",
	}),
	(req, res) => {
		// Successful authentication, redirect home.
		res.redirect("/");
	}
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
