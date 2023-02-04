const OrganizationModel = require("../models").Organization;
const { Slide } = require("../models");
const baseController = require('./base.controller')
//const { uploadToBucket } = require('../services/s3');


const getOrganizations = async ( req, res ) => {
    return baseController.getAllModels( req, res, OrganizationModel )
};

const createOrganization = async (req, res) => {  
    //let img = req.files.image;
	let regularImglocation;
    try{
      //regularImglocation = await uploadToBucket(img);
	  regularImglocation=`https://via.placeholder.com/600/51aa97`
      const { name, address, phone, email, facebookUrl, instagramUrl, linkedinUrl, welcomeText, aboutUsText } = req.body;
      const inputVars = {
        name,
        image:regularImglocation,
        address,
        phone,
        email,
        facebookUrl, 
        instagramUrl, 
        linkedinUrl,
        welcomeText,
        aboutUsText
    }
      return baseController.createModel(res, OrganizationModel, inputVars )
    } catch(error) {
        res.status(500).json(error)
    }
};

const getOrganizationById = async(req, res) => {    
    try {
        const id = req.params.id
        
        const organization = await OrganizationModel.findOne({
            where: { id },
            attributes: ['id','name', 'image', 'address', 'phone','email', 'facebookUrl', 'instagramUrl', 'linkedinUrl','welcomeText', 'aboutUsText', 'createdAt', 'updatedAt']
        });

        // const slidesByOrg = await Slide.findAll({
        //     where:{ organizationId: id },
        //     order:[['order','ASC']]
        // });

        res.status(200).send({
            organization,
            // slides: slidesByOrg
        });
               
    } catch (error) {
        res.status(500).send(error);
    }
};

const getOrganizationByName= async (req, res) => {    
	const paramsName = req.params.name;
	try{
		const organization= await OrganizationModel.findAll({where:{name:paramsName}})
		if(!organization){
		  return res.status(404).json('name not found')
		} else{
		  res.status(200).json(organization)
		}
	} catch(error) {
		res.status(500).json(error)
	}     
};

const updateOrganization = async (req, res) => {  
    //let img = req.files.image;
	let regularImglocation;
    try{
      //regularImglocation = await uploadToBucket(img);
      regularImglocation=`https://via.placeholder.com/600/51aa97`
      const { name, address, phone, email, facebookUrl, instagramUrl, linkedinUrl,welcomeText, aboutUsText } = req.body;
      const inputVars = {
        name,
        image:regularImglocation,
        address,
        phone,
        email,
        facebookUrl, 
        instagramUrl, 
        linkedinUrl,
        welcomeText,
        aboutUsText
    }
    return baseController.updateModel(req, res, OrganizationModel, inputVars)
} catch(error) {
    res.status(500).json(error)
}
};

const deleteOrganization = async( req, res ) => {
    return baseController.deleteModel( req, res, OrganizationModel )   
};

module.exports = {
    getOrganizationById,
    getOrganizationByName,
    createOrganization,
    updateOrganization,
    getOrganizations,
    deleteOrganization
}