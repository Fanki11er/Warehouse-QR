import React from 'react';
const UserContext = React.createContext<firebase.User | null | undefined>(undefined);
export default UserContext;
