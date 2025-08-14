import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../Core/contexts/ThemeContext';
import ItemCard from './ItemCard';
import Modal from '../../Core/components/ui/Modal';

const InventoryGrid = ({ 
  items = [],
  onItemClick,
  onItemDoubleClick,
  onItemMove,
  gridSize = { rows: 6, cols: 8 },
  className = '',
  showSearch = true,
  showFilter = true,
  searchPlaceholder = 'Search items...'
}) => {
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterRarity, setFilterRarity] = useState('all');
  const [showItemModal, setShowItemModal] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverSlot, setDragOverSlot] = useState(null);

  const totalSlots = gridSize.rows * gridSize.cols;

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesRarity = filterRarity === 'all' || item.rarity === filterRarity;
    return matchesSearch && matchesType && matchesRarity;
  });

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
    if (onItemClick) {
      onItemClick(item);
    }
  }, [onItemClick]);

  const handleItemDoubleClick = useCallback((item) => {
    setSelectedItem(item);
    setShowItemModal(true);
    if (onItemDoubleClick) {
      onItemDoubleClick(item);
    }
  }, [onItemDoubleClick]);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, slotIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSlot(slotIndex);
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (e, targetSlot) => {
    e.preventDefault();
    
    if (draggedItem && onItemMove) {
      onItemMove(draggedItem, targetSlot);
    }
    
    setDraggedItem(null);
    setDragOverSlot(null);
  };

  const getItemTypes = () => {
    const types = [...new Set(items.map(item => item.type))];
    return types.sort();
  };

  const getRarities = () => {
    return ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Search and Filter Controls */}
      {(showSearch || showFilter) && (
        <div className="flex flex-wrap gap-4 mb-4 p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.card }}>
          {showSearch && (
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                  color: theme.palette.text.primary,
                  focusRing: theme.palette.primary.main,
                }}
              />
            </div>
          )}
          
          {showFilter && (
            <>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                  color: theme.palette.text.primary,
                }}
              >
                <option value="all">All Types</option>
                {getItemTypes().map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type}
                  </option>
                ))}
              </select>

              <select
                value={filterRarity}
                onChange={(e) => setFilterRarity(e.target.value)}
                className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: theme.palette.background.paper,
                  borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                  color: theme.palette.text.primary,
                }}
              >
                <option value="all">All Rarities</option>
                {getRarities().map(rarity => (
                  <option key={rarity} value={rarity} className="capitalize">
                    {rarity}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

      {/* Inventory Grid */}
      <div 
        className="grid gap-2 p-4 rounded-lg"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          backgroundColor: theme.palette.background.card
        }}
      >
        {Array.from({ length: totalSlots }).map((_, index) => {
          const item = filteredItems[index];
          const isSelected = selectedItem?.id === item?.id;
          const isDragOver = dragOverSlot === index;

          return (
            <div
              key={index}
              className={`aspect-square border-2 border-dashed rounded-lg transition-all duration-200 ${
                item ? 'border-transparent' : ''
              } ${isDragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
              style={{
                borderColor: item 
                  ? 'transparent' 
                  : theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                backgroundColor: !item 
                  ? theme.palette.mode === 'dark' ? '#1F2937' : '#F9FAFB'
                  : 'transparent'
              }}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
            >
              {item && (
                <div
                  draggable={!!onItemMove}
                  onDragStart={(e) => handleDragStart(e, item)}
                  className="h-full"
                >
                  <ItemCard
                    item={item}
                    variant="grid"
                    selected={isSelected}
                    onClick={handleItemClick}
                    onDoubleClick={handleItemDoubleClick}
                    className="h-full"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <Modal
          show={showItemModal}
          onHide={() => setShowItemModal(false)}
          title={selectedItem.name}
          size="md"
        >
          <ItemCard
            item={selectedItem}
            variant="detailed"
            className="border-0 shadow-none"
          />
          
          {selectedItem.description && (
            <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.default }}>
              <h4 className="font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                Description
              </h4>
              <p className="text-sm" style={{ color: theme.palette.text.secondary }}>
                {selectedItem.description}
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setShowItemModal(false)}
              className="px-4 py-2 rounded-lg border transition-colors"
              style={{
                borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                color: theme.palette.text.primary,
                backgroundColor: 'transparent',
              }}
            >
              Close
            </button>
            {onItemDoubleClick && (
              <button
                onClick={() => {
                  onItemDoubleClick(selectedItem);
                  setShowItemModal(false);
                }}
                className="px-4 py-2 rounded-lg text-white transition-colors"
                style={{ backgroundColor: theme.palette.primary.main }}
              >
                Use Item
              </button>
            )}
          </div>
        </Modal>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && items.length > 0 && (
        <div className="text-center py-8">
          <p style={{ color: theme.palette.text.secondary }}>
            No items match your current filters.
          </p>
        </div>
      )}

      {items.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎒</div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
            Empty Inventory
          </h3>
          <p style={{ color: theme.palette.text.secondary }}>
            Your inventory is empty. Start your adventure to collect items!
          </p>
        </div>
      )}
    </div>
  );
};

InventoryGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func,
  onItemDoubleClick: PropTypes.func,
  onItemMove: PropTypes.func,
  gridSize: PropTypes.shape({
    rows: PropTypes.number,
    cols: PropTypes.number,
  }),
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  showFilter: PropTypes.bool,
  searchPlaceholder: PropTypes.string,
};

export default InventoryGrid;