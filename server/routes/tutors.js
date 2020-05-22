const express = require('express');
const uuid = require('uuid');
const ledger = require('../ledger');
const router = express.Router();

/**
 * @typedef Tutor
 * @property {[string]} id
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 */

/**
 * @route GET /tutors/{id}
 * @param {string} id.path.required
 * @returns {Tutor.model} 200
 */
router.get('/:id', (req, res)=> {
    ledger.getTutor(req.params.id)
          .then(data=>  res.status(200).send(data))
          .catch(err=> res.status(404).send(err));
});

/**
 * @typedef CreateTutor
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 */

/**
 * @route POST /tutors
 * @param {CreateTutor.model} tutor.body.required
 * @returns {Tutor.model} 201
 */
router.post('/', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.createTutor(req.body);

        await tx.wait();

        const tutor = await ledger.getTutor(req.body.id);

        res.status(201).send(tutor);
    }
    catch(err){
        res.status(500).send(err);
    }
});


module.exports = router;