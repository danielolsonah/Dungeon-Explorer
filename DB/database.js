const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/users`, err => {
	if (err) {
		console.log('CONNECTION ERROR:\n', err)
	}
});


const userSchema = mongoose.Schema({
	inputText: String,
	adventureLog: [String],
	battleLog: [String],
	display: String,
	location: String,
	alive: Boolean,
	health: Number,
	loggingIn: Boolean,
	gold: Number,
	attack: Number,
	inventory: [String],
	inBattle: Boolean,
	visitedRooms: [Number],
	lootedRooms: [Number],
	userName: String
});

var User = mongoose.model('User', userSchema);

const getUser = (userName, callback) => {
	User.find({userName: userName}).exec((err, results) => {
		if (err) {
			callback(err, null)
		}
		callback(null, results)
	})
}

const createUser = (username, callback) => {
	getUser(username, (err, results) => {
		if (err) {
			callback(err, null)
		} else {
			console.log('RESULTS', results)
			if (results.length !== 0) {
				callback(null, null)
			} else {
				User.create({userName: username}, (createErr, created) => {
					if (err) {
						callback(createErr, null);
					} else {
						callback(null, created)
					}
				})
			}
		}
	})
}

const logIn = (username, callback) => {
	getUser(username, (err, results) => {
		if (err) {
			callback(err, null)
		} else {
			callback(results, null)
		}
	})
}

const save = (username, data, callback) => {
	console.log(username)
	User.updateOne({userName: username}, data)
	.then(data => {
		console.log('data', data)
	})
	.catch(err => {
		console.log(err);
	})
}

module.exports.createUser = createUser;
module.exports.getUser = getUser;
module.exports.save = save;