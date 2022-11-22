import { createContext, useContext, useState } from "react";

const UserInfoContext = createContext();
const UserInfoUpdateContext = createContext();

export function useUserInfo() {
  return useContext(UserInfoContext);
}

export function useUserInfoUpdate() {
  return useContext(UserInfoUpdateContext);
}

export function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});

  function updateUserInfo(info) {
    setUserInfo(info);
  }

  return (
    <UserInfoContext.Provider value={userInfo}>
      <UserInfoUpdateContext.Provider value={updateUserInfo}>
        {children}
      </UserInfoUpdateContext.Provider>
    </UserInfoContext.Provider>
  );
}
