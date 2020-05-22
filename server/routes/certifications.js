const express = require('express');
const uuid = require('uuid');
const ledger = require('../ledger');
const router = express.Router();

/**
 * @typedef Project
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {Type.model} oftype.required 
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
 * @route GET /certifications/{id}
 * @param {string} id.path.required
 * @returns {Project.model} 200
 */
router.get('/:id', (req, res)=> {
    ledger.getProject(req.params.id)
    .then(data=>  res.status(200).send(data))
    .catch(err=> res.status(404).send(err));
});

/**
 * @typedef CreateProject
 * @property {[string]} name.required
 * @property {[string]} proposal_url.required
 * @property {[string]} proposal_drive_id.required
 * @property {[string]} proposal_name.required
 * @property {[string]} creatorId.required
 * @property {[string]} tutorId.required
 */

/**
 * @route POST /certifications/{oftype}
 * @param {[string]} oftype.path.required
 * @param {CreateProject.model} project.body.required
 * @returns {Project.model} 200
 */
router.post('/:oftype', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.createProject(req.params.oftype, req.body);

        await tx.wait();

        const project = await ledger.getProject(req.body.id);

        res.status(201).send(project);
    }
    catch(err){
        res.status(500).send(err);
    }
});

/**
 * @typedef AddContributor
 * @property {[string]} id.required
 */

/**
 * @route POST /certifications/{id}/contributors
 * @param {[string]} id.path.required
 * @param {AddContributor.model} reference.body.required
 * @returns {Project.model} 200
 */
router.post('/:id/contributors', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.addProjectContributor(req.params.id, req.body.id, { gasLimit: 8000000 });

        await tx.wait();

        const project = await ledger.getProject(req.params.id);

        res.status(201).send(project);
    }
    catch(err){
        res.status(500).send(err);
    }
});

/**
 * @typedef AddTutor
 * @property {[string]} id.required
 */

/**
 * @route POST /certifications/{id}/cotutors
 * @param {[string]} id.path.required
 * @param {AddTutor.model} reference.body.required
 * @returns {Project.model} 200
 */
router.post('/:id/cotutors', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.addProjectTutor(req.params.id, req.body.id, { gasLimit: 8000000 });

        await tx.wait();

        const project = await ledger.getProject(req.params.id);

        res.status(201).send(project);
    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;