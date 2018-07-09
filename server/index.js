const express = require('express');

const app = express();

app.use('/', express.static(__dirname + '/../client/dist'));

app.get('/login/:username', (req,res) => {
	console.log(req.params.username);
	res.send(res.params.username);
})

const port = 1337;

app.listen(port, () => {
	console.log('Now listening to port ', port);
})