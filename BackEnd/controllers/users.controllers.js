const ModeloUser = require("../models").User;
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { welcomeEmail } = require("../services/welcomeEmail");
const { tokenGenerator } = require("../helpers/tokenGenerator");
const { uploadToBucket } = require('../services/s3');
const BaseController = require("./base.controller");

const getAllUsers = async (req, res) => {
  return BaseController.getAllModels(req, res, ModeloUser);
};

const getSelectData = async (req, res) => {
  let people=[];
	try {
  const user = await ModeloUser.findAll(); 
    for(let i=0;i < user.length; i++){
      people[i]={id:user[i].dataValues.id,
                 firstName:user[i].dataValues.firstName,
                 lastName:user[i].dataValues.lastName,
                 photo:user[i].dataValues.photo
                }  
    }                  
    return res.status(200).json(people);
	} catch (error) {		
		res.status(500).send(error);
	}
};

const createUser = async (req, res) => {
  let img = req.files;
  let regularImglocation;
  try {
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1044.jpg`;
    const { firstName, lastName, email, password, photo, roleId } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const pass = bcrypt.hashSync(password, parseInt(process.env.SALT));
    const user = await ModeloUser.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      photo: regularImglocation,
      password: pass,
      roleId: roleId ? roleId : ROLE_REGULAR_USER,
    });
    const token = tokenGenerator(user);

    const emailSent = await welcomeEmail(user);
    res.status(200).json({ newUser: user, emailSent, token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  
  let img = req.files;
  let regularImglocation;
  try{
    //regularImglocation = await uploadToBucket(img);
    regularImglocation=`https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1044.jpg`
    const pass = bcrypt.hashSync(req.body.password, parseInt(process.env.SALT));
    
    const inputVars={firstName:req.body.firstName,
                     lastName:req.body.lastName,
                     email:req.body.email,
                     roleId: req.body.roleId,
                     password:pass,
                     photo:regularImglocation
                    }                                     
    return BaseController.updateModel(req, res, ModeloUser, inputVars )
  } catch (error) {        
    res.status(500).send(error);
  }
};

const getUserEmail = async (req, res) => {
	try {
		const user = await ModeloUser.findOne({where:{email:req.params.email}})
		if (!user) {			
      return res.status(404).json('user not found');
		} else {
      delete user.dataValues.password
		  return res.status(200).json(user.dataValues);
    }
	} catch (error) {		
		res.status(500).send(error);
	}
};

const deleteUser = async (req, res) => {
  return BaseController.deleteModel(req, res, ModeloUser);
};

const findMe = async (req, res) => {
  return res.status(200).json(req.user.id);
};

const getUserId = async (req, res) => {
  return BaseController.getModelById(req, res, ModeloUser);
};

module.exports = {
  getAllUsers,
  getSelectData,
  createUser,
  updateUser,
  deleteUser,
  findMe,
  getUserId,
  getUserEmail
};
