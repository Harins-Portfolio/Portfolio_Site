import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [activeChannel, setActiveChannel] = useState("Grid"); // For "My Solutions" sub-channels

  const setPage = (pageName) => {
    setCurrentPage(pageName);
    // Reset the solution channel back to the grid view on page swap
    if (pageName !== "My Solutions") {
      setActiveChannel("Grid");
    }
  };

  const setChannel = (channelName) => {
    setActiveChannel(channelName);
  };

  const value = {
    currentPage,
    setCurrentPage: setPage, // Use the custom setter
    activeChannel,
    setActiveChannel: setChannel, // Use the custom setter
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};