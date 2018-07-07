module.exports = {
	firstRoom: {
		surroundings: 'You find yourself in a dark dungeon.  Cold damp stone walls surround you, but you see a wooden door to the north.',
		north: 'secondRoom',
		west: null,
		east: null,
		south: null
	},
	secondRoom: {
		surroundings: 'From the light of the torches on the wall, you can see pale, white bones scattered on the stone floor.  There is a door to the West and another to the East.',
		north: null,
		west: 'thirdRoom',
		east: 'fifthRoom',
		south: 'firstRoom',
		enemy: 'goblin'
	},
	thirdRoom: {
		surroundings: 'You are in what used to be a busy Alchemy lab.  Broken beakers and flasks are strewn across the dusty floor.  To the East is the way you came, and to the North is a tightly closed door...',
		north: 'forthRoom',
		west: null,
		east: 'secondRoom',
		south: null,
		item: 'potion'
	},
	forthRoom: {
		surroundings: 'The floor is missing and you plummet to your doom!',
		north: null,
		west: null,
		east: null,
		south: 'thirdRoom',
		instantDeath: true
	},
	fifthRoom: {
		surroundings: 'Your slain foe lies near the door from whence you came.  In the dim light you can see a small opening in the crumbling wall to the North.',
		north: 'sixthRoom',
		west: 'secondRoom',
		east: null,
		south: null,
		enemy: 'goblin'
	},
	sixthRoom: {
		surroundings: 'Here your path is split: to the West, a door with the word "DANGER" painted above.  To the North, a similar door with similar paint that reads "Certainly no danger"',
		north: 'eighthRoom',
		west: 'seventhRoom',
		east: null,
		south: 'fifthRoom'
	},
	seventhRoom: {
		surroundings: 'The door locks behind you and the walls rush inward to crush you flat!  You perish...',
		north: 'null',
		west: null,
		east: 'sixthRoom',
		south: null,
		instantDeath: true
	},
	eighthRoom: {
		surroundings: 'After slaying the troll, you notice an entrance to a cave the troll appeared to bo defending to the North.  There is also a heavy wooden door to the West.',
		north: 'twelfthRoom',
		west: 'ninthRoom',
		east: null,
		south: 'sixthRoom',
		enemy: 'troll'
	},
	ninthRoom: {
		surroundings: 'You are in a grand hall, with coats of arms on each wall.  To the West, you can spot a small door.  To the North, a wide, sweeping staircase leading to huge double doors',
		north: 'thirteenthRoom',
		west: 'tenthRoom',
		east: 'eighthRoom',
		south: null,
		enemy: 'goblin'
	},
	tenthRoom: {
		surroundings: 'You find yourself in what appears to be an old Supply room.  Most of the goods have been looted or spoiled.  You see a locked door to the North, but the lock appears to have been broken...',
		north: 'eleventhRoom',
		west: null,
		east: 'ninthRoom',
		south: null,
		item: 'potion'
	},
	eleventhRoom: {
		surroundings: 'Oh no!  Poison gas quickly fills the room and spears shoot from holes in the wall!  You don\'t make it...',
		north: null,
		west: null,
		east: null,
		south: 'tenthRoom',
		instantDeath: true
	},
	twelfthRoom: {
		surroundings: 'Inside the Trolls\' cave, the floor is covered with skeletons of less-skilled warriors than yourself.  In the gloom, you see the glint of something shiny under a pile of tattered clothes and crumpled armor...',
		north: null,
		west: null,
		east: null,
		south: 'eighthRoom',
		item: 'sword',
		enemy: 'troll'
	},
	thirteenthRoom: {
		surroundings: 'You can see daylight streaming from the crack under the Northern door; and behind you is the way you came along with the fallen dungeon Boss',
		north: 'win',
		west: null,
		east: null,
		south: 'ninthRoom',
		enemy: 'boss'
	}
}