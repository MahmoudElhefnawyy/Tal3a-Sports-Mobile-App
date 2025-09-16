import { createContext, useState, useEffect } from 'react';
import { getAllProfile } from '../hooks/useFetch';

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const { data: profileData, loading: profileLoading, error: profileError } = getAllProfile();
  
  const [profile, setProfile] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const isLoading = profileLoading;
    setLoading(isLoading);
    
    console.log('Profile Loading:', profileLoading);
    console.log('Profile Data Received:', profileData);
    
    const hasError = profileError;
    if (hasError) {
      setError(profileError || 'فشل في تحميل بيانات الملف الشخصي');
      console.error('Error loading profile data:', profileError);
    } else {
      setError(null);
    }
    
    if (profileData !== null && profileData.user) {
      setProfile(profileData.user || {});
      setUpcomingEvents(profileData.user.upcomingEvents || []);
      setPastEvents(profileData.user.pastEvents || []);
      setHostedEvents(profileData.user.hostedEvents || []);
      setAchievements(profileData.user.achievements || []);
      console.log('Profile Context Set:', {
        profile: profileData.user,
        upcomingEvents: profileData.user.upcomingEvents,
        pastEvents: profileData.user.pastEvents,
        hostedEvents: profileData.user.hostedEvents,
        achievements: profileData.user.achievements
      });
    }
  }, [profileData, profileLoading, profileError]);

  const contextValue = {
    profile,
    upcomingEvents,
    pastEvents,
    hostedEvents,
    achievements,
    loading,
    error
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};