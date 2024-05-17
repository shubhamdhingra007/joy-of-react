import React from 'react';

export const ToastContext = React.createContext(null);

function ToastProvider({ toasts, onToastClose, children }) {
  const value = React.useMemo(() => ({
    toasts,
    onToastClose
  }), [toasts, onToastClose])
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export default ToastProvider;
