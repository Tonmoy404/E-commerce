const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { findUser } = require("./user.controller");

module.exports = function() {
	function cookieExtractor(req) {
		let token = null;
		console.log("marker--->", req.headers);

		if (req && req.headers.authorization) {
			token = req.headers.authorization.split(" ")[1];
		}
		console.log("TOken-----<><>", token);
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
				console.log("----payload", payload)
				console.log("Payload Id ---->", payload.id);
				const user = await findUser(payload.id);
				if (!user) return done(null, false);

				done(null, user);
			}
		)
	);
};
