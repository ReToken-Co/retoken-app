import React, { createContext, useState } from "react";

// Create Context
export const SidebarContext = createContext();

// Provider Component
const SidebarContextProvider = (props) => {
  const [assetStatus, setAssetStatus] = useState(0);

  const getAssetStatus = async () => {
    setAssetStatus(0)
  };

  return (
    <SidebarContext.Provider
      value={{ assetStatus, setAssetStatus }}
    >
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
