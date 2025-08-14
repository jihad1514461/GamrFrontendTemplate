import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InventoryGrid from '../components/InventoryGrid';
import ItemCard from '../components/ItemCard';
import Tabs from '../../Core/components/ui/Tabs';
import { useGame } from '../../Core/contexts/GameContext';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { Package, Sword, Shield, Gem } from 'lucide-react';

const InventoryPage = () => {
  const { inventory, addInventoryItem, removeInventoryItem } = useGame();
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleItemDoubleClick = (item) => {
    console.log('Using item:', item);
    // Add item usage logic here
  };

  const handleItemMove = (item, targetSlot) => {
    console.log('Moving item:', item, 'to slot:', targetSlot);
    // Add item movement logic here
  };

  const getItemsByType = (type) => {
    return inventory.filter(item => item.type === type);
  };

  const tabs = [
    {
      label: 'All Items',
      icon: <Package className="w-4 h-4" />,
      badge: inventory.length,
      content: (
        <InventoryGrid
          items={inventory}
          onItemClick={handleItemClick}
          onItemDoubleClick={handleItemDoubleClick}
          onItemMove={handleItemMove}
          gridSize={{ rows: 6, cols: 8 }}
          showSearch={true}
          showFilter={true}
        />
      ),
    },
    {
      label: 'Weapons',
      icon: <Sword className="w-4 h-4" />,
      badge: getItemsByType('weapon').length,
      content: (
        <InventoryGrid
          items={getItemsByType('weapon')}
          onItemClick={handleItemClick}
          onItemDoubleClick={handleItemDoubleClick}
          onItemMove={handleItemMove}
          gridSize={{ rows: 4, cols: 6 }}
          showSearch={true}
          showFilter={false}
        />
      ),
    },
    {
      label: 'Armor',
      icon: <Shield className="w-4 h-4" />,
      badge: getItemsByType('armor').length,
      content: (
        <InventoryGrid
          items={getItemsByType('armor')}
          onItemClick={handleItemClick}
          onItemDoubleClick={handleItemDoubleClick}
          onItemMove={handleItemMove}
          gridSize={{ rows: 4, cols: 6 }}
          showSearch={true}
          showFilter={false}
        />
      ),
    },
    {
      label: 'Consumables',
      icon: <Package className="w-4 h-4" />,
      badge: getItemsByType('consumable').length,
      content: (
        <InventoryGrid
          items={getItemsByType('consumable')}
          onItemClick={handleItemClick}
          onItemDoubleClick={handleItemDoubleClick}
          onItemMove={handleItemMove}
          gridSize={{ rows: 4, cols: 6 }}
          showSearch={true}
          showFilter={false}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-3xl font-bold mb-8" style={{ color: theme.palette.text.primary }}>
              Inventory Management
            </h1>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Inventory Tabs */}
            <Tabs
              tabs={tabs}
              variant="bordered"
              className="mb-6"
            />
          </Col>

          {/* Item Details Panel */}
          <Col lg={4}>
            <div 
              className="sticky-top p-6 rounded-lg"
              style={{ 
                backgroundColor: theme.palette.background.card,
                boxShadow: theme.shadows.card,
                top: '2rem'
              }}
            >
              <h2 className="text-xl font-bold mb-4" style={{ color: theme.palette.text.primary }}>
                Item Details
              </h2>
              
              {selectedItem ? (
                <div>
                  <ItemCard
                    item={selectedItem}
                    variant="detailed"
                    className="border-0 shadow-none mb-4"
                  />
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleItemDoubleClick(selectedItem)}
                      className="w-full py-2 px-4 rounded-lg text-white font-medium transition-colors"
                      style={{ backgroundColor: theme.palette.primary.main }}
                    >
                      Use Item
                    </button>
                    
                    <button
                      onClick={() => removeInventoryItem(selectedItem.id)}
                      className="w-full py-2 px-4 rounded-lg border font-medium transition-colors"
                      style={{
                        borderColor: theme.palette.error.main,
                        color: theme.palette.error.main,
                        backgroundColor: 'transparent',
                      }}
                    >
                      Drop Item
                    </button>
                  </div>

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
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto mb-4" style={{ color: theme.palette.text.secondary }} />
                  <p style={{ color: theme.palette.text.secondary }}>
                    Select an item to view its details
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="mt-8">
          <Col>
            <div 
              className="p-4 rounded-lg"
              style={{ backgroundColor: theme.palette.background.card }}
            >
              <h3 className="text-lg font-semibold mb-4" style={{ color: theme.palette.text.primary }}>
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => addInventoryItem({
                    id: Date.now(),
                    name: 'Random Potion',
                    type: 'consumable',
                    rarity: 'common',
                    quantity: 1,
                    description: 'A mysterious potion with unknown effects.',
                  })}
                  className="px-4 py-2 rounded-lg text-white transition-colors"
                  style={{ backgroundColor: theme.palette.success.main }}
                >
                  Add Random Item
                </button>
                
                <button
                  onClick={() => {
                    inventory.forEach(item => {
                      if (item.type === 'consumable' && item.quantity > 1) {
                        removeInventoryItem(item.id);
                      }
                    });
                  }}
                  className="px-4 py-2 rounded-lg border transition-colors"
                  style={{
                    borderColor: theme.palette.warning.main,
                    color: theme.palette.warning.main,
                    backgroundColor: 'transparent',
                  }}
                >
                  Clear Consumables
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InventoryPage;