import React from 'react';
import QuestCard from '../../Quests/components/QuestCard';
import { Target } from 'lucide-react';

const ActiveQuestsPanel = ({ activeQuests, navigate, theme }) => (
	<div className="p-6 rounded-lg h-100" style={{ backgroundColor: theme.palette.background.card, boxShadow: theme.shadows.card }}>
		<div className="flex justify-between items-center mb-4">
			<h2 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
				Active Quests
			</h2>
			<button onClick={() => navigate('/quests')} className="text-sm font-medium transition-colors" style={{ color: theme.palette.primary.main }}>
				View All →
			</button>
		</div>
		<div className="space-y-4">
			{activeQuests.length > 0 ? (
				activeQuests.map((quest) => (
					<QuestCard key={quest.id} quest={quest} variant="compact" showProgress={true} onClick={() => navigate('/quests')} />
				))
			) : (
				<div className="text-center py-8">
					<Target className="w-12 h-12 mx-auto mb-4" style={{ color: theme.palette.text.secondary }} />
					<p style={{ color: theme.palette.text.secondary }}>
						No active quests. Visit the quest board to start your adventure!
					</p>
				</div>
			)}
		</div>
	</div>
);

export default ActiveQuestsPanel;


