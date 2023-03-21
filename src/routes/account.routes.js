const { Router } = require('express');
const  router = Router();



const { getAccounts, addAccount } = require('../controllers/account.controllers');

//router.get('/balance/:address', getBalance);
//router.get('/:id', getAccount);
router.get('/', getAccounts);
router.post("/", addAccount);





module.exports = router;