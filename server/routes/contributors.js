const express = require('express');
const uuid = require('uuid');
const ledger = require('../ledger');
const router = express.Router();

/**
 * @typedef Contributor
 * @property {[string]} id
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 * @property {[string]} padron.required 
 * @property {Array.<string>} careers.required 
 */

/**
 * @route GET /contributors/{id}
 * @param {string} id.path.required
 * @returns {Contributor.model} 200
 */
router.get('/:id', (req, res)=> {
    ledger.getContributor(req.params.id)
          .then(data=>  res.status(200).send(data))
          .catch(err=> res.status(404).send(err));
});

 /**
 * @typedef CreateContributor
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 * @property {[string]} padron.required 
 * @property {Array.<string>} careers.required 
 */

/**
 * @route POST /contributors
 * @param {CreateContributor.model} contributor.body.required
 * @returns {Contributor.model} 201
 */
router.post('/', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.createContributor(req.body);

        await tx.wait();

        const contributor = await ledger.getContributor(req.body.id);

        res.status(201).send(contributor);
    }
    catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;