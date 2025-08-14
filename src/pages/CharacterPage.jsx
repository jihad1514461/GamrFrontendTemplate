import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CharacterCard from '../components/game/CharacterCard';
import HealthBar from '../components/game/HealthBar';
import { useGame } from '../contexts/GameContext';
import { useTheme } from '../contexts/ThemeContext';

const CharacterPage = () => {
  const { player } = useGame();
  const { theme } = useTheme();

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container>
        <Row>
          <Col>
            <h1 className="text-3xl font-bold mb-8" style={{ color: theme.palette.text.primary }}>
              Character Profile
            </h1>
          </Col>
        </Row>

        <Row>
          {/* Character Card */}
          <Col lg={6} className="mb-6">
            <CharacterCard 
              character={player}
              variant="detailed"
              showStats={true}
              showHealth={true}
            />
          </Col>

          {/* Detailed Stats */}
          <Col lg={6}>
            <div 
              className="p-6 rounded-lg"
              style={{ 
                backgroundColor: theme.palette.background.card,
                boxShadow: theme.shadows.card 
              }}
            >
              <h2 className="text-xl font-bold mb-6" style={{ color: theme.palette.text.primary }}>
                Character Statistics
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

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.palette.text.primary }}>
                  Attribute Details
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(player.stats).map(([statName, statValue]) => (
                    <div 
                      key={statName}
                      className="p-4 rounded-lg text-center"
                      style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}
                    >
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: theme.palette.primary.main }}
                      >
                        {statValue}
                      </div>
                      <div 
                        className="text-sm font-medium capitalize mt-1"
                        style={{ color: theme.palette.text.primary }}
                      >
                        {statName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.default }}>
                <h4 className="font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                  Character Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span style={{ color: theme.palette.text.secondary }}>Level:</span>
                    <span className="ml-2 font-medium" style={{ color: theme.palette.text.primary }}>
                      {player.level}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: theme.palette.text.secondary }}>Name:</span>
                    <span className="ml-2 font-medium" style={{ color: theme.palette.text.primary }}>
                      {player.name}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: theme.palette.text.secondary }}>Health:</span>
                    <span className="ml-2 font-medium" style={{ color: theme.palette.text.primary }}>
                      {player.health} / {player.maxHealth}
                    </span>
                  </div>
                  <div>
                    <span style={{ color: theme.palette.text.secondary }}>Mana:</span>
                    <span className="ml-2 font-medium" style={{ color: theme.palette.text.primary }}>
                      {player.mana} / {player.maxMana}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CharacterPage;