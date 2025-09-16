import { createContext, useState, useEffect } from 'react';
import { getAllDiscover } from '../hooks/useFetch';

export const DiscoverContext = createContext();

export const DiscoverContextProvider = ({ children }) => {
  const { data: discoverData, loading: discoverLoading, error: discoverError } = getAllDiscover();
  
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [trendingGroups, setTrendingGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoading = discoverLoading;
    setLoading(isLoading);
    
    console.log('Discover Loading:', discoverLoading);
    console.log('Discover Data:', discoverData);
    
    const hasError = discoverError;
    if (hasError) {
      setError(discoverError || 'فشل في تحميل البيانات');
      console.error('Error loading discover data:', discoverError);
    } else {
      setError(null);
    }
    
    if (discoverData !== null) {
      setFeaturedEvents(Array.isArray(discoverData.featuredEvents) ? discoverData.featuredEvents : []);
      setTrendingGroups(Array.isArray(discoverData.trendingGroups) ? discoverData.trendingGroups : []);
    }
    
  }, [discoverData, discoverLoading, discoverError]);

  const contextValue = {
    featuredEvents,
    trendingGroups,
    loading,
    error
  };

  return (
    <DiscoverContext.Provider value={contextValue}>
      {children}
    </DiscoverContext.Provider>
  );
};