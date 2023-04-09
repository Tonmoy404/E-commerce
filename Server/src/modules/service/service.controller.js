const Service = require('./service.model');

async function getServices(req, res){
    try{
        const services = await Service.findAll();

        res.status(200).send(services);
    }
    catch(Err){
        console.log(Err);
        res.status(500).send("Internal Server Error");
    }
}

async function getServiceById(req, res){
    try{
        const { id } = req.params;

        const service = await Service.findOne({
            where: { id }
        })

        if(!service) return res.status(404).send("Service not found");

        res.status(200).send(service);
    }
    catch(Err){
        console.log(Err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.getServices = getServices;
module.exports.getServiceById = getServiceById;