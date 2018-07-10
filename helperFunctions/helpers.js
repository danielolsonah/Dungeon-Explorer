const randomRange = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports.randomRange = randomRange;