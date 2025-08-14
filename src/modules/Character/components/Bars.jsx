import React from 'react';
import { Heart, Zap } from 'lucide-react';

export const HealthBar = ({ current, max, theme }) => (
	<div>
		<div className="flex justify-between items-center mb-1">
			<div className="flex items-center space-x-1">
				<Heart className="w-4 h-4 text-red-500" />
				<span className="text-sm font-medium" style={{ color: theme.palette.text.primary }}>
					Health
				</span>
			</div>
			<span className="text-sm" style={{ color: theme.palette.text.secondary }}>
				{current}/{max}
			</span>
		</div>
		<div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}>
			<div className="h-full rounded-full transition-all duration-500" style={{ width: `${(current / max) * 100}%`, backgroundColor: '#EF4444' }} />
		</div>
	</div>
);

export const ManaBar = ({ current, max, theme }) => (
	<div>
		<div className="flex justify-between items-center mb-1">
			<div className="flex items-center space-x-1">
				<Zap className="w-4 h-4 text-blue-500" />
				<span className="text-sm font-medium" style={{ color: theme.palette.text.primary }}>
					Mana
				</span>
			</div>
			<span className="text-sm" style={{ color: theme.palette.text.secondary }}>
				{current}/{max}
			</span>
		</div>
		<div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}>
			<div className="h-full rounded-full transition-all duration-500" style={{ width: `${(current / max) * 100}%`, backgroundColor: '#3B82F6' }} />
		</div>
	</div>
);

export const ExperienceBar = ({ current, max, theme }) => (
	<div>
		<div className="flex justify-between items-center mb-1">
			<span className="text-sm font-medium" style={{ color: theme.palette.text.primary }}>
				Experience
			</span>
			<span className="text-sm" style={{ color: theme.palette.text.secondary }}>
				{current}/{max}
			</span>
		</div>
		<div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}>
			<div className="h-full rounded-full transition-all duration-500" style={{ width: `${(current / max) * 100}%`, backgroundColor: '#10B981' }} />
		</div>
	</div>
);


