const express = require('express');
const postdb = require('./posts-model');
const { validatePostId } = require('../middleware/middleware');
const router = express.Router();

router.get('/posts', (req, res, next) => {
	// DO YOUR MAGIC
	console.log('hello');
	postdb
		.get()
		.then(posts => res.status(200).json(posts))
		.catch(next);
});

router.get('/posts/:id', validatePostId(), (req, res, next) => {
	// DO YOUR MAGIC
	console.log(req.params.id);
	postdb
		.getById(req.params.id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(next);
});

// do not forget to export the router
module.exports = router;
