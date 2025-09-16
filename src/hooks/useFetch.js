import { useState, useCallback, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const BASE_URL = 'http://localhost:3001';

const useFetchData = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(`🚀 [${endpoint}] Hook initialized`);
  console.log(`🌐 Platform: ${Platform.OS}, BASE_URL: ${BASE_URL}`);

  const memoizedOptions = useMemo(() => options, [
    options.method,
    options.body,
    JSON.stringify(options.queryParams)
  ]);

  const fetchData = useCallback(async () => {
    console.log(`📡 [${endpoint}] Starting fetch...`);
    setLoading(true);
    setError(null);
    
    try {
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      

      const { method = 'GET', body, queryParams } = memoizedOptions;
      const queryString = queryParams ? `?${new URLSearchParams(queryParams).toString()}` : '';
      const url = `${BASE_URL}${endpoint}${queryString}`;
      
      console.log(`🎯 [${endpoint}] Fetching: ${url}`);
      
      const response = await fetch(url, { 
        method, 
        headers,
        ...(body && { body: JSON.stringify(body) }) 
      });
      
      console.log(`📊 [${endpoint}] Response: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`✅ [${endpoint}] Success! Data:`, result);
      console.log(`📈 [${endpoint}] Items count:`, Array.isArray(result) ? result.length : 'Not an array');
      
      setData(result);
      
    } catch (err) {
      console.error(`❌ [${endpoint}] Error:`, err.message);
      setError(err.message || 'Connection failed');
    } finally {
      setLoading(false);
      console.log(`🏁 [${endpoint}] Fetch completed`);
    }
  }, [endpoint, memoizedOptions]);

  useEffect(() => {
    console.log(`🔄 [${endpoint}] Effect triggered`);
    fetchData().catch(console.error);
  }, [fetchData]);

  useEffect(() => {
    console.log(`📱 [${endpoint}] State:`, {
      hasData: !!data,
      itemCount: Array.isArray(data) ? data.length : 'N/A',
      loading,
      error: error || 'none'
    });
  }, [data, loading, error, endpoint]);

  return { data, loading, error, refetch: fetchData };
};

export const getAllEvents = () => {
  console.log('🎪 getAllEvents called');
  return useFetchData('/events');
};

export const getAllGroups = () => {
  console.log('👥 getAllGroups called');
  return useFetchData('/groups');
};

export const getAllDiscover = () => {
  console.log('🔍 getAllDiscover called');
  return useFetchData('/discover');
};

export const getAllRewards = () => {
  console.log('🎁 getAllRewards called');
  return useFetchData('/rewards');
};
export const getAllProfile = () => {
  console.log('👤 getAllProfile called');
  return useFetchData('/profile');
};

export default useFetchData;