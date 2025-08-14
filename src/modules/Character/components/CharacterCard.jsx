import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@material-tailwind/react';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { useFadeIn } from '../../Core/hooks/useAnimation';
import CharacterHeader from './CharacterHeader';
import { HealthBar, ManaBar, ExperienceBar } from './Bars';
import StatsGrid from './StatsGrid';
import { useCharacterCard } from '../hooks/useCharacterCard';

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

  const { name, level, health, maxHealth, mana, maxMana, avatar, stats, experience, experienceToNext } = useCharacterCard(character);

  const cardStyle = {
    backgroundColor: theme.palette.background.card,
    borderColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB',
    boxShadow: theme.shadows.card,
    ...fadeInStyle,
  };

  if (variant === 'compact') {
    return (
      <Card className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`} style={cardStyle} onClick={onClick} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && onClick && onClick()}>
        <CardBody className="p-4">
          <CharacterHeader name={name} level={level} avatar={avatar} theme={theme} />
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
        <CharacterHeader name={name} level={level} avatar={avatar} theme={theme} />
        {showHealth && (
          <div className="space-y-3 mb-6">
            <HealthBar current={health} max={maxHealth} theme={theme} />
            <ManaBar current={mana} max={maxMana} theme={theme} />
            <ExperienceBar current={experience} max={experienceToNext} theme={theme} />
          </div>
        )}
        {showStats && Object.keys(stats).length > 0 && <StatsGrid stats={stats} theme={theme} />}
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