import React from 'react';

const HeaderBar = ({ playerName, isDarkMode, toggleTheme, theme }) => (
	<div className="flex justify-between items-center">
		<div>
			<h1 className="text-4xl font-bold mb-2" style={{ color: theme.palette.text.primary }}>
				Welcome back, {playerName}!
			</h1>
			<p className="text-lg" style={{ color: theme.palette.text.secondary }}>
				Ready for your next adventure?
			</p>
		</div>
		<button
			onClick={toggleTheme}
			className="p-3 rounded-lg border transition-all hover:scale-105"
			style={{
				borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
				backgroundColor: theme.palette.background.card,
				color: theme.palette.text.primary,
			}}
			title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
		>
			{isDarkMode ? '☀️' : '🌙'}
		</button>
	</div>
);

export default HeaderBar;


