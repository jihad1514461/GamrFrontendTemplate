import React from 'react';
import { User } from 'lucide-react';

const CharacterHeader = ({ name, level, avatar, theme }) => (
	<div className="flex items-center space-x-4 mb-6">
		<div
			className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
			style={{ backgroundColor: theme.palette.primary.main }}
		>
			{avatar ? (
				<img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
			) : (
				<User className="w-8 h-8" />
			)}
		</div>
		<div>
			<h3 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
				{name}
			</h3>
			<p className="text-lg font-medium" style={{ color: theme.palette.primary.main }}>
				Level {level}
			</p>
		</div>
	</div>
);

export default CharacterHeader;


