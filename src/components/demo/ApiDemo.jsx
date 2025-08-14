import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useTheme } from '../../contexts/ThemeContext';
import { useApi } from '../../hooks/useApi';
import { gameApi } from '../../services/api';
import LoadingSpinner from '../ui/LoadingSpinner';

const ApiDemo = () => {
  const { theme } = useTheme();
  const [selectedUserId, setSelectedUserId] = useState('1');
  const [newUserData, setNewUserData] = useState({
    name: 'New Hero',
    username: 'newhero',
    email: 'hero@example.com',
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // GET example - fetch users list
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useApi('/users', {
    immediate: true,
    onSuccess: (data) => console.log('Users loaded:', data.length),
    onError: (error) => console.error('Failed to load users:', error),
  });

  // GET example - fetch specific user
  const {
    data: selectedUser,
    loading: userLoading,
    execute: fetchUser,
  } = useApi(`/users/${selectedUserId}`, {
    immediate: false,
  });

  // Manual API calls
  const handleGetRequest = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      const result = await gameApi.getPlayer(selectedUserId);
      setApiResponse({ method: 'GET', data: result });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostRequest = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      const result = await gameApi.createPlayer(newUserData);
      setApiResponse({ method: 'POST', data: result });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePutRequest = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      const result = await gameApi.updatePlayer(selectedUserId, {
        ...newUserData,
        id: selectedUserId,
      });
      setApiResponse({ method: 'PUT', data: result });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      const result = await gameApi.deletePlayer(selectedUserId);
      setApiResponse({ method: 'DELETE', data: result });
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestRequest = async () => {
    try {
      setIsLoading(true);
      setApiError(null);
      const result = await gameApi.getQuests();
      setApiResponse({ method: 'GET Quests', data: result.slice(0, 5) }); // Show first 5 quests
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: theme.palette.background.default }}>
      <Container>
        <Row>
          <Col>
            <h1 className="text-3xl font-bold mb-8" style={{ color: theme.palette.text.primary }}>
              API Demo - Axios HTTP Methods
            </h1>
          </Col>
        </Row>

        <Row>
          {/* Users List */}
          <Col lg={4} className="mb-4">
            <Card style={{ backgroundColor: theme.palette.background.card }}>
              <Card.Header>
                <h3 className="h5 mb-0" style={{ color: theme.palette.text.primary }}>
                  Users List (GET)
                </h3>
              </Card.Header>
              <Card.Body>
                {usersLoading && <LoadingSpinner size="small" message="Loading users..." />}
                {usersError && (
                  <Alert variant="danger" className="mb-3">
                    Error: {usersError}
                  </Alert>
                )}
                {users && (
                  <div>
                    <p style={{ color: theme.palette.text.secondary }}>
                      Found {users.length} users
                    </p>
                    <Form.Select
                      value={selectedUserId}
                      onChange={(e) => setSelectedUserId(e.target.value)}
                      className="mb-3"
                      style={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                      }}
                    >
                      {users.slice(0, 10).map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.username})
                        </option>
                      ))}
                    </Form.Select>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={refetchUsers}
                      disabled={usersLoading}
                    >
                      Refresh Users
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* API Controls */}
          <Col lg={4} className="mb-4">
            <Card style={{ backgroundColor: theme.palette.background.card }}>
              <Card.Header>
                <h3 className="h5 mb-0" style={{ color: theme.palette.text.primary }}>
                  API Controls
                </h3>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button
                    variant="success"
                    onClick={handleGetRequest}
                    disabled={isLoading}
                  >
                    GET User #{selectedUserId}
                  </Button>

                  <Button
                    variant="primary"
                    onClick={handlePostRequest}
                    disabled={isLoading}
                  >
                    POST New User
                  </Button>

                  <Button
                    variant="warning"
                    onClick={handlePutRequest}
                    disabled={isLoading}
                  >
                    PUT Update User #{selectedUserId}
                  </Button>

                  <Button
                    variant="danger"
                    onClick={handleDeleteRequest}
                    disabled={isLoading}
                  >
                    DELETE User #{selectedUserId}
                  </Button>

                  <Button
                    variant="info"
                    onClick={handleQuestRequest}
                    disabled={isLoading}
                  >
                    GET Quests (Posts)
                  </Button>
                </div>

                {isLoading && (
                  <div className="mt-3">
                    <LoadingSpinner size="small" message="Processing request..." />
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* New User Form */}
            <Card className="mt-4" style={{ backgroundColor: theme.palette.background.card }}>
              <Card.Header>
                <h3 className="h5 mb-0" style={{ color: theme.palette.text.primary }}>
                  New User Data
                </h3>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: theme.palette.text.primary }}>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUserData.name}
                      onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                      style={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: theme.palette.text.primary }}>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={newUserData.username}
                      onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
                      style={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ color: theme.palette.text.primary }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={newUserData.email}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      style={{
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderColor: theme.palette.mode === 'dark' ? '#374151' : '#D1D5DB',
                      }}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* API Response */}
          <Col lg={4} className="mb-4">
            <Card style={{ backgroundColor: theme.palette.background.card }}>
              <Card.Header>
                <h3 className="h5 mb-0" style={{ color: theme.palette.text.primary }}>
                  API Response
                </h3>
              </Card.Header>
              <Card.Body>
                {apiError && (
                  <Alert variant="danger" className="mb-3">
                    <strong>Error:</strong> {apiError}
                  </Alert>
                )}

                {apiResponse && (
                  <div>
                    <div className="mb-3">
                      <span
                        className="badge me-2"
                        style={{
                          backgroundColor: theme.palette.primary.main,
                          color: '#ffffff',
                        }}
                      >
                        {apiResponse.method}
                      </span>
                      <small style={{ color: theme.palette.text.secondary }}>
                        {new Date().toLocaleTimeString()}
                      </small>
                    </div>

                    <pre
                      className="p-3 rounded"
                      style={{
                        backgroundColor: theme.palette.mode === 'dark' ? '#1F2937' : '#F3F4F6',
                        color: theme.palette.text.primary,
                        fontSize: '0.75rem',
                        maxHeight: '400px',
                        overflow: 'auto',
                      }}
                    >
                      {JSON.stringify(apiResponse.data, null, 2)}
                    </pre>
                  </div>
                )}

                {!apiResponse && !apiError && (
                  <p style={{ color: theme.palette.text.secondary }}>
                    Click any API button to see the response here.
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApiDemo;