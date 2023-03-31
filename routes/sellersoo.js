const express = require('express');
const router = express.Router();
const sellers = require('../services/sellers');

/* GET sellers */
router.get('/', async function(req, res, next) {
  try {
    res.json(await sellers.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting sellers in  `, err.message);
    next(err);
  }
});




  router.post('/', async function(req, res, next) {
    try {
      res.json(await sellers.create(req.body));
    } catch (err) {
      console.error(`Error while creating sellers `, err.message);
      next(err);
    }
  });

/* DELETE sellers */
router.delete('/:sellerID', async function(req, res, next) {
    try {
      res.json(await sellers.remove(req.params.sellerID));
    } catch (err) {
      console.error(`Error while deleting sellers`, err.message);
      next(err);
    }
  });



  module.exports = router;