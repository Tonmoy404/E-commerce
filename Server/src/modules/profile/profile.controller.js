const Profile = require('./profile.model');
const PermissionProfile = require('./permission-profile.model');
const Permission = require('../permissions/permission.model');
const ServicePermission = require('../permissions/service_permission.model');
const Service = require("../service/service.model");

async function createProfile(req, res){
    try{
        const { name, description } = req.params.id;

        const existProfile = await Profile.findOne({
            where: { name }
        })
        if(existProfile) return res.status(400).send("This Profile Already Exists");

        const newProfile = await Profile.create({
            name,
            description
        });
        res.status(201).send(newProfile);
    }
    catch(Err){
        console.log(Err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.createProfile = createProfile;