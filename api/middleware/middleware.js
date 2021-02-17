const usersdb = require('../users/users-model');

const logger = format => (req, res, next) => {
	// DO YOUR MAGIC
	const time = new Date().toISOString();
	if (format === 'long') {
		console.log(`${time} || ${req.method} || ${req.ip} || ${req.url} || ${req.socket.bytesRead} `);
	}
	if (format === 'short') {
		console.log(`${time} || ${req.method} || ${req.url}`);
	}

	next();
};

const validateUserId = () => (req, res, next) => {
	// DO YOUR MAGIC

	usersdb
		.getById(req.params.id)
		.then(user => {
			if (user) {
				next();
			} else {
				res.status(404).json({
					message: 'User not found'
				});
			}
		})
		.catch(err => {
			next(err);
			// console.log(err);
			// res.status(500).json({
			// 	message: 'Error retrieving the user.'
			// });
		});
};

const validateUser = () => (req, res, next) => {
	// DO YOUR MAGIC
	console.log(req.body);
	if (!Object.keys(req.body).length) {
		return res.status(400).json({
			message: 'Missing user data'
		});
	}
	if (req.body.name === '') {
		return res.status(400).json({
			message: 'Missing required name field'
		});
	}

	next();
};

const validatePost = () => (req, res, next) => {
	// DO YOUR MAGIC
	console.log(req.body);
	if (!req.body) {
		return res.status(400).json({
			message: 'Missing post data'
		});
	}
	if (!req.body.text) {
		return res.status(400).json({
			message: 'Missing required text field'
		});
	}

	next();
};

const validatePostId = () => (req, res, next) => {
	// DO YOUR MAGIC

	usersdb
		.getById(req.params.id)
		.then(user => {
			if (user) {
				next();
			} else {
				res.status(404).json({
					message: 'Post does not exist.'
				});
			}
		})
		.catch(err => {
			next(err);
			// console.log(err);
			// res.status(500).json({
			// 	message: 'Error retrieving the user.'
			// });
		});
};

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateUserId,
	validatePostId,
	validateUser,
	validatePost
};
