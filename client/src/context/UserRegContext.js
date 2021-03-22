import React, { createContext, useState } from "react";

// Create Context
export const UserRegContext = createContext();

// Provider Component
const UserRegContextProvider = (props) => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <UserRegContext.Provider
      value={{ formOpen, setFormOpen }}
    >
      {props.children}
    </UserRegContext.Provider>
  );
};

export default UserRegContextProvider;
