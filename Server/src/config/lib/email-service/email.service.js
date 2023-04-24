const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp-mail.outlook.com",
	port: 587,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},
	// secure: true,
    service: "hotmail"
});

async function send(options) {
	try {
        console.log("Tonmoy");
        options.from = `"E-commerce" <${process.env.EMAIL}>`
		const info = await transporter.sendMail(options);

        console.log({
            message: "Mail Sent",
            messageId: info.messageId
        })
	} catch (err) {
		console.log(err);
	}
}

module.exports.send = send;
