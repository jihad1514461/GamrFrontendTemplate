import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CharacterCard from '../../Character/components/CharacterCard';
import QuestCard from '../../Quests/components/QuestCard';
import ItemCard from '../../Inventory/components/ItemCard';
import SpellCard from '../../Spells/components/SpellCard';
import HealthBar from '../../Core/components/ui/HealthBar';
import { useGame } from '../../Core/contexts/GameContext';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { Sword, Package, Target, Zap, Settings } from 'lucide-react';

const HomePage = () => {
  const { player, inventory, quests, spells } = useGame();
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const navigate = useNavigate();

  const activeQuests = quests.filter(q => q.status === 'active').slice(0, 2);
  const recentItems = inventory.slice(0, 3);
  const favoriteSpells = spells.slice(0, 2);

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container fluid>
        {/* Header */}
        <Row className="mb-8">
          <Col>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-bold mb-2" style={{ color: theme.palette.text.primary }}>
                  Welcome back, {player.name}!
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
          </Col>
        </Row>

        <Row>
          {/* Character Overview */}
          <Col xl={4} lg={6} className="mb-6">
            <CharacterCard 
              character={player}
              variant="detailed"
              showStats={true}
              showHealth={true}
              onClick={() => navigate('/character')}
              className="h-100"
            />
          </Col>

          {/* Quick Stats */}
          <Col xl={8} lg={6} className="mb-6">
            <div 
              className="p-6 rounded-lg h-100"
              style={{ 
                backgroundColor: theme.palette.background.card,
                boxShadow: theme.shadows.card 
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: theme.palette.text.primary }}>
                Character Status
              </h2>

              <div className="space-y-4">
                <HealthBar
                  label="Health"
                  current={player.health}
                  max={player.maxHealth}
                  type="health"
                  size="large"
                  animated={true}
                />

                <HealthBar
                  label="Mana"
                  current={player.mana}
                  max={player.maxMana}
                  type="mana"
                  size="large"
                  animated={true}
                />

                <HealthBar
                  label="Experience"
                  current={player.experience}
                  max={player.experienceToNext}
                  type="energy"
                  size="medium"
                  color="#10B981"
                  animated={true}
                />
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4">
                {Object.entries(player.stats).map(([statName, statValue]) => (
                  <div 
                    key={statName}
                    className="text-center p-3 rounded-lg"
                    style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}
                  >
                    <div 
                      className="text-xl font-bold"
                      style={{ color: theme.palette.primary.main }}
                    >
                      {statValue}
                    </div>
                    <div 
                      className="text-sm font-medium capitalize"
                      style={{ color: theme.palette.text.primary }}
                    >
                      {statName}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mb-8">
          <Col>
            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: theme.palette.background.card,
                boxShadow: theme.shadows.card 
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/inventory')}
                  className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                    color: theme.palette.primary.main,
                  }}
                >
                  <Package className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Inventory</div>
                  <div className="text-sm opacity-70">{inventory.length} items</div>
                </button>

                <button
                  onClick={() => navigate('/quests')}
                  className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: 'transparent',
                    color: theme.palette.secondary.main,
                  }}
                >
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Quests</div>
                  <div className="text-sm opacity-70">{activeQuests.length} active</div>
                </button>

                <button
                  onClick={() => navigate('/spells')}
                  className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: theme.palette.info.main,
                    backgroundColor: 'transparent',
                    color: theme.palette.info.main,
                  }}
                >
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Spells</div>
                  <div className="text-sm opacity-70">{spells.length} learned</div>
                </button>

                <button
                  onClick={() => navigate('/character')}
                  className="p-4 rounded-lg border-2 transition-all hover:scale-105 focus:outline-none focus:ring-2"
                  style={{
                    borderColor: theme.palette.success.main,
                    backgroundColor: 'transparent',
                    color: theme.palette.success.main,
                  }}
                >
                  <Sword className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Character</div>
                  <div className="text-sm opacity-70">Level {player.level}</div>
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Active Quests */}
          <Col lg={6} className="mb-6">
            <div 
              className="p-6 rounded-lg h-100"
              style={{ 
                backgroundColor: theme.palette.background.card,
                boxShadow: theme.shadows.card 
              }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
                  Active Quests
                </h2>
                <button
                  onClick={() => navigate('/quests')}
                  className="text-sm font-medium transition-colors"
                  style={{ color: theme.palette.primary.main }}
                >
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {activeQuests.length > 0 ? (
                  activeQuests.map(quest => (
                    <QuestCard
                      key={quest.id}
                      quest={quest}
                      variant="compact"
                      showProgress={true}
                      onClick={() => navigate('/quests')}
                    />
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
          </Col>

          {/* Recent Items & Favorite Spells */}
          <Col lg={6}>
            <div className="space-y-6">
              {/* Recent Items */}
              <div 
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: theme.palette.background.card,
                  boxShadow: theme.shadows.card 
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
                    Recent Items
                  </h2>
                  <button
                    onClick={() => navigate('/inventory')}
                    className="text-sm font-medium transition-colors"
                    style={{ color: theme.palette.primary.main }}
                  >
                    View Inventory →
                  </button>
                </div>
                
                <div className="space-y-3">
                  {recentItems.length > 0 ? (
                    recentItems.map(item => (
                      <ItemCard
                        key={item.id}
                        item={item}
                        variant="grid"
                        showRarity={true}
                        onClick={() => navigate('/inventory')}
                        className="w-full"
                      />
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <Package className="w-8 h-8 mx-auto mb-2" style={{ color: theme.palette.text.secondary }} />
                      <p className="text-sm" style={{ color: theme.palette.text.secondary }}>
                        No items in inventory
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Favorite Spells */}
              <div 
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: theme.palette.background.card,
                  boxShadow: theme.shadows.card 
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold" style={{ color: theme.palette.text.primary }}>
                    Quick Spells
                  </h2>
                  <button
                    onClick={() => navigate('/spells')}
                    className="text-sm font-medium transition-colors"
                    style={{ color: theme.palette.primary.main }}
                  >
                    View Spellbook →
                  </button>
                </div>
                
                <div className="space-y-3">
                  {favoriteSpells.length > 0 ? (
                    favoriteSpells.map(spell => (
                      <SpellCard
                        key={spell.id}
                        spell={spell}
                        variant="compact"
                        canCast={player.mana >= spell.manaCost}
                        onClick={() => navigate('/spells')}
                      />
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;