import { createContext, useState, useEffect } from 'react';
import { getAllRewards } from '../hooks/useFetch';

export const RewardContext = createContext();

export const RewardContextProvider = ({ children }) => {
  const { data: rewardsData, loading: rewardsLoading, error: rewardsError } = getAllRewards();
  
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoading = rewardsLoading;
    setLoading(isLoading);
    
    console.log('Rewards Loading:', rewardsLoading);
    console.log('Rewards Data:', rewardsData);
    
    const hasError = rewardsError;
    if (hasError) {
      setError(rewardsError || 'فشل في تحميل البيانات');
      console.error('Error loading rewards data:', rewardsError);
    } else {
      setError(null);
    }
    
    if (rewardsData !== null) {
      setRewards(Array.isArray(rewardsData) ? rewardsData : []);
    }
    
  }, [rewardsData, rewardsLoading, rewardsError]);

  const contextValue = {
    rewards,
    loading,
    error
  };

  return (
    <RewardContext.Provider value={contextValue}>
      {children}
    </RewardContext.Provider>
  );
};