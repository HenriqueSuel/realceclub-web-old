import React, { useState, useContext, createContext } from 'react';


interface ILoadingProps {
    isLoading: boolean;
    setLoading: (value) => void;
}

const loadingContext = createContext<ILoadingProps>(null);

export function LoadingProvider({ children }) {
    const loading = loader();
    return <loadingContext.Provider value={loading}> {children} </loadingContext.Provider>;
}

export const useLoading = () => {
    return useContext(loadingContext);
};

export const loader = () => {
    const [isLoading, setLoading] = useState(false);

    return {
        isLoading,
        setLoading,
    };
};
