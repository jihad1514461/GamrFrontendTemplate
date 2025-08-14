import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';

// Custom hook for API calls with loading and error states
export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    method = 'GET',
    payload = null,
    immediate = true,
    onSuccess,
    onError,
  } = options;

  const execute = useCallback(async (customPayload = payload) => {
    try {
      setLoading(true);
      setError(null);

      let result;
      switch (method.toUpperCase()) {
        case 'GET':
          result = await apiService.get(url);
          break;
        case 'POST':
          result = await apiService.post(url, customPayload);
          break;
        case 'PUT':
          result = await apiService.put(url, customPayload);
          break;
        case 'DELETE':
          result = await apiService.delete(url);
          break;
        case 'PATCH':
          result = await apiService.patch(url, customPayload);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(result);
      if (onSuccess) onSuccess(result);
      return result;
    } catch (err) {
      setError(err.message);
      if (onError) onError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, method, payload, onSuccess, onError]);

  useEffect(() => {
    if (immediate && method.toUpperCase() === 'GET') {
      execute();
    }
  }, [execute, immediate, method]);

  return {
    data,
    loading,
    error,
    execute,
    refetch: execute,
  };
};

// Hook for multiple API calls
export const useApiList = (requests = []) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const executeAll = useCallback(async () => {
    setLoading(true);
    const results = {};
    const errorResults = {};

    await Promise.allSettled(
      requests.map(async ({ key, url, method = 'GET', payload }) => {
        try {
          let result;
          switch (method.toUpperCase()) {
            case 'GET':
              result = await apiService.get(url);
              break;
            case 'POST':
              result = await apiService.post(url, payload);
              break;
            case 'PUT':
              result = await apiService.put(url, payload);
              break;
            case 'DELETE':
              result = await apiService.delete(url);
              break;
            default:
              throw new Error(`Unsupported method: ${method}`);
          }
          results[key] = result;
        } catch (error) {
          errorResults[key] = error.message;
        }
      })
    );

    setData(results);
    setErrors(errorResults);
    setLoading(false);
  }, [requests]);

  useEffect(() => {
    if (requests.length > 0) {
      executeAll();
    }
  }, [executeAll]);

  return {
    data,
    loading,
    errors,
    refetch: executeAll,
  };
};