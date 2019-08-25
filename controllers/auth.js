const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
	const user = new User(req.body);
	user.save(err => {
		if(err) {
			return res.status(400).send(err);
		}
		let token = jwt.sign({ _id: user._id}, 'shhhared-secret');
		res.send({ token: token });
	});
}

exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email }, (err, user) => {
		user.comparePassword(req.body.password, function (err, isMatch) {
      		if (!isMatch) {
        		return res.status(401).send({ message: 'Wrong email or password' });
      		}
      		const token = jwt.sign({ _id: user._id }, 'shhhared-secret');
      		res.send({ token: token });
    	});
	})
}