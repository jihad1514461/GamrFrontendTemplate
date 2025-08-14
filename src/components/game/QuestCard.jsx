import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@material-tailwind/react';
import { MapPin, Target, Award, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useFadeIn } from '../../hooks/useAnimation';

const QuestCard = ({ 
  quest,
  onClick,
  className = '',
  variant = 'detailed',
  showProgress = true,
  showReward = true
}) => {
  const { theme } = useTheme();
  const fadeInStyle = useFadeIn(250);

  const {
    id,
    title = 'Unknown Quest',
    description = '',
    progress = 0,
    maxProgress = 1,
    reward = '',
    status = 'available',
    location = '',
    questGiver = '',
    difficulty = 'normal',
    timeLimit = null,
    type = 'main'
  } = quest;

  const progressPercentage = (progress / maxProgress) * 100;

  const statusColors = {
    available: '#10B981',
    active: '#3B82F6',
    completed: '#F59E0B',
    failed: '#EF4444',
    locked: '#6B7280',
  };

  const difficultyColors = {
    easy: '#10B981',
    normal: '#F59E0B',
    hard: '#EF4444',
    legendary: '#8B5CF6',
  };

  const typeIcons = {
    main: Target,
    side: MapPin,
    daily: Clock,
    event: Award,
  };

  const statusColor = statusColors[status] || statusColors.available;
  const difficultyColor = difficultyColors[difficulty] || difficultyColors.normal;
  const IconComponent = typeIcons[type] || Target;

  const cardStyle = {
    backgroundColor: theme.palette.background.card,
    borderColor: statusColor,
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    boxShadow: theme.shadows.card,
    ...fadeInStyle,
  };

  if (variant === 'compact') {
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
        style={cardStyle}
        onClick={() => onClick && onClick(quest)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick && onClick(quest)}
      >
        <CardBody className="p-4">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: statusColor }}
            >
              <IconComponent className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <h3 
                className="font-semibold"
                style={{ color: theme.palette.text.primary }}
              >
                {title}
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                <span 
                  className="capitalize"
                  style={{ color: statusColor }}
                >
                  {status}
                </span>
                {showProgress && (
                  <span 
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {progress}/{maxProgress}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg ${className}`}
      style={cardStyle}
      onClick={() => onClick && onClick(quest)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick && onClick(quest)}
    >
      <CardBody className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: statusColor }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            
            <div>
              <h3 
                className="text-lg font-bold"
                style={{ color: theme.palette.text.primary }}
              >
                {title}
              </h3>
              <div className="flex items-center space-x-2 text-sm">
                <span 
                  className="capitalize font-medium"
                  style={{ color: statusColor }}
                >
                  {status}
                </span>
                <span 
                  style={{ color: theme.palette.text.secondary }}
                >
                  •
                </span>
                <span 
                  className="capitalize"
                  style={{ color: difficultyColor }}
                >
                  {difficulty}
                </span>
                <span 
                  style={{ color: theme.palette.text.secondary }}
                >
                  •
                </span>
                <span 
                  className="capitalize"
                  style={{ color: theme.palette.text.secondary }}
                >
                  {type} Quest
                </span>
              </div>
            </div>
          </div>

          {timeLimit && (
            <div 
              className="flex items-center space-x-1 px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: theme.palette.warning.main + '20',
                color: theme.palette.warning.main
              }}
            >
              <Clock className="w-3 h-3" />
              <span className="text-xs font-medium">{timeLimit}</span>
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

        {location && (
          <div className="flex items-center space-x-2 mb-4">
            <MapPin 
              className="w-4 h-4" 
              style={{ color: theme.palette.info.main }} 
            />
            <span 
              className="text-sm"
              style={{ color: theme.palette.text.primary }}
            >
              {location}
            </span>
          </div>
        )}

        {questGiver && (
          <div className="mb-4">
            <span 
              className="text-sm"
              style={{ color: theme.palette.text.secondary }}
            >
              Quest Giver: 
            </span>
            <span 
              className="text-sm font-medium ml-1"
              style={{ color: theme.palette.text.primary }}
            >
              {questGiver}
            </span>
          </div>
        )}

        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span 
                className="text-sm font-medium"
                style={{ color: theme.palette.text.primary }}
              >
                Progress
              </span>
              <span 
                className="text-sm"
                style={{ color: theme.palette.text.secondary }}
              >
                {progress}/{maxProgress}
              </span>
            </div>
            <div 
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}
            >
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${progressPercentage}%`,
                  backgroundColor: statusColor
                }}
              />
            </div>
          </div>
        )}

        {showReward && reward && (
          <div 
            className="p-3 rounded-lg"
            style={{ backgroundColor: theme.palette.mode === 'dark' ? '#374151' : '#F3F4F6' }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Award 
                className="w-4 h-4" 
                style={{ color: theme.palette.success.main }} 
              />
              <span 
                className="text-sm font-medium"
                style={{ color: theme.palette.text.primary }}
              >
                Reward
              </span>
            </div>
            <p 
              className="text-sm"
              style={{ color: theme.palette.text.secondary }}
            >
              {reward}
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

QuestCard.propTypes = {
  quest: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    progress: PropTypes.number,
    maxProgress: PropTypes.number,
    reward: PropTypes.string,
    status: PropTypes.oneOf(['available', 'active', 'completed', 'failed', 'locked']),
    location: PropTypes.string,
    questGiver: PropTypes.string,
    difficulty: PropTypes.oneOf(['easy', 'normal', 'hard', 'legendary']),
    timeLimit: PropTypes.string,
    type: PropTypes.oneOf(['main', 'side', 'daily', 'event']),
  }).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['detailed', 'compact']),
  showProgress: PropTypes.bool,
  showReward: PropTypes.bool,
};

export default QuestCard;