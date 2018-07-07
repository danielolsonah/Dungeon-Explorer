const express = require('express');

const app = express();

app.use('/', express.static(__dirname + '/../client/dist'));

const port = 1337;

app.listen(port, () => {
	console.log('Now listening to port ', port);
})