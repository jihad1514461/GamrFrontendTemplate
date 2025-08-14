import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameThemeProvider } from './modules/Core/contexts/ThemeContext';
import { GameProvider } from './modules/Core/contexts/GameContext';
import ErrorBoundary from './modules/Core/components/ui/ErrorBoundary';
import Navigation from './modules/Core/components/layout/Navigation';
import HomePage from './modules/Home/pages/HomePage';
import CharacterPage from './modules/Character/pages/CharacterPage';
import InventoryPage from './modules/Inventory/pages/InventoryPage';
import QuestsPage from './modules/Quests/pages/QuestsPage';
import SpellsPage from './modules/Spells/pages/SpellsPage';
import ApiDemo from './modules/ApiDemo/pages/ApiDemo';

function App() {
  return (
    <ErrorBoundary>
      <GameThemeProvider>
        <ThemeProvider>
          <GameProvider>
            <Router>
              <div className="min-h-screen bg-gray-100">
                <Navigation />
                <main className="container mx-auto px-4 py-8 pt-24">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/character" element={<CharacterPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/quests" element={<QuestsPage />} />
                    <Route path="/spells" element={<SpellsPage />} />
                    <Route path="/api-demo" element={<ApiDemo />} />
                  </Routes>
                </main>
              </div>
            </Router>
          </GameProvider>
        </ThemeProvider>
      </GameThemeProvider>
    </ErrorBoundary>
  );
}

export default App;