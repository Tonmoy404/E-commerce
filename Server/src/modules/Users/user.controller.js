const User = require("./user.model");
const jwt = require('jsonwebtoken');
const { send } = require('../../config/lib/email-service/email.service')

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

		const options = {
			to: email,
			subjct: "Greetings",
			text: "Thanks for Creating Account",
			html: "<b> Thanks for Creating Account </b>"

		}
		await send(options);

		return res.status(201).send(user);
	} catch (err) {
		console.log(err);
		return res.status(500).send("Internal Server Error");
	}
}

async function getUsers(req, res){
	try{
		const users = await User.findAll({
			attributes: { exclude: ["password"]}
		});

		res.status(200).send(users);
	}
	catch(err){
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
}

async function getUser(req, res){
	const userId = req.params.id;

	const user = await User.findAll({
		where: { id: userId }
	});
	if(!user) return res.status(404).send("User not found");

	res.status(200).send(user);
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
		delete user.dataValues.password;

		res.cookie("access_token", token, {
			httpOnly: true,
		});

		return res.status(200).send(user);
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


async function logOut(req, res){
	try{
		res.clearCookie("access_token");

		res.status(200).send("Logout Successfully");
	}
	catch(Err){
		console.log(Err);
		res.status(500).send("Internal Server Error");
	}
}

module.exports.createUser = createUser;
module.exports.logIn = logIn;
module.exports.findUser = findUser;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.getUsers = getUsers;
module.exports.logOut = logOut;
