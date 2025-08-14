import React from 'react';
import { Package, Target, Zap, Sword } from 'lucide-react';

const QuickActions = ({ theme, inventoryCount, activeQuestsCount, spellsCount, level, onInventory, onQuests, onSpells, onCharacter }) => (
	<div className="p-6 rounded-lg" style={{ backgroundColor: theme.palette.background.card, boxShadow: theme.shadows.card }}>
		<h2 className="text-xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
			Quick Actions
		</h2>
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			<button onClick={onInventory} className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2" style={{ borderColor: theme.palette.primary.main, backgroundColor: 'transparent', color: theme.palette.primary.main }}>
				<Package className="w-8 h-8 mx-auto mb-2" />
				<div className="font-medium">Inventory</div>
				<div className="text-sm opacity-70">{inventoryCount} items</div>
			</button>
			<button onClick={onQuests} className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2" style={{ borderColor: theme.palette.secondary.main, backgroundColor: 'transparent', color: theme.palette.secondary.main }}>
				<Target className="w-8 h-8 mx-auto mb-2" />
				<div className="font-medium">Quests</div>
				<div className="text-sm opacity-70">{activeQuestsCount} active</div>
			</button>
			<button onClick={onSpells} className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2" style={{ borderColor: theme.palette.info.main, backgroundColor: 'transparent', color: theme.palette.info.main }}>
				<Zap className="w-8 h-8 mx-auto mb-2" />
				<div className="font-medium">Spells</div>
				<div className="text-sm opacity-70">{spellsCount} learned</div>
			</button>
			<button onClick={onCharacter} className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2" style={{ borderColor: theme.palette.success.main, backgroundColor: 'transparent', color: theme.palette.success.main }}>
				<Sword className="w-8 h-8 mx-auto mb-2" />
				<div className="font-medium">Character</div>
				<div className="text-sm opacity-70">Level {level}</div>
			</button>
		</div>
	</div>
);

export default QuickActions;


