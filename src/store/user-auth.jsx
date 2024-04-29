import React, { createContext, useEffect } from "react";
import { useReducer } from "react";

const userIdContext = createContext({
  userInfo: {},
  updateUserInfo: () => {},
});

const userInfoReducer = (currUserInfo, action) => {
  let newUserInfo = { ...currUserInfo };
  if (action.type === "MODIFY_USER_INFO") {
    newUserInfo = {
      userId: action.payload.userId,
      email: action.payload.email,
    };
  }
  return newUserInfo;
};

export const UserIdProvider = ({ children }) => {
  const [userInfo, dispatchUserInfo] = useReducer(
    userInfoReducer,
    DEFAULT_VALUE
  );

  const updateUserId = (newUserInfo) => {
    console.log(`Coming value ${newUserInfo}`);

    const email = newUserInfo;

    const name = newUserInfo.substring(0, newUserInfo.indexOf("@"));
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    dispatchUserInfo({
      type: "MODIFY_USER_INFO",
      payload: {
        userId: capitalizedName,
        email: email,
      },
    });
  };

  useEffect(() => {
    console.log(`New value ${JSON.stringify(userInfo)}`);
  }, [userInfo]);

  return (
    <userIdContext.Provider
      value={{ userInfo: userInfo, updateUserId: updateUserId }}
    >
      {children}
    </userIdContext.Provider>
  );
};

const DEFAULT_VALUE = {
  userId: "HITESH",
  email: "example@example.com", // Default email value
};

export default userIdContext;
