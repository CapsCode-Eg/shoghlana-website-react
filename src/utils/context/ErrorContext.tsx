// contexts/ErrorContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router';

interface ErrorContextType {
    error: Error | null;
    setError: (error: Error | null) => void;
    clearError: () => void;
    handleError: (error: Error) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<Error | null>(null);
    const navigate = useNavigate();

    const handleError = useCallback((error: Error) => {
        console.error('Error handled:', error);
        setError(error);

        // Navigate to error page for critical errors
        if (error.message.includes('Critical')) {
            navigate('/error', { state: { error: error.message } });
        }
    }, [navigate]);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return (
        <ErrorContext.Provider value={{ error, setError, clearError, handleError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within ErrorProvider');
    }
    return context;
};