const ModelMember = require("../models").Member;
const baseController = require("./base.controller");
//const { uploadToBucket } = require('../services/s3');

const getAllMember = async (req, res) => {
  return baseController.getAllModels(req, res, ModelMember);
};

const getMemberById = async (req, res) => {
  return baseController.getModelById(req, res, ModelMember);
};

const getMemberByName = async (req, res) => {
  const paramsName = req.params.name;
  try {
    const member = await ModelMember.findOne({ where: { name: paramsName } });
    if (!member) {
      return res.status(404).json("name not found");
    } else {
      res.status(200).json(member);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createMember = async (req, res) => {
  const { name, facebookUrl, instagramUrl, linkedinUrl, description } =
    req.body;
  //let img = req.files.image;
  let regularImglocation;
  try {
    //regularImglocation = await uploadToBucket(img);
    regularImglocation = `https://via.placeholder.com/600/51aa97`;
    const inputVars = {
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image: regularImglocation,
      description,
    };
    return baseController.createModel(res, ModelMember, inputVars);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateMember = async (req, res) => {
  const { name, facebookUrl, instagramUrl, linkedinUrl, description } =
    req.body;
  //let img = req.files.image;
  let regularImglocation;
  try {
    //regularImglocation = await uploadToBucket(img);
    regularImglocation = `https://via.placeholder.com/600/61a65`;
    const inputVars = {
      name,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
      image: regularImglocation,
      description,
    };
    return baseController.updateModel(req, res, ModelMember, inputVars);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMember = async (req, res) => {
  return baseController.deleteModel(req, res, ModelMember);
};

module.exports = {
  getAllMember,
  getMemberByName,
  createMember,
  updateMember,
  deleteMember,
  getMemberById,
};
