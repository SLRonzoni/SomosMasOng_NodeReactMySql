const express = require('express');
const router = express.Router();

const { authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload } = require("../middlewares");

const { validateOrganization } = require("../validators");

const {
    createOrganization,
    getOrganizations,
    getOrganizationById,
    getOrganizationByName,
    updateOrganization,
    deleteOrganization
} = require("../controllers/organization.controller");


router.get('/public', getOrganizations)
router.get('/public/:id', idExists ,getOrganizationById);
router.get('/byName/:name', getOrganizationByName);
router.post('/',verifyIsAdmin,optionsFileUpload, validateOrganization, createOrganization);
router.put('/:id',verifyIsAdmin,optionsFileUpload, authenticatedUser, idExists,validateOrganization,updateOrganization);
router.delete('/:id',verifyIsAdmin, idExists ,deleteOrganization)

module.exports = router;
