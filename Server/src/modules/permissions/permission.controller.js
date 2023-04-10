const Permission = require("./permission.model");

async function createPermission(req, res) {
	try {
		const { name, services } = req.body;
		const created_by = req.user.id;

		const existPermission = await Permission.findOne({
			where: { name },
		});

		if (existPermission)
			return res.status(400).send("Permmsion Already Exists");

		const servicejson = JSON.stringify(services);

		const permission = await Permission.create({
			name,
			services: servicejson,
			created_by,
		});

		res.status(201).send(permission);
	} catch (Err) {
		console.log(Err);
		res.status(500).send("Internal Server Error");
	}
}

async function getPermission(req, res) {
	try {
		const { id } = req.params.id;

		const findPermission = await Permission.findOne({
			where: { id },
		});

		if (!findPermission) return res.status(404).send("Permission not Found");

		res.status(200).send(findPermission);
	} catch (Err) {
		console.log(Err);
		res.status(500).send("Internal Server Error");
	}
}

async function updatePermission(req, res) {
	try {
		const { name, services } = req.body;
		const permission_id = req.params.id;
		const updated_by = req.user.id;

		const permission = await Permission.findOne({
			where: { id: permission_id },
		});

		if (!permission) return res.status(404).send("Permission was not found");

		const serviceJson = JSON.stringify(services);

		await Permission.create({
			name,
			services: serviceJson,
			updated_by,
		});

		const updatedPermission = await Permission.findOne({
			where: { id: permission_id },
		});
		res.status(200).send(updatedPermission);
	} catch (err) {
		console.log(err);
		req.status(500).send("Internal Server Error");
	}
}

async function deletePermission(req, res) {
	try {
		const { id } = req.params.id;

		const findPermission = await Permission.findOne({
			where: { id },
		});

		if (!findPermission)
			return res.status(404).send("Permission Was not found");

		await permission.destroy();

		const allPermission = await Permission.findAll();
		res.status(200).send(allPermission);
	} catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	}
}

module.exports.createPermission = createPermission;
module.exports.getPermission = getPermission;
module.exports.updatePermission = updatePermission;
module.exports.deletePermission = deletePermission;
