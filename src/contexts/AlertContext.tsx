import React, { useState, useEffect, useContext, createContext } from 'react';


interface IAlertProps {
    message: string,
    color: "info" | "warning" | "success" | "error"
    setAlert: ({message, color}) => void;
}

const alertContext = createContext<IAlertProps>(null);

export function AlertProvider({ children }) {
  const loading = loader();
  return <alertContext.Provider value={loading}> {children} </alertContext.Provider>;
}

export const useAlert = () => {
  return useContext(alertContext);
};

export const loader = () => {
  const [alert, setAlert] = useState<Omit<IAlertProps, 'setAlert'>>(null);

  return {
    ...alert,
    setAlert,
  };
};
