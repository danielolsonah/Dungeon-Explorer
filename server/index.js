const express = require('express');
const db = require('../DB/database.js');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use('/', express.static(__dirname + '/../client/dist'));

app.get('/login/:username', (req,res) => {
	db.getUser(req.params.username, (err, results) => {
		if (err) {
			console.log('FIND ERROR:\n', err)
		} else {
			console.log('FOUND IT:\n', results)
			res.send(results);
		}
	})
})

app.post('/login/createuser/:username', (req, res) => {
	db.createUser(req.params.username, (err, results) => {
		if (err) {
			console.log('POST ERROR:\n', err)
		} else {
			if (!results) {
				res.send('ALREADY THERE');
			} else {
				res.send(results);
			}
		}
	})
})

var sample = {
	inputText: '',
	adventureLog: ['a','b'],
	battleLog: ['c','d'],
	display: 'hello',
	location: 'string',
	alive: true,
	health: 100,
	loggingIn: false,
	gold: 40,
	attack: 15,
	inventory: [''],
	inBattle: false,
	visitedRooms: [1, 2, 3],
	lootedRooms: [1, 2, 3],
	userName: 'dan'
}

app.post('/:username/save', (req, res) => {
	db.save(req.params.username, req.body, (err, results) => {
		console.log('SAVED WAS CALLED')
		if (err) {
			console.log('DB SAVE ERROR:\n', err)
		} else {
			console.log('DB SAVE SUCCESS:\n', results)
		}
	})
	res.send(req.body)
})

const port = 1337;

app.listen(port, () => {
	console.log('Now listening to port ', port);
})