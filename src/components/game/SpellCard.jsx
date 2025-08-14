import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@material-tailwind/react';
import { Zap, Shield, Heart, Swords } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFadeIn } from '../../hooks/useAnimation';

const SpellCard = ({ 
  spell,
  onClick,
  canCast = true,
  className = '',
  variant = 'detailed',
  showManaCost = true
}) => {
  const { theme } = useTheme();
  const fadeInStyle = useFadeIn(200);

  const {
    id,
    name = 'Unknown Spell',
    manaCost = 0,
    damage = 0,
    healing = 0,
    defense = 0,
    type = 'attack',
    description = '',
    icon,
    cooldown = 0,
    level = 1,
    range = 'self'
  } = spell;

  const typeIcons = {
    attack: Swords,
    support: Heart,
    buff: Shield,
    debuff: Zap,
  };

  const typeColors = {
    attack: '#EF4444',
    support: '#10B981',
    buff: '#3B82F6',
    debuff: '#8B5CF6',
  };

  const IconComponent = typeIcons[type] || Zap;
  const typeColor = typeColors[type] || theme.palette.primary.main;

  const cardStyle = {
    backgroundColor: theme.palette.background.card,
    borderColor: canCast ? typeColor : theme.palette.text.disabled,
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: theme.shadows.card,
    opacity: canCast ? 1 : 0.6,
    ...fadeInStyle,
  };

  if (variant === 'compact') {
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${!canCast ? 'cursor-not-allowed' : ''} ${className}`}
        style={cardStyle}
        onClick={() => canCast && onClick && onClick(spell)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && canCast && onClick && onClick(spell)}
        title={`${name}${description ? ` - ${description}` : ''}`}
      >
        <CardBody className="p-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: typeColor }}
            >
              {icon ? (
                <img src={icon} alt={name} className="w-8 h-8 object-cover" />
              ) : (
                <IconComponent className="w-6 h-6" />
              )}
            </div>
            
            <div className="flex-1">
              <h3 
                className="font-semibold"
                style={{ color: theme.palette.text.primary }}
              >
                {name}
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                {showManaCost && (
                  <span 
                    className="flex items-center space-x-1"
                    style={{ color: theme.palette.info.main }}
                  >
                    <Zap className="w-3 h-3" />
                    <span>{manaCost}</span>
                  </span>
                )}
                <span 
                  className="capitalize"
                  style={{ color: typeColor }}
                >
                  {type}
                </span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg ${!canCast ? 'cursor-not-allowed' : ''} ${className}`}
      style={cardStyle}
      onClick={() => canCast && onClick && onClick(spell)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && canCast && onClick && onClick(spell)}
    >
      <CardBody className="p-6">
        <div className="flex items-start space-x-4">
          {/* Spell Icon */}
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: typeColor }}
          >
            {icon ? (
              <img src={icon} alt={name} className="w-12 h-12 object-cover rounded" />
            ) : (
              <IconComponent className="w-8 h-8" />
            )}
          </div>

          {/* Spell Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 
                  className="text-xl font-bold"
                  style={{ color: theme.palette.text.primary }}
                >
                  {name}
                </h3>
                <p 
                  className="text-sm capitalize"
                  style={{ color: typeColor }}
                >
                  {type} Spell • Level {level}
                </p>
              </div>

              {showManaCost && (
                <div 
                  className="flex items-center space-x-1 px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: theme.palette.info.main,
                    color: '#ffffff'
                  }}
                >
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">{manaCost}</span>
                </div>
              )}
            </div>

            {description && (
              <p 
                className="text-sm mb-4"
                style={{ color: theme.palette.text.secondary }}
              >
                {description}
              </p>
            )}

            {/* Spell Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {damage > 0 && (
                <div className="flex justify-between">
                  <span 
                    className="text-sm"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Damage:
                  </span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: '#EF4444' }}
                  >
                    {damage}
                  </span>
                </div>
              )}

              {healing > 0 && (
                <div className="flex justify-between">
                  <span 
                    className="text-sm"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Healing:
                  </span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: '#10B981' }}
                  >
                    {healing}
                  </span>
                </div>
              )}

              {defense > 0 && (
                <div className="flex justify-between">
                  <span 
                    className="text-sm"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    Defense:
                  </span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: '#3B82F6' }}
                  >
                    +{defense}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span 
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  Range:
                </span>
                <span 
                  className="text-sm font-medium capitalize"
                  style={{ color: theme.palette.text.primary }}
                >
                  {range}
                </span>
              </div>
            </div>

            {cooldown > 0 && (
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}
              >
                <span 
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  Cooldown: 
                </span>
                <span 
                  className="text-sm font-medium ml-1"
                  style={{ color: theme.palette.warning.main }}
                >
                  {cooldown}s
                </span>
              </div>
            )}

            {!canCast && (
              <div 
                className="mt-2 p-2 rounded-lg text-center"
                style={{ backgroundColor: theme.palette.error.main + '20' }}
              >
                <span 
                  className="text-sm font-medium"
                  style={{ color: theme.palette.error.main }}
                >
                  Insufficient Mana
                </span>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

SpellCard.propTypes = {
  spell: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    manaCost: PropTypes.number,
    damage: PropTypes.number,
    healing: PropTypes.number,
    defense: PropTypes.number,
    type: PropTypes.oneOf(['attack', 'support', 'buff', 'debuff']),
    description: PropTypes.string,
    icon: PropTypes.string,
    cooldown: PropTypes.number,
    level: PropTypes.number,
    range: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  canCast: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['detailed', 'compact']),
  showManaCost: PropTypes.bool,
};

export default SpellCard;