const express = require('express');
const logger = require('./middleware/middleware');
const userRouter = require('./users/users-router');
const postRouter = require('./posts/posts-router');
const validateUserId;
const validateUser;
const validatePost;
const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
// global middlewares and routes need to be connected here
server.use(logger);
server.use(userRouter);
server.use(postRouter);
server.use((err, req, res, next) => {
	res.satus(500).json({
		message: 'Something went wrong. Please, try again later.'
	});
});
server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
