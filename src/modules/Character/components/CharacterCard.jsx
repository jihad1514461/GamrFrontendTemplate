import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@material-tailwind/react';
import { User, Shield, Zap, Heart } from 'lucide-react';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { useFadeIn } from '../../Core/hooks/useAnimation';

const CharacterCard = ({ 
  character,
  showStats = true,
  showHealth = true,
  onClick,
  className = '',
  variant = 'detailed'
}) => {
  const { theme } = useTheme();
  const fadeInStyle = useFadeIn(100);

  const {
    name = 'Unknown Hero',
    level = 1,
    health = 100,
    maxHealth = 100,
    mana = 50,
    maxMana = 50,
    avatar,
    stats = {},
    experience = 0,
    experienceToNext = 100
  } = character;

  const healthPercentage = (health / maxHealth) * 100;
  const manaPercentage = (mana / maxMana) * 100;
  const expPercentage = (experience / experienceToNext) * 100;

  const cardStyle = {
    backgroundColor: theme.palette.background.card,
    borderColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
    boxShadow: theme.shadows.card,
    ...fadeInStyle,
  };

  if (variant === 'compact') {
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
        style={cardStyle}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick && onClick()}
      >
        <CardBody className="p-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: theme.palette.primary.main }}
            >
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6" />
              )}
            </div>
            <div className="flex-1">
              <h3 
                className="font-semibold text-lg"
                style={{ color: theme.palette.text.primary }}
              >
                {name}
              </h3>
              <p 
                className="text-sm"
                style={{ color: theme.palette.text.secondary }}
              >
                Level {level}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      className={`transition-all duration-300 hover:scale-105 hover:shadow-lg ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={cardStyle}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyPress={(e) => e.key === 'Enter' && onClick && onClick()}
    >
      <CardBody className="p-6">
        {/* Character Avatar and Basic Info */}
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
            <h3 
              className="text-xl font-bold"
              style={{ color: theme.palette.text.primary }}
            >
              {name}
            </h3>
            <p 
              className="text-lg font-medium"
              style={{ color: theme.palette.primary.main }}
            >
              Level {level}
            </p>
          </div>
        </div>

        {/* Health and Mana Bars */}
        {showHealth && (
          <div className="space-y-3 mb-6">
            {/* Health Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Health
                  </span>
                </div>
                <span 
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {health}/{maxHealth}
                </span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${healthPercentage}%`,
                    backgroundColor: '#EF4444'
                  }}
                />
              </div>
            </div>

            {/* Mana Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span 
                    className="text-sm font-medium"
                    style={{ color: theme.palette.text.primary }}
                  >
                    Mana
                  </span>
                </div>
                <span 
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {mana}/{maxMana}
                </span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${manaPercentage}%`,
                    backgroundColor: '#3B82F6'
                  }}
                />
              </div>
            </div>

            {/* Experience Bar */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span 
                  className="text-sm font-medium"
                  style={{ color: theme.palette.text.primary }}
                >
                  Experience
                </span>
                <span 
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {experience}/{experienceToNext}
                </span>
              </div>
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${expPercentage}%`,
                    backgroundColor: '#10B981'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Character Stats */}
        {showStats && Object.keys(stats).length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats).map(([statName, statValue]) => (
              <div 
                key={statName}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}
              >
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" style={{ color: theme.palette.primary.main }} />
                  <span 
                    className="text-sm font-medium capitalize"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {statName}
                  </span>
                </div>
                <span 
                  className="text-lg font-bold"
                  style={{ color: theme.palette.primary.main }}
                >
                  {statValue}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    level: PropTypes.number,
    health: PropTypes.number,
    maxHealth: PropTypes.number,
    mana: PropTypes.number,
    maxMana: PropTypes.number,
    avatar: PropTypes.string,
    stats: PropTypes.object,
    experience: PropTypes.number,
    experienceToNext: PropTypes.number,
  }).isRequired,
  showStats: PropTypes.bool,
  showHealth: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['detailed', 'compact']),
};

export default CharacterCard;