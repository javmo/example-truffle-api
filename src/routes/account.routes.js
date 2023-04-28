const { Router } = require('express');
const  router = Router();



const { getAccounts, addAccount, getAccount } = require('../controllers/account.controllers');

//router.get('/balance/:address', getBalance);
//router.get('/:id', getAccount);
router.get('/', getAccounts);
router.get("/consulta",getAccount)
router.post("/", addAccount);





module.exports = router;