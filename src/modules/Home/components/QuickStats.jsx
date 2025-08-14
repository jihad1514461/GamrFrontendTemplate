import React from 'react';
import HealthBar from '../../Core/components/ui/HealthBar';

const QuickStats = ({ player, theme }) => (
	<div 
		className="p-6 rounded-lg h-100"
		style={{ backgroundColor: theme.palette.background.card, boxShadow: theme.shadows.card }}
	>
		<h2 className="text-xl font-bold mb-6" style={{ color: theme.palette.text.primary }}>
			Character Status
		</h2>

		<div className="space-y-4">
			<HealthBar label="Health" current={player.health} max={player.maxHealth} type="health" size="large" animated={true} />
			<HealthBar label="Mana" current={player.mana} max={player.maxMana} type="mana" size="large" animated={true} />
			<HealthBar label="Experience" current={player.experience} max={player.experienceToNext} type="energy" size="medium" color="#10B981" animated={true} />
		</div>

		<div className="mt-6 grid grid-cols-4 gap-4">
			{Object.entries(player.stats).map(([name, value]) => (
				<div key={name} className="text-center p-3 rounded-lg" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}>
					<div className="text-xl font-bold" style={{ color: theme.palette.primary.main }}>
						{value}
					</div>
					<div className="text-sm font-medium capitalize" style={{ color: theme.palette.text.primary }}>
						{name}
					</div>
				</div>
			))}
		</div>
	</div>
);

export default QuickStats;


