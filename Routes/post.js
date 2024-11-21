const express = require('express');
const router = express();
const posts=require('../Controllers/post');
const verifyRole=require('../Middleware/verifyRole');

// GET ALL POST
router.get('/', posts.getAll);
// GET POST BY ID
router.get('/:id', posts.getByID);
// CREATE POST 
router.post('/', verifyRole, posts.create);
// DELETE POST BY ID
router.delete('/:id', verifyRole, posts.remove);
// UPDATE POST BY ID
router.put('/:id', verifyRole, posts.update);
module.exports = router;