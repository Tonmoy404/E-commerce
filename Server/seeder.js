// const async = require("async");

// async function init() {
// 	const config = require('./src/config');
// 	config.initEnvironmentVariables();

// 	const sequelize = require("./src/config/lib/sequelize");

// 	await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

// 	const Permission = require("./src/modules/permissions/permission.model");
// 	const ServicePermission = require("./src/modules/permissions/service_permission.model");
// 	const Profile = require("./src/modules/profile/profile.model");
// 	const PermissionProfile = require("./src/modules/profile/permission-profile.model");
// 	const Service = require("./src/modules/service/service.model");
// 	const User = require("./src/modules/Users/user.model");

// 	function userSeeder(cb) {
// 		User.findOrCreate({
// 			where: { email: "admin@ecommerce.com" },
// 			defaults: {
// 				firstName: "System",
// 				lastName: "Admin",
// 				password: "adminPass",
// 			},
// 		}).then((users) => {
// 			cb(null, users[0].id);
// 		});
// 	}

// 	function profileSeeder(userId, cb) {
// 		const profiles = [
// 			{
// 				name: "System Admin",
// 				description: "Tonmoy",
// 				type: "standard",
// 				created_by: userId,
// 				updated_by: userId,
// 			},
// 			{
// 				name: "Customer",
// 				description: "Rifat",
// 				type: "standard",
// 				created_by: userId,
// 				updated_by: userId,
// 			},
// 			{
// 				name: "Vendor",
// 				description: "Rabby",
// 				type: "standard",
// 				created_by: userId,
// 				updated_by: userId,
// 			},
// 		];

// 		Profile.destroy({ truncate: { cascade: true } }).then(() => {
// 			Profile.bulkCreate(profiles, {
// 				returning: true,
// 				ignoreDuplicates: false,
// 			}).then(() => {
// 				cb(null, userId);
// 			});
// 		});
// 	}

//     function userUpdateSeeder(userId, callback) {
//         User.findOne({ where: { id: userId } }).then((admin) => {
//             Profile.findOne({ where: { name: "System Admin" } }).then(
//                 (systemAdminProfile) => {
//                     admin.update({ profile_id: systemAdminProfile.id });

//                     callback(null, userId);
//                 }
//             );
//         });
//     }

//     function serviceSeeder(userId, callback) {
//         console.log("-->>>service seeder<<<---");
//         const services = [
//             {
//                 name: "User Management",
//                 description: "Tonmoy",
//                 created_by: userId,
//                 updated_by: userId,
//             },
//             {
//                 name: "Service Management",
//                 description: "Tonmoy",
//                 created_by: userId,
//                 updated_by: userId,
//             },
//             {
//                 name: "Permission Management",
//                 description: "Tonmoy",
//                 created_by: userId,
//                 updated_by: userId,
//             },
//         ];

//         Service.destroy({ truncate: { cascade: true } }).then(() => {
//             Service.bulkCreate(services, {
//                 returning: true,
//                 ignoreDuplicates: false,
//             }).then(() => {
//                 console.log("--->>service seed completed<<---");
//                 callback(null, userId);
//             });
//         });
//     }

//     function permissionSeeder(userId, callback) {
//         const permissions = [
//             {
//                 name: "System Admin Permissions",
//                 description: "Tonmoy",
//                 type: "standard",
//                 created_by: userId,
//                 updated_by: userId,
//             },
//             {
//                 name: "Customer Permission",
//                 description: "Admin can manage all services",
//                 type: "standard",
//                 created_by: userId,
//                 updated_by: userId,
//             },
//             {
//                 name: "Vendor Permission",
//                 description: "Admin can manage all services",
//                 type: "standard",
//                 created_by: userId,
//                 updated_by: userId,
//             },
//         ];

//         Permission.destroy({ truncate: { cascade: true } }).then(() => {
//             Permission.bulkCreate(permissions, {
//                 returning: true,
//                 ignoreDuplicates: false,
//             }).then(() => {
//                 callback(null, userId);
//             });
//         });
//     }

//     function permissionServiceSeeder(userId, callback) {
//         Promise.all([
//             Service.findOne({ where: { name: "User Management" } }),
//             Service.findOne({ where: { name: "Service Management" } }),
//             Service.findOne({ where: { name: "Permission Management" } }),

//             Permission.findOne({ where: { name: "System Admin Permissions" } }),
//         ]).then((values) => {
//             const [
//                 userManagementService,
//                 serviceManagementService,
//                 permissionManagementService,
//                 systemAdminPermission,
//             ] = values;

