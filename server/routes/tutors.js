const express = require('express');
const ledger = require('../ledger');
const Tutor = require('../models/tutor');
const CreateTutor = require('../models/create-tutor');

const router = express.Router();

/**
 * @route GET /tutors/{id}
 * @param {string} id.path.required
 * @returns {Tutor.model} 200
 */
router.get('/:id', async (req, res)=> {

    try {
        const tutor = await ledger.getTutor(req.params.id);

        const model = new Tutor(tutor);

        res.status(200).send(model)
    }
    catch(err) {
        res.status(404).send(err);
    }
});

/**
 * @route POST /tutors
 * @param {CreateTutor.model} tutor.body.required
 * @returns {Tutor.model} 201
 */
router.post('/', async (req, res)=> {

    try {
        const request = new CreateTutor(req.body);
        
        const tx = await ledger.createTutor(request);

        await tx.wait();

        const tutor = await ledger.getTutor(request.id);

        const model = new Tutor(tutor);

        res.status(201).send(model);
    }
    catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;