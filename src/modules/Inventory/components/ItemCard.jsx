import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from '@material-tailwind/react';
import { Package, Star } from 'lucide-react';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { getRarityColor } from '../../Core/utils/helpers';
import { useFadeIn } from '../../Core/hooks/useAnimation';

const ItemCard = ({ 
  item,
  onClick,
  onDoubleClick,
  showQuantity = true,
  showRarity = true,
  className = '',
  variant = 'detailed',
  selected = false
}) => {
  const { theme } = useTheme();
  const fadeInStyle = useFadeIn(150);

  const {
    id,
    name = 'Unknown Item',
    type = 'misc',
    rarity = 'common',
    quantity = 1,
    description = '',
    icon,
    stats = {},
    value = 0
  } = item;

  const rarityColor = getRarityColor(rarity);

  const cardStyle = {
    backgroundColor: theme.palette.background.card,
    borderColor: selected ? theme.palette.primary.main : rarityColor,
    borderWidth: '2px',
    borderStyle: 'solid',
    boxShadow: theme.shadows.card,
    ...fadeInStyle,
  };

  const rarityStars = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
    mythic: 6,
  };

  if (variant === 'grid') {
    return (
      <Card 
        className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg aspect-square ${className}`}
        style={cardStyle}
        onClick={() => onClick && onClick(item)}
        onDoubleClick={() => onDoubleClick && onDoubleClick(item)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onClick && onClick(item)}
        title={`${name}${description ? ` - ${description}` : ''}`}
      >
        <CardBody className="p-3 flex flex-col items-center justify-center h-full">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-2"
            style={{ backgroundColor: rarityColor }}
          >
            {icon ? (
              <img src={icon} alt={name} className="w-8 h-8 object-cover" />
            ) : (
              <Package className="w-6 h-6" />
            )}
          </div>
          
          <h4 
            className="text-xs font-medium text-center line-clamp-2"
            style={{ color: theme.palette.text.primary }}
          >
            {name}
          </h4>

          {showQuantity && quantity > 1 && (
            <span 
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {quantity}
            </span>
          )}

          {showRarity && (
            <div className="flex mt-1">
              {[...Array(rarityStars[rarity])].map((_, index) => (
                <Star 
                  key={index} 
                  className="w-2 h-2" 
                  style={{ color: rarityColor }}
                  fill={rarityColor}
                />
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    );
  }

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-102 hover:shadow-lg ${className}`}
      style={cardStyle}
      onClick={() => onClick && onClick(item)}
      onDoubleClick={() => onDoubleClick && onDoubleClick(item)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onClick && onClick(item)}
    >
      <CardBody className="p-4">
        <div className="flex items-start space-x-4">
          {/* Item Icon */}
          <div 
            className="w-16 h-16 rounded-lg flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: rarityColor }}
          >
            {icon ? (
              <img src={icon} alt={name} className="w-12 h-12 object-cover rounded" />
            ) : (
              <Package className="w-8 h-8" />
            )}
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: theme.palette.text.primary }}
                >
                  {name}
                </h3>
                <p 
                  className="text-sm capitalize"
                  style={{ color: rarityColor }}
                >
                  {rarity} {type}
                </p>
              </div>

              {showQuantity && quantity > 1 && (
                <span 
                  className="px-2 py-1 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: theme.palette.primary.main,
                    color: '#ffffff'
                  }}
                >
                  ×{quantity}
                </span>
              )}
            </div>

            {description && (
              <p 
                className="text-sm mt-2 line-clamp-2"
                style={{ color: theme.palette.text.secondary }}
              >
                {description}
              </p>
            )}

            {/* Item Stats */}
            {Object.keys(stats).length > 0 && (
              <div className="mt-3 space-y-1">
                {Object.entries(stats).map(([statName, statValue]) => (
                  <div key={statName} className="flex justify-between text-sm">
                    <span style={{ color: theme.palette.text.secondary }}>
                      {statName}:
                    </span>
                    <span 
                      className="font-medium"
                      style={{ color: theme.palette.text.primary }}
                    >
                      +{statValue}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Rarity Stars */}
            {showRarity && (
              <div className="flex items-center mt-3 space-x-1">
                {[...Array(rarityStars[rarity])].map((_, index) => (
                  <Star 
                    key={index} 
                    className="w-3 h-3" 
                    style={{ color: rarityColor }}
                    fill={rarityColor}
                  />
                ))}
                <span 
                  className="ml-2 text-xs font-medium capitalize"
                  style={{ color: rarityColor }}
                >
                  {rarity}
                </span>
              </div>
            )}

            {value > 0 && (
              <div className="mt-2">
                <span 
                  className="text-sm"
                  style={{ color: theme.palette.text.secondary }}
                >
                  Value: 
                </span>
                <span 
                  className="text-sm font-medium ml-1"
                  style={{ color: '#F59E0B' }}
                >
                  {value} Gold
                </span>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    type: PropTypes.string,
    rarity: PropTypes.oneOf(['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic']),
    quantity: PropTypes.number,
    description: PropTypes.string,
    icon: PropTypes.string,
    stats: PropTypes.object,
    value: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  showQuantity: PropTypes.bool,
  showRarity: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['detailed', 'grid']),
  selected: PropTypes.bool,
};

export default ItemCard;