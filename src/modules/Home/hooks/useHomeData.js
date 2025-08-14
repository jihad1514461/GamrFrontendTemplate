import { useGame } from '../../Core/contexts/GameContext';
import { useTheme } from '../../Core/contexts/ThemeContext';

export const useHomeData = () => {
	const { player, inventory, quests, spells } = useGame();
	const { theme, toggleTheme, isDarkMode } = useTheme();

	const activeQuests = quests.filter((q) => q.status === 'active').slice(0, 2);
	const recentItems = inventory.slice(0, 3);
	const favoriteSpells = spells.slice(0, 2);

	const canCast = (spell) => player.mana >= (spell?.manaCost ?? 0);

	return {
		player,
		inventory,
		quests,
		spells,
		activeQuests,
		recentItems,
		favoriteSpells,
		theme,
		isDarkMode,
		toggleTheme,
		canCast,
	};
};


