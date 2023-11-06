import React, { createContext, useState, FC} from 'react';
import { UserContextState } from './types';

const contextDefaultValues: UserContextState = {
  userid: '',
  setUserid: () => {}
};

export const UserContext = createContext<UserContextState>(contextDefaultValues);

const UserProvider: FC = ({ children }) => {
  const [userid, setUserid] = useState<string>(contextDefaultValues.userid);

  return (
    <UserContext.Provider value={{userid, setUserid}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;