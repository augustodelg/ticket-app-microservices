import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children, user }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}


export { UserProvider};
