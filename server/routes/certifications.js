const express = require('express');

const router = express.Router();

/**
 * @route GET /certifications/{id}
 * @param {string} id.path.required
 */
router.get('/:id', (req, res)=> {
    res.status(200).send({
        transactionId: req.params.id
    });
});

/**
 * @route POST /certifications
 */
router.post('/', (req, res)=> {
    res.status(200).send({
       contractAddress : "dsadasfsdfsdfsdfsd",
       transactionId : "sadadasdasdasdsa"
    });
});


module.exports = router;