import React from 'react';
import { StatusInfo } from '../types/types';
const StatusInfoContext = React.createContext<(x: StatusInfo) => void>(() => {});
export default StatusInfoContext;
