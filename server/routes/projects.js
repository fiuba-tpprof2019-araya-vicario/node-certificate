const express = require('express');
const uuid = require('uuid');
const ledger = require('../ledger');
const Project = require('../models/project');
const CreateProject = require('../models/create-project');
const CreateContributor = require('../models/create-contributor');
const CreateTutor = require('../models/create-tutor');

const router = express.Router();


/**
 * @route GET /projects/{id}
 * @param {string} id.path.required
 * @returns {Project.model} 200
 */
router.get('/:id', async (req, res)=> {

    try {
        const project = await ledger.getProject(req.params.id);

        const model = new Project(project);

        res.status(200).send(model)
    }
    catch(err) {
        res.status(404).send(err);
    }
});

/**
 * @typedef SeedProject
 * @property {ProjectProperties.model} project.required
 * @property {Type.model} oftype.required 
 * @property {CreateContributor.model} creator.required 
 * @property {Array.<CreateContributor>} students.required 
 * @property {CreateTutor.model} tutor.required 
 * @property {Array.<CreateTutor>} cotutors.required 
 */

/**
 * @route POST /projects/seed
 * @param {SeedProject.model} project.body.required
 * @returns {Project.model} 200
 */
router.post('/seed', async (req, res)=> {

    try {
        req.body.project.id = uuid.v4();
        req.body.creator.id = uuid.v4();
        req.body.tutor.id = uuid.v4();
        req.body.students = req.body.students || [];
        req.body.students.forEach(c=> c.id = uuid.v4());
        req.body.cotutors = req.body.cotutors || [];
        req.body.cotutors.forEach(c=> c.id = uuid.v4());

        // console.log("Seba Body:",req.body.project)

        const createCreator = new CreateContributor(req.body.creator);
        const createTutor = new CreateTutor(req.body.tutor);
        const createProject = new CreateProject(req.body.project, createCreator.id, createTutor.id);
        const createStudents = req.body.students.map(x=> new CreateContributor(x));
        const createCotutors = req.body.cotutors.map(x=> new CreateTutor(x));
        

     

        for(let createStudent of createStudents){
            createProject.studentIds.push(createStudent.id);
        }

        for(let createCotutor of createCotutors){
            createProject.cotutorIds.push(createCotutor.id);
        }


        // console.log("Seba createProject:",createProject)

        console.log("-------\nSeba ledger:",ledger)

        console.log("-------\nSeba ledger contract:",ledger.contract)


        console.log("-------\nSeba ledger.contract.populateTransaction:",ledger.contract.populateTransaction)


        const projectTx = await ledger.contract.populateTransaction.createProject(createProject);
        console.log("Seba projectTx:",projectTx)
        console.log("Seba projectTx.hash:",projectTx.hash)



        // const projectTx2 = await ledger.populateTransaction.createProject(createProject);


        res.status(201).send(projectTx);

        //async returns control 
        setTimeout(async () => {

            console.log("sending to blockchain calls")

            try {
                const creatorTx = await ledger.createContributor(createCreator);
                await creatorTx.wait();
                const tutorTx = await ledger.createTutor(createTutor);
                await tutorTx.wait();

                for(let createStudent of createStudents){
                    const studentTx = await ledger.createContributor(createStudent);
                    await studentTx.wait();
                }

                for(let createCotutor of createCotutors){
                    const tutorTx = await ledger.createTutor(createCotutor);
                    await tutorTx.wait();
                }


                const tx = await ledger.signer.sendTransaction(projectTx);
                await tx.wait();
                console.log("tx",tx)
            }
            catch(err) {

                console.log("Seba Error:",req.body.project)
                console.error(err);
            }

        }, 0);

    }
    catch(err) {

        console.log("Seba err:",err)
        res.status(500).send(err);
    }





});


/**
 * @route POST /projects
 * @param {CreateProject.model} project.body.required
 * @returns {Project.model} 200
 */
router.post('/', async (req, res)=> {

    try {
        const request = new CreateProject(req.body);

        const tx = await ledger.createProject(request);

        await tx.wait();

        const project = await ledger.getProject(request.id);

        const model = new Project(project);

        res.status(201).send(model);
    }
    catch(err) {
        res.status(500).send(err);
    }
});

/**
 * @typedef AddStudent
 * @property {[string]} id.required
 */

/**
 * @route POST /projects/{id}/students
 * @param {[string]} id.path.required
 * @param {AddStudent.model} reference.body.required
 * @returns {Project.model} 200
 */
router.post('/:id/students', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.addProjectStudent(req.params.id, req.body.id, { gasLimit: 8000000 });

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
 * @route POST /projects/{id}/cotutors
 * @param {[string]} id.path.required
 * @param {AddTutor.model} reference.body.required
 * @returns {Project.model} 200
 */
router.post('/:id/cotutors', async (req, res)=> {

    try {
        req.body.id = uuid.v4();
        
        const tx = await ledger.addProjectTutor(req.params.id, req.body.id);

        await tx.wait();

        const project = await ledger.getProject(req.params.id);

        res.status(201).send(project);
    }
    catch(err){
        res.status(500).send(err);
    }
});

module.exports = router;