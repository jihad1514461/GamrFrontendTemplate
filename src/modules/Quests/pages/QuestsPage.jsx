import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QuestCard from '../components/QuestCard';
import Tabs from '../../Core/components/ui/Tabs';
import Modal from '../../Core/components/ui/Modal';
import { useGame } from '../../Core/contexts/GameContext';
import { useTheme } from '../../Core/contexts/ThemeContext';
import { Target, MapPin, Clock, Award } from 'lucide-react';

const QuestsPage = () => {
  const { quests, updateQuest } = useGame();
  const { theme } = useTheme();
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showQuestModal, setShowQuestModal] = useState(false);

  const handleQuestClick = (quest) => {
    setSelectedQuest(quest);
    setShowQuestModal(true);
  };

  const getQuestsByStatus = (status) => {
    return quests.filter(quest => quest.status === status);
  };

  const handleQuestAction = (questId, action) => {
    switch (action) {
      case 'accept':
        updateQuest(questId, { status: 'active' });
        break;
      case 'abandon':
        updateQuest(questId, { status: 'available' });
        break;
      case 'complete':
        updateQuest(questId, { status: 'completed' });
        break;
      default:
        break;
    }
    setShowQuestModal(false);
  };

  const tabs = [
    {
      label: 'All Quests',
      icon: <Target className="w-4 h-4" />,
      badge: quests.length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {quests.map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onClick={handleQuestClick}
              variant="detailed"
              showProgress={true}
              showReward={true}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Active',
      icon: <Clock className="w-4 h-4" />,
      badge: getQuestsByStatus('active').length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {getQuestsByStatus('active').map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onClick={handleQuestClick}
              variant="detailed"
              showProgress={true}
              showReward={true}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Available',
      icon: <MapPin className="w-4 h-4" />,
      badge: getQuestsByStatus('available').length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {getQuestsByStatus('available').map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onClick={handleQuestClick}
              variant="detailed"
              showProgress={false}
              showReward={true}
            />
          ))}
        </div>
      ),
    },
    {
      label: 'Completed',
      icon: <Award className="w-4 h-4" />,
      badge: getQuestsByStatus('completed').length,
      content: (
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          {getQuestsByStatus('completed').map(quest => (
            <QuestCard
              key={quest.id}
              quest={quest}
              onClick={handleQuestClick}
              variant="detailed"
              showProgress={true}
              showReward={true}
            />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container fluid>
        <Row>
          <Col>
            <h1 className="text-3xl font-bold mb-8" style={{ color: theme.palette.text.primary }}>
              Quest Journal
            </h1>
          </Col>
        </Row>

        <Row>
          <Col>
            {/* Quest Tabs */}
            <Tabs
              tabs={tabs}
              variant="bordered"
              className="mb-6"
            />
          </Col>
        </Row>

        {/* Quest Details Modal */}
        {selectedQuest && (
          <Modal
            show={showQuestModal}
            onHide={() => setShowQuestModal(false)}
            title={selectedQuest.title}
            size="lg"
          >
            <div className="space-y-6">
              <QuestCard
                quest={selectedQuest}
                variant="detailed"
                showProgress={true}
                showReward={true}
                className="border-0 shadow-none"
              />

              {selectedQuest.description && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.default }}>
                  <h4 className="font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                    Quest Description
                  </h4>
                  <p className="text-sm" style={{ color: theme.palette.text.secondary }}>
                    {selectedQuest.description}
                  </p>
                </div>
              )}

              {/* Quest Progress Details */}
              {selectedQuest.status === 'active' && (
                <div className="p-4 rounded-lg" style={{ backgroundColor: theme.palette.background.default }}>
                  <h4 className="font-semibold mb-3" style={{ color: theme.palette.text.primary }}>
                    Progress Details
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span style={{ color: theme.palette.text.secondary }}>Current Progress:</span>
                      <span style={{ color: theme.palette.text.primary }}>
                        {selectedQuest.progress} / {selectedQuest.maxProgress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: theme.palette.text.secondary }}>Completion:</span>
                      <span style={{ color: theme.palette.text.primary }}>
                        {Math.round((selectedQuest.progress / selectedQuest.maxProgress) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quest Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t" style={{ borderColor: theme.palette.mode === 'dark' ? '#374151' : '#E5E7EB' }}>
                <button
                  onClick={() => setShowQuestModal(false)}
                  className="px-4 py-2 rounded-lg border transition-colors"
                  style={{
                    borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                    color: theme.palette.text.primary,
                    backgroundColor: 'transparent',
                  }}
                >
                  Close
                </button>

                {selectedQuest.status === 'available' && (
                  <button
                    onClick={() => handleQuestAction(selectedQuest.id, 'accept')}
                    className="px-4 py-2 rounded-lg text-white transition-colors"
                    style={{ backgroundColor: theme.palette.success.main }}
                  >
                    Accept Quest
                  </button>
                )}

                {selectedQuest.status === 'active' && (
                  <>
                    <button
                      onClick={() => handleQuestAction(selectedQuest.id, 'abandon')}
                      className="px-4 py-2 rounded-lg border transition-colors"
                      style={{
                        borderColor: theme.palette.error.main,
                        color: theme.palette.error.main,
                        backgroundColor: 'transparent',
                      }}
                    >
                      Abandon Quest
                    </button>
                    
                    {selectedQuest.progress >= selectedQuest.maxProgress && (
                      <button
                        onClick={() => handleQuestAction(selectedQuest.id, 'complete')}
                        className="px-4 py-2 rounded-lg text-white transition-colors"
                        style={{ backgroundColor: theme.palette.primary.main }}
                      >
                        Complete Quest
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </Modal>
        )}

        {quests.length === 0 && (
          <Row>
            <Col>
              <div className="text-center py-12">
                <Target className="w-16 h-16 mx-auto mb-4" style={{ color: theme.palette.text.secondary }} />
                <h3 className="text-lg font-semibold mb-2" style={{ color: theme.palette.text.primary }}>
                  No Quests Available
                </h3>
                <p style={{ color: theme.palette.text.secondary }}>
                  Explore the world to discover new quests and adventures!
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default QuestsPage;