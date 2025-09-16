import { createContext, useState, useEffect } from 'react';
import { getAllGroups } from '../hooks/useFetch';

export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const { data: groupsData, loading: groupsLoading, error: groupsError } = getAllGroups();
  
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoading = groupsLoading;
    setLoading(isLoading);
    
    console.log('Groups Loading:', groupsLoading);
    console.log('Groups Data:', groupsData);
    
    const hasError = groupsError;
    if (hasError) {
      setError(groupsError || 'فشل في تحميل البيانات');
      console.error('Error loading groups data:', groupsError);
    } else {
      setError(null);
    }
    
    if (groupsData !== null) {
      setGroups(Array.isArray(groupsData) ? groupsData : []);
    }
    
  }, [groupsData, groupsLoading, groupsError]);

  const contextValue = {
    groups,
    loading,
    error
  };

  return (
    <GroupContext.Provider value={contextValue}>
      {children}
    </GroupContext.Provider>
  );
};