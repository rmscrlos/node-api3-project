const usersdb = require('../users/users-model');

const logger = format => (req, res, next) => {
	// DO YOUR MAGIC
	const time = new Date().toISOString();
	if (format === 'long') {
		console.log(`${time} || ${req.method} || ${req.ip} || ${req.url} || ${req.socket.bytesRead} `);
	} else if (format === 'short') {
		console.log(`${time} || ${req.methog} || ${req.url}`);
	} else {
		console.log(`${time} || ${req.method} || ${req.url} || ${req.socket.bytesRead}`);
	}
	next();
};

const validateUserId = (req, res, next) => {
	// DO YOUR MAGIC
	usersdb
		.getById(req.params.id)
		.then(user => {
			if (user) {
				req.user = user;
				next();
			} else {
				res.status(404).json({
					message: 'User not found'
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error retrieving the user.'
			});
		});
};

function validateUser(req, res, next) {
	// DO YOUR MAGIC
}

function validatePost(req, res, next) {
	// DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
	logger,
	validateUserId,
	validateUser,
	validatePost
};
