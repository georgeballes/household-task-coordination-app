import React from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const errorHandler = (error) => {
      console.error('Global error caught:', error);
      setHasError(true);
      setError(error.message || 'An unexpected error occurred');
    };

    window.addEventListener('error', errorHandler);
    
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light p-4">
        <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-center text-dark mb-2">Something went wrong</h1>
          <p className="text-medium text-center mb-4">{error || 'An unexpected error occurred'}</p>
          <button 
            className="w-full bg-primary text-white py-2 rounded-full font-medium"
            onClick={() => window.location.reload()}
          >
            Reload Application
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
