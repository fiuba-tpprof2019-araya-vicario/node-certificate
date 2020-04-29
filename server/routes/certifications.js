const express = require('express');

const router = express.Router();

/**
 * @route GET /certifications/{id}
 * @param {string} id.path.required
 * @returns {Project.model} 200
 */
router.get('/:id', (req, res)=> {
    res.status(200).send({
        transactionId: req.params.id
    });
});

/**
 * @typedef Project
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {Type.model} type.required 
 * @property {Contributor.model} creator.required 
 * @property {Array.<Contributor>} students.required 
 * @property {Tutor.model} tutor.required 
 * @property {Array.<Tutor>} cotutors.required 
 */

/**
 * @typedef Type
 * @property {[string]} name.required
 */

 /**
 * @typedef Contributor
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 * @property {[string]} padron.required 
 * @property {Array.<Career>} careers.required 
 */

/**
 * @typedef Tutor
 * @property {[string]} name.required
 * @property {[string]} surname.required
 * @property {[string]} email.required
 */

 /**
 * @typedef Career
 * @property {[string]} name.required
 */

/**
 * @route POST /certifications
 * @param {Project.model} project.body.required
 */
router.post('/', (req, res)=> {
    res.status(200).send({
       contractAddress : "dsadasfsdfsdfsdfsd",
       transactionId : "sadadasdasdasdsa"
    });
});


module.exports = router;