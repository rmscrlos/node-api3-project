const express = require('express');
const { whereNotExists } = require('../../data/db-config');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');
const usersdb = require('./users-model');
const postdb = require('../posts/posts-model');
const router = express.Router();

router.get('/users', (req, res, next) => {
	// RETURN AN ARRAY WITH ALL THE USERS
	usersdb
		.get()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(next);
});

router.get('/users/:id', validateUserId(), (req, res, next) => {
	// RETURN THE USER OBJECT
	// this needs a middleware to verify user id
	console.log(req.params.id);
	usersdb.getById(req.params.id).then(user => res.json(user));
});

router.post('/users', validateUser(), (req, res, next) => {
	// RETURN THE NEWLY CREATED USER OBJECT
	// this needs a middleware to check that the request body is valid
	usersdb
		.insert(req.body)
		.then(user => res.status(201).json(user))
		.catch(next);
});

router.put('/users/:id', validateUser(), validateUserId(), (req, res, next) => {
	// RETURN THE FRESHLY UPDATED USER OBJECT
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	usersdb
		.update(req.params.id, req.body)
		.then(user => {
			if (user) {
				return res.status(200).json(user);
			} else {
				res.status(404).json({ message: 'User is not found.' });
			}
		})
		.catch(next);
});

router.delete('/users/:id', validateUserId(), (req, res) => {
	// RETURN THE FRESHLY DELETED USER OBJECT
	// this needs a middleware to verify user id
	usersdb.remove(req.params.id).then(user => res.status(200).json(user));
});

router.get('/users/:id/posts', validateUserId(), (req, res, next) => {
	// RETURN THE ARRAY OF USER POSTS
	// this needs a middleware to verify user id
	usersdb.getUserPosts(req.params.id).then(posts => res.status(200).json(posts));
});

router.post('/users/:id/posts', validatePost(), (req, res, next) => {
	// RETURN THE NEWLY CREATED USER POST
	// this needs a middleware to verify user id
	// and another middleware to check that the request body is valid
	console.log(req.params.id, req.body);
	postdb
		.insert(req.body)
		.then(post => res.status(201).json(post))
		.catch(next);
});

// do not forget to export the router
module.exports = router;
