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

async function getProfile(req, res){
    try{
        const { id } = req.params.id;

        const profile = await Profile.findOne({
            where: { id }
        })
        if(!profile) return res.status(404).send("Profile was not found");

        res.status(200).send(profile);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function findProfile(req, res){
    try{
        const { id } = req.params;
        const profile = await Profile.findOne({
            where: { id }
        })
        if(!profile) return res.status(404).send("Profile not found");
        res.status(200).send(profile);
    }
    catch(err){
        console.log("Internal Server Error");
    }
}

async function updateProfile(req, res){
    try{
        const { name, description, permission_ids } = req.body;
        const { id } = req.params;

        const profile = await Profile.findOne({
            where: { id }
        })
        if(!profile) return res.status(404).send("profile not found");

        const updatedprofile = await Profile.update({
            name,
            description,
            permission_ids: permission_ids.join(",")
        })

        res.status(200).send(updatedprofile);
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteProfile(req, res){
    try{
        const { id } = req.params;

        const profile = await Profile.findOne({
            where: { id }
        })
        if(!profile) return res.status(404).send("Profile was not found");

        await profile.destroy();

        res.status(200).send(profile);
    }
    catch(Err){
        console.log(Err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.createProfile = createProfile;
module.exports.getProfile = getProfile;
module.exports.updateProfile = updateProfile;
module.exports.findProfile = findProfile;
module.exports.deleteProfile = deleteProfile;