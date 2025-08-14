import React, { Suspense } from 'react';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameThemeProvider } from '@core/contexts/ThemeContext';
import { GameProvider } from '@core/contexts/GameContext';
import ErrorBoundary from '@core/components/ui/ErrorBoundary';
import Navigation from '@core/components/layout/Navigation';
import { routes } from './routes';

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
                  <Suspense fallback={null}>
                    <Routes>
                      {routes.map(({ path, element: Cmp }) => (
                        <Route key={path} path={path} element={<Cmp />} />
                      ))}
                    </Routes>
                  </Suspense>
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