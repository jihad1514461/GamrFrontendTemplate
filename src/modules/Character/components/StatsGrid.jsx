import React from 'react';
import { Shield } from 'lucide-react';

const StatsGrid = ({ stats, theme }) => (
	<div className="grid grid-cols-2 gap-4">
		{Object.entries(stats).map(([name, value]) => (
			<div key={name} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}>
				<div className="flex items-center space-x-2">
					<Shield className="w-4 h-4" style={{ color: theme.palette.primary.main }} />
					<span className="text-sm font-medium capitalize" style={{ color: theme.palette.text.primary }}>
						{name}
					</span>
				</div>
				<span className="text-lg font-bold" style={{ color: theme.palette.primary.main }}>
					{value}
				</span>
			</div>
		))}
	</div>
);

export default StatsGrid;


