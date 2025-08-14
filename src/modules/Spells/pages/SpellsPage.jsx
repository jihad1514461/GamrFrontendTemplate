import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SpellCard from '../components/SpellCard';
import Tabs from '../../Core/components/ui/Tabs';
import Modal from '../../Core/components/ui/Modal';
import HealthBar from '../../Core/components/ui/HealthBar';
import { useGame } from '../../Core/contexts/GameContext';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { Zap, Swords, Heart, Shield } from 'lucide-react';

const SpellsPage = () => {
  const { spells, player, castSpell } = useGame();
  const { theme } = useTheme();
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [showSpellModal, setShowSpellModal] = useState(false);

  const handleSpellClick = (spell) => {
    setSelectedSpell(spell);
    setShowSpellModal(true);
  };

  const handleCastSpell = (spell) => {
    const canCast = player.mana >= spell.manaCost;
    if (canCast) {
      castSpell(spell.id);
      setShowSpellModal(false);
      console.log('Casting spell:', spell.name);
    }
  };

  const getSpellsByType = (type) => {
    return spells.filter(spell => spell.type === type);
  };

  const canCastSpell = (spell) => {
    return player.mana >= spell.manaCost;
  };

  const tabs = [
    {
      label: 'All Spells',
      icon: <Zap className="w-4 h-4" />,
      badge: spells.length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {spells.map(spell => (
            <SpellCard
              key={spell.id}
              spell={spell}
              onClick={handleSpellClick}
              canCast={canCastSpell(spell)}
              variant="detailed"
              showManaCost={true}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Attack',
      icon: <Swords className="w-4 h-4" />,
      badge: getSpellsByType('attack').length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {getSpellsByType('attack').map(spell => (
            <SpellCard
              key={spell.id}
              spell={spell}
              onClick={handleSpellClick}
              canCast={canCastSpell(spell)}
              variant="detailed"
              showManaCost={true}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Support',
      icon: <Heart className="w-4 h-4" />,
      badge: getSpellsByType('support').length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {getSpellsByType('support').map(spell => (
            <SpellCard
              key={spell.id}
              spell={spell}
              onClick={handleSpellClick}
              canCast={canCastSpell(spell)}
              variant="detailed"
              showManaCost={true}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Buff',
      icon: <Shield className="w-4 h-4" />,
      badge: getSpellsByType('buff').length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {getSpellsByType('buff').map(spell => (
            <SpellCard
              key={spell.id}
              spell={spell}
              onClick={handleSpellClick}
              canCast={canCastSpell(spell)}
              variant="detailed"
              showManaCost={true}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-3xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
              Spellbook
            </h1>
            
            {/* Mana Bar */}
            <div className="mb-8 max-w-md">
              <HealthBar
                label="Mana"
                current={player.mana}
                max={player.maxMana}
                type="mana"
                size="large"
                animated={true}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* Spell Tabs */}
            <Tabs
              tabs={tabs}
              variant="bordered"
              className="mb-6"
            />
          </Col>
        </Row>

        {/* Spell Details Modal */}
        {selectedSpell && (
          <Modal
            show={showSpellModal}
            onHide={() => setShowSpellModal(false)}
            title={selectedSpell.name}
            size="md"
          >
            <div className="space-y-6">
              <SpellCard
                spell={selectedSpell}
                canCast={canCastSpell(selectedSpell)}
                variant="detailed"
                showManaCost={true}
                className="border-0 shadow-none"
              />

              {selectedSpell.description && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.default }}>
                  <h4 className="font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                    Spell Description
                  </h4>
                  <p className="text-sm" style={{ color: theme.palette.text.secondary }}>
                    {selectedSpell.description}
                  </p>
                </div>
              )}

              {/* Casting Requirements */}
              <div className="p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.default }}>
                <h4 className="font-semibold mb-3" style={{ color: theme.palette.text.primary }}>
                  Casting Requirements
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span style={{ color: theme.palette.text.secondary }}>Mana Cost:</span>
                    <span 
                      style={{ 
                        color: canCastSpell(selectedSpell) ? theme.palette.success.main : theme.palette.error.main 
                      }}
                    >
                      {selectedSpell.manaCost} / {player.mana}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.palette.text.secondary }}>Spell Level:</span>
                    <span style={{ color: theme.palette.text.primary }}>
                      {selectedSpell.level || 1}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: theme.palette.text.secondary }}>Range:</span>
                    <span style={{ color: theme.palette.text.primary }}>
                      {selectedSpell.range || 'Self'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Spell Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t" style={{ borderColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}>
                <button
                  onClick={() => setShowSpellModal(false)}
                  className="px-4 py-2 rounded-lg border transition-colors"
                  style={{
                    borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                    color: theme.palette.text.primary,
                    backgroundColor: 'transparent',
                  }}
                >
                  Close
                </button>

                <button
                  onClick={() => handleCastSpell(selectedSpell)}
                  disabled={!canCastSpell(selectedSpell)}
                  className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    backgroundColor: canCastSpell(selectedSpell) ? theme.palette.primary.main : theme.palette.text.disabled 
                  }}
                >
                  Cast Spell
                </button>
              </div>
            </div>
          </Modal>
        )}

        {spells.length === 0 && (
          <Row>
            <Col>
              <div className="text-center py-12">
                <Zap className="w-16 h-16 mx-auto mb-4" style={{ color: theme.palette.text.secondary }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                  No Spells Learned
                </h3>
                <p style={{ color: theme.palette.text.secondary }}>
                  Visit spell trainers or find spell tomes to learn new magic!
                </p>
              </div>
            </Col>
          </Row>
        )}

        {/* Quick Cast Bar */}
        <div 
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg"
          style={{ backgroundColor: theme.palette.background.card }}
        >
          <h4 className="text-sm font-semibold mb-2 text-center" style={{ color: theme.palette.text.primary }}>
            Quick Cast
          </h4>
          <div className="flex space-x-2">
            {spells.slice(0, 5).map(spell => (
              <button
                key={spell.id}
                onClick={() => handleCastSpell(spell)}
                disabled={!canCastSpell(spell)}
                className={`w-12 h-12 rounded-lg border-2 transition-all ${
                  canCastSpell(spell) ? 'hover:scale-110' : 'opacity-50 cursor-not-allowed'
                }`}
                style={{
                  backgroundColor: canCastSpell(spell) ? theme.palette.primary.main : theme.palette.text.disabled,
                  borderColor: canCastSpell(spell) ? theme.palette.primary.dark : theme.palette.text.disabled,
                  color: '#ffffff'
                }}
                title={`${spell.name} (${spell.manaCost} mana)`}
              >
                <Zap className="w-5 h-5 mx-auto" />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SpellsPage;