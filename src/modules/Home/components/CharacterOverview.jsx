import React from 'react';
import CharacterCard from '../../Character/components/CharacterCard';

const CharacterOverview = ({ player, onClick }) => (
	<CharacterCard 
		character={player}
		variant="detailed"
		showStats={true}
		showHealth={true}
		onClick={onClick}
		className="h-100"
	/>
);

export default CharacterOverview;


