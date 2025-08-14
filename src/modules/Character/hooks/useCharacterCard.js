export const useCharacterCard = (character) => {
	const {
		name = 'Unknown Hero',
		level = 1,
		health = 100,
		maxHealth = 100,
		mana = 50,
		maxMana = 50,
		avatar,
		stats = {},
		experience = 0,
		experienceToNext = 100,
	} = character;

	return {
		name,
		level,
		health,
		maxHealth,
		mana,
		maxMana,
		avatar,
		stats,
		experience,
		experienceToNext,
	};
};


