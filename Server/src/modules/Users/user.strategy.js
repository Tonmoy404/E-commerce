const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { findUser } = require("./user.controller");

module.exports = () => {
	function cookieExtractor(req) {
		let token = null;

		if (req && req.signedCookies) {
			console.log("------<><>");
			token = req.headers.authorization.split(" ")[1];
		}
		return token;
	}

	passport.use(
		"user-jwt",
		new Strategy(
			{
				secretOrKey: process.env.JWT_SECRET,
				jwtFromRequest: cookieExtractor,
			},
			async function (payload, done) {
				const user = await findUser(payload.email);
				if (!user) return done(null, false);

				done(null, user);
			}
		)
	);
};
