const User = require("./user.model");
const jwt = require('jsonwebtoken');

async function createUser(req, res) {
	try {
		const { email, firstName, lastName, password } = req.body;
		const existUser = await User.findOne({
			where: { email },
		});

		if (existUser) return res.status(400).send("User Already Exists");

		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
		});

		return res.status(201).send(user);
	} catch (err) {
		console.log(err);
		return res.status(500).send("Internal Server Error");
	}
}

async function logIn(req, res) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({
			where: { email },
		});
		console.log("The user-->", user);
		if (!user || !user.password || !user.validPassword(password))
			return res.status(400).send("Invalid Credentials");

		const token = jwt.sign(
			{
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				password: user.password,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h", issuer: user.email }
		);
		
		console.log("nice token--->", token);
		res.cookie("access_token", token, {
			httpOnly: true,
		});

		return res.status(200).send(token);
	} catch (Err) {
		console.log("---------->", Err);
		return res.status(500).send("Internal Server Error");
	}
}

async function updateUser(req, res) {
	try {
		const { firstName, lastName } = req.body;
		const email = req.body.user;

		const user = await User.findOne({
			where: { email },
		});

		if (!user) return res.status(404).send("User not found");

		await User.update(
			{
				firstName,
				lastName,
			},
			{ where: { email } }
		);

        const updatedUser = await User.findOne({
            where: { email }
        });
        return res.status(201).send(updatedUser);
	} catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function findUser(id) {
	try {
		const user = await User.findOne({
			where: { id },
		});
		return user;
	} catch (Err) {
		console.log(Err);
	}
}

module.exports.createUser = createUser;
module.exports.logIn = logIn;
module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
