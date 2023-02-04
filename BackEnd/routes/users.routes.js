var express = require('express');
var router = express.Router();

const {getAllUsers, getSelectData, updateUser, getUserId, getUserEmail, deleteUser}= require('../controllers/users.controllers');
const { authenticatedUser, verifyIsAdmin, idExists, optionsFileUpload } = require('../middlewares');

router.get('/',verifyIsAdmin, authenticatedUser, getAllUsers )
router.get('/selectData', getSelectData )
router.get('/:id', getUserId)
router.get('/byEmail/:email', getUserEmail)
router.put('/:id', idExists, optionsFileUpload ,authenticatedUser, updateUser)
router.delete('/:id', verifyIsAdmin,authenticatedUser, deleteUser)

module.exports = router;
