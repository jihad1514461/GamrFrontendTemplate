import React from 'react';
import SpellCard from '../../Spells/components/SpellCard';
import { Zap } from 'lucide-react';

const QuickSpellsPanel = ({ spells, canCast, navigate, theme }) => (
	<div className="p-6 rounded-lg" style={{ backgroundColor: theme.palette.background.card, boxShadow: theme.shadows.card }}>
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
				Quick Spells
			</h2>
			<button onClick={() => navigate('/spells')} className="text-sm font-medium transition-colors" style={{ color: theme.palette.primary.main }}>
				View Spellbook →
			</button>
		</div>
		<div className="space-y-3">
			{spells.length > 0 ? (
				spells.map((spell) => (
					<SpellCard key={spell.id} spell={spell} variant="compact" canCast={canCast(spell)} onClick={() => navigate('/spells')} />
				))
			) : (
				<div className="text-center py-4">
					<Zap className="w-8 h-8 mx-auto mb-2" style={{ color: theme.palette.text.secondary }} />
					<p className="text-sm" style={{ color: theme.palette.text.secondary }}>
						No spells learned
					</p>
				</div>
			)}
		</div>
	</div>
);

export default QuickSpellsPanel;


