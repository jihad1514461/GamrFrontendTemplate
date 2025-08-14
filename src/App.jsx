import React from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameThemeProvider } from './contexts/ThemeContext';
import { GameProvider } from './contexts/GameContext';
import ErrorBoundary from './components/ui/ErrorBoundary';
import Navigation from './components/layout/Navigation';
import HomePage from './pages/HomePage';
import CharacterPage from './pages/CharacterPage';
import InventoryPage from './pages/InventoryPage';
import QuestsPage from './pages/QuestsPage';
import SpellsPage from './pages/SpellsPage';
import ApiDemo from './components/demo/ApiDemo';

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