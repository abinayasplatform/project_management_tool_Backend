const express = require('express');
const router = express.Router();
const memberController = require('../controller/memberController');
const authenticateToken = require('../middleware/authenticate');
const checkRole = require('../middleware/checRole');

//member routes
router.post('/memberRegister', authenticateToken, checkRole('team leader'),memberController.memberRegister);
router.post('/memberLogin',authenticateToken, checkRole('team leader'),memberController.memberLogin);
router.get('/:memberId',authenticateToken, checkRole('team leader'),memberController.completeMemberInfo);

module.exports = router;