//             const permissionServices = [
//                 {
//                     service_id: userManagementService.id,
//                     permission_id: systemAdminPermission.id,
//                 },
//                 {
//                     service_id: serviceManagementService.id,
//                     permission_id: systemAdminPermission.id,
//                 },
//                 {
//                     service_id: permissionManagementService.id,
//                     permission_id: systemAdminPermission.id,
//                 },
//             ];

//             ServicePermission.destroy({ truncate: { cascade: true } }).then(
//                 () => {
//                     ServicePermission.bulkCreate(permissionServices, {
//                         returning: true,
//                         ignoreDuplicates: false,
//                     }).then(() => {
//                         callback(null, userId);
//                     });
//                 }
//             );
//         });
//     }

//     function profilePermissionSeeder(userId, callback) {
//         Promise.all([
//             Permission.findOne({ where: { name: "System Admin Permissions" } }),
//             Permission.findOne({ where: { name: "Customer Permission" } }),
//             Permission.findOne({ where: { name: "Vendor Permission" } }),

//             Profile.findOne({ where: { name: "System Admin" } }),
//         ]).then((values) => {
//             const [
//                 systemAdminPermission,
//                 customerPermission,
//                 vendorPermission,
//                 systemAdminProfile,
//             ] = values;

//             const profilePermissions = [
//                 {
//                     profile_id: systemAdminProfile.id,
//                     permission_id: systemAdminPermission.id,
//                 },
//                 {
//                     profile_id: systemAdminProfile.id,
//                     permission_id: customerPermission.id,
//                 },
//                 {
//                     profile_id: systemAdminProfile.id,
//                     permission_id: vendorPermission.id,
//                 },
//             ];

//             PermissionProfile.destroy({ truncate: { cascade: true } }).then(
//                 () => {
//                     PermissionProfile.bulkCreate(profilePermissions, {
//                         returning: true,
//                         ignoreDuplicates: false,
//                     }).then(() => {
//                         callback(null, userId);
//                     });
//                 }
//             );
//         });
//     }

//     async.waterfall(
//         [
//             userSeeder,
//             profileSeeder,
//             userUpdateSeeder,
//             serviceSeeder,
//             permissionSeeder,
//             permissionServiceSeeder,
//             profilePermissionSeeder,
//         ],
//         (err) => {
//             if (err) console.error(err);
//             else console.log("DB seed completed");
//             process.exit();
//         }
//     );
// }
// init();

/*
    initial seeder
*/

const path = require("path");
const async = require("async");

