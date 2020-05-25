const express = require('express');
const ledger = require('../ledger');
const Contributor = require('../models/contributor');
const CreateContributor = require('../models/create-contributor');

const router = express.Router();

/**
 * @route GET /contributors/{id}
 * @param {string} id.path.required
 * @returns {Contributor.model} 200
 */
router.get('/:id', async (req, res)=> {

    try {
        const contributor = await ledger.getContributor(req.params.id);

        const model = new Contributor(contributor);

        res.status(200).send(model)
    }
    catch(err) {
        res.status(404).send(err);
    }
});

/**
 * @route POST /contributors
 * @param {CreateContributor.model} contributor.body.required
 * @returns {Contributor.model} 201
 */
router.post('/', async (req, res)=> {

    try {
        const request = new CreateContributor(req.body);
        
        const tx = await ledger.createContributor(request);

        await tx.wait();

        const contributor = await ledger.getContributor(request.id);

        const model = new Contributor(contributor);

        res.status(201).send(model);
    }
    catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;