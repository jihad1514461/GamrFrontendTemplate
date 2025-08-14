import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';
import CharacterOverview from '../components/CharacterOverview';
import QuickStats from '../components/QuickStats';
import QuickActions from '../components/QuickActions';
import ActiveQuestsPanel from '../components/ActiveQuestsPanel';
import RecentItemsPanel from '../components/RecentItemsPanel';
import QuickSpellsPanel from '../components/QuickSpellsPanel';
import { useHomeData } from '../hooks/useHomeData';

const HomePage = () => {
  const navigate = useNavigate();
	const { player, inventory, activeQuests, recentItems, favoriteSpells, theme, isDarkMode, toggleTheme, canCast } = useHomeData();

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container fluid>
        <Row className="mb-8">
          <Col>
						<HeaderBar playerName={player.name} isDarkMode={isDarkMode} toggleTheme={toggleTheme} theme={theme} />
          </Col>
        </Row>
        <Row>
          <Col xl={4} lg={6} className="mb-6">
						<CharacterOverview player={player} onClick={() => navigate('/character')} />
          </Col>
          <Col xl={8} lg={6} className="mb-6">
						<QuickStats player={player} theme={theme} />
          </Col>
        </Row>
        <Row className="mb-8">
          <Col>
						<QuickActions
							theme={theme}
							inventoryCount={inventory.length}
							activeQuestsCount={activeQuests.length}
							spellsCount={favoriteSpells.length}
							level={player.level}
							onInventory={() => navigate('/inventory')}
							onQuests={() => navigate('/quests')}
							onSpells={() => navigate('/spells')}
							onCharacter={() => navigate('/character')}
						/>
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="mb-6">
						<ActiveQuestsPanel activeQuests={activeQuests} navigate={navigate} theme={theme} />
          </Col>
          <Col lg={6}>
            <div className="space-y-6">
							<RecentItemsPanel items={recentItems} navigate={navigate} theme={theme} />
							<QuickSpellsPanel spells={favoriteSpells} canCast={(spell) => canCast(spell)} navigate={navigate} theme={theme} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;