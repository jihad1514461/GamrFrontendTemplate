import React, { createContext, useContext, useReducer, useCallback } from 'react';

const GameContext = createContext();

const initialState = {
  player: {
    name: 'Hero',
    level: 1,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    experience: 0,
    experienceToNext: 100,
    stats: {
      strength: 10,
      agility: 8,
      intelligence: 12,
      defense: 7,
    },
  },
  inventory: [
    { id: 1, name: 'Health Potion', type: 'consumable', rarity: 'common', quantity: 5 },
    { id: 2, name: 'Steel Sword', type: 'weapon', rarity: 'uncommon', quantity: 1 },
    { id: 3, name: 'Magic Ring', type: 'accessory', rarity: 'rare', quantity: 1 },
  ],
  quests: [
    {
      id: 1,
      title: 'Defeat the Goblin King',
      description: 'Clear the goblin camp and defeat their leader',
      progress: 3,
      maxProgress: 5,
      reward: '500 XP, Gold Sword',
      status: 'active',
    },
    {
      id: 2,
      title: 'Collect Mystical Herbs',
      description: 'Gather 10 rare herbs for the village alchemist',
      progress: 7,
      maxProgress: 10,
      reward: '300 XP, Health Elixir',
      status: 'active',
    },
  ],
  spells: [
    { id: 1, name: 'Fireball', manaCost: 15, damage: 25, type: 'attack' },
    { id: 2, name: 'Heal', manaCost: 10, healing: 20, type: 'support' },
    { id: 3, name: 'Shield', manaCost: 8, defense: 15, type: 'buff' },
  ],
  gameSettings: {
    soundEnabled: true,
    musicEnabled: true,
    autoSave: true,
  },
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYER':
      return {
        ...state,
        player: { ...state.player, ...action.payload },
      };
    case 'ADD_INVENTORY_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };
    case 'REMOVE_INVENTORY_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUEST':
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest.id === action.payload.id ? { ...quest, ...action.payload.updates } : quest
        ),
      };
    case 'CAST_SPELL':
      const spell = state.spells.find(s => s.id === action.payload.spellId);
      if (!spell || state.player.mana < spell.manaCost) return state;
      
      return {
        ...state,
        player: {
          ...state.player,
          mana: state.player.mana - spell.manaCost,
        },
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        gameSettings: { ...state.gameSettings, ...action.payload },
      };
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const updatePlayer = useCallback((updates) => {
    dispatch({ type: 'UPDATE_PLAYER', payload: updates });
  }, []);

  const addInventoryItem = useCallback((item) => {
    dispatch({ type: 'ADD_INVENTORY_ITEM', payload: item });
  }, []);

  const removeInventoryItem = useCallback((itemId) => {
    dispatch({ type: 'REMOVE_INVENTORY_ITEM', payload: itemId });
  }, []);

  const updateQuest = useCallback((questId, updates) => {
    dispatch({ type: 'UPDATE_QUEST', payload: { id: questId, updates } });
  }, []);

  const castSpell = useCallback((spellId) => {
    dispatch({ type: 'CAST_SPELL', payload: { spellId } });
  }, []);

  const updateSettings = useCallback((settings) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  const value = {
    ...state,
    updatePlayer,
    addInventoryItem,
    removeInventoryItem,
    updateQuest,
    castSpell,
    updateSettings,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};