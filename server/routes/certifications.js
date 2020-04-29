const express = require('express');

const router = express.Router();

router.get('/:id', (req, res)=> {
    res.status(200).send({
        transactionId: req.params.id
    });
});

router.post('/', (req, res)=> {
    res.status(200).send({
       contractAddress : "dsadasfsdfsdfsdfsd",
       transactionId : "sadadasdasdasdsa"
    });
});


module.exports = router;