async function init() {
	const config = require("./src/config/index");

	config.initEnvironmentVariables();

	const sequelize = require("./src/config/lib/sequelize");

	await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);

	const Permission = require("./src/modules/permissions/permission.model");
	const ServicePermission = require("./src/modules/permissions/service_permission.model");
	const Profile = require("./src/modules/profile/profile.model");
	const PermissionProfile = require("./src/modules/profile/permission-profile.model");
	const Service = require("./src/modules/service/service.model");
	const User = require("./src/modules/Users/user.model");

	await sequelize.sync();

	function userSeeder(cb) {
		User.findOrCreate({
			where: { email: "admin@commerce.com" },
			defaults: {
				firstName: "System",
				lastName: "Admin",
				password: "P@ssword123",
			},
		}).then((users) => {
			console.log("----> user seed completed");
			cb(null, users[0].id);
		});
	}

	function profileSeeder(userId, cb) {
		const profiles = [
			{
				name: "System Admin",
				description: "tonmoy",
				type: "standard",
				created_by: userId,
				updated_by: userId,
			},

			{
				name: "Customer",
				description: "tonmoy",
				type: "standard",
				created_by: userId,
				updated_by: userId,
			},
			{
				name: "Vendor",
				description: "tonmoy",
				type: "standard",
				created_by: userId,
				updated_by: userId,
			},
		];

		Profile.destroy({ truncate: { cascade: true } }).then(() => {
			Profile.bulkCreate(profiles, {
				returning: true,
				ignoreDuplicates: false,
			}).then(() => {
				console.log("-->>Profile Seed Completed<<--")
				cb(null, userId);
			});
		});
	}

	function userUpdateSeeder(userId, cb) {
		User.findOne({
			where: { id: userId },
		}).then((admin) => {
			Profile.findOne({
				where: { name: "System Admin" },
			}).then((systemAdminProfile) => {
				admin.update({ profile_id: systemAdminProfile.id });
				console.log("-->>user update Seed Completed<<--")
				cb(null, userId);
			});
		});
	}

	function serviceSeeder(userId, cb) {
		const services = [
			{
				name: "User management",
				description: "tonmoy",
				created_by: userId,
				updated_by: userId,
			},

			{
				name: "Service Management",
				description: "rifat",
				created_by: userId,
				updated_by: userId,
			},
			{
				name: "Permission Management",
				description: "rabby",
				created_by: userId,
				updated_by: userId,
			},
		];

		Service.destroy({ truncate: { cascade: true } }).then(() => {
			Service.bulkCreate(services, {
				returning: true,
				ignoreDuplicates: false,
			}).then(() => {
				console.log("-->>service Seed Completed<<--")
				cb(null, userId);
			});
		});
	}

	function permissionSeeder(userId, cb) {
		const permissions = [
			{
				name: "System Admin Permissions",
				description: "tonmoy",
				type: "standard",
				created_by: userId,
				updated_by: userId,
			},

			{
				name: "Customer Permissions",
				description: "rifat",
				type: "standard",
				created_by: userId,
				updated_by: userId,
			},
			{
				name: "Vendor Permissions",
				description: "rabby",
				type: "standard",
				created_by: userId,
				updated_by: userId,
			},
		];

		Permission.destroy({ truncate: { cascade: true } }).then(() => {
			Permission.bulkCreate(permissions, {
				returning: true,
				ignoreDuplicates: false,
			}).then(() => {
				console.log("-->>permission Seed Completed<<--")
				cb(null, userId);
			});
		});
	}

	function permissionServiceSeeder(userId, cb) {
		Promise.all([
			Service.findOne({ where: { name: "User management" } }),
			Service.findOne({ where: { name: "Service Management" } }),
			Service.findOne({ where: { name: "Permission management" } }),

			Permission.findOne({ where: { name: "System Admin Permissions" } }),
			// Permission.findOne({ where: { name:  "Permission Management" }}),
			// Permission.findOne({ where: { name:  "Permission management" }})
		]).then((values) => {
			const [
				userManagementService,
				serviceManagementService,
				permissionManagementService,
				systemAdminPermission,
			] = values;

			const permissionServices = [
				{
					service_id: userManagementService.id,
					permission_id: systemAdminPermission.id,
				},
				{
					service_id: serviceManagementService.id,
					permission_id: systemAdminPermission.id,
				},
				{
					service_id: permissionManagementService.id,
					permission_id: systemAdminPermission.id,
				},
			];
			ServicePermission.destroy({ truncate: { cascade: true } }).then(() => {
				ServicePermission.bulkCreate(permissionServices, {
					returning: true,
					ignoreDuplicates: false,
				}).then(() => {
					console.log("-->>service permission Seed Completed<<--")
					cb(null, userId);
				});
			});
		});
	}

	function profilePermissionSeeder(userId, cb) {
		Promise.all([
			Permission.findOne({ where: { name: "System Admin Permissions" } }),
			Permission.findOne({ where: { name: "Customer Permissions" } }),
			Permission.findOne({ where: { name: "Vendor Permissions" } }),

			Profile.findOne({ where: { name: "System Admin" } }),
			// Permission.findOne({ where: { name:  "Permission Management" }}),
			// Permission.findOne({ where: { name:  "Permission management" }})
		]).then((values) => {
			const [
				systemAdminPermission,
				customerPermission,
				vendorPermission,
				systemAdminProfile,
			] = values;

			const profilePermissions = [
				{
					profile_id: systemAdminProfile.id,
					permission_id: systemAdminPermission.id,
				},
				{
					profile_id: systemAdminProfile.id,
					permission_id: customerPermission.id,
				},
				{
					profile_id: systemAdminProfile.id,
					permission_id: vendorPermission.id,
				},
			];
			PermissionProfile.destroy({ truncate: { cascade: true } }).then(() => {
				PermissionProfile.bulkCreate(profilePermissions, {
					returning: true,
					ignoreDuplicates: false,
				}).then(() => {
					console.log("-->>permission profile Seed Completed<<--")
					cb(null, userId);
				});
			});
		});
	}

	async.waterfall(
		[
			userSeeder,
			profileSeeder,
			userUpdateSeeder,
			serviceSeeder,
			permissionSeeder,
			permissionServiceSeeder,
			profilePermissionSeeder,
		],
		(err) => {
			if (err) console.error(err);
			else console.log("DB Seed Completed");
			process.exit();
		}
	);
}

init();
