var takeCommand = input => {
	switch (input) {
		case 'look around': 
			return this.location.surroundings;
	}
}

module.exports.takeCommand = takeCommand;