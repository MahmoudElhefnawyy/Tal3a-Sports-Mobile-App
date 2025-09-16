import { createContext, useState, useEffect } from 'react';
import { getAllEvents, getAllGroups } from '../hooks/useFetch';

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const { data: eventsData, loading: eventsLoading, error: eventsError } = getAllEvents();
  const { data: groupsData, loading: groupsLoading, error: groupsError } = getAllGroups();
  
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoading = eventsLoading || groupsLoading;
    setLoading(isLoading);
    
    console.log('Events Loading:', eventsLoading, 'Groups Loading:', groupsLoading);
    console.log('Events Data:', eventsData);
    console.log('Groups Data:', groupsData);
    
    const hasError = eventsError || groupsError;
    if (hasError) {
      setError(eventsError || groupsError || 'فشل في تحميل البيانات');
      console.error('Error loading data:', eventsError, groupsError);
    } else {
      setError(null);
    }
    
    if (eventsData !== null) {
      setEvents(Array.isArray(eventsData) ? eventsData : []);
    }
    
    if (groupsData !== null) {
      setGroups(Array.isArray(groupsData) ? groupsData : []);
    }
    
  }, [eventsData, groupsData, eventsLoading, groupsLoading, eventsError, groupsError]);

  const contextValue = {
    events,
    groups,
    loading,
    error
  };

  return (
    <HomeContext.Provider value={contextValue}>
      {children}
    </HomeContext.Provider>
  );
};