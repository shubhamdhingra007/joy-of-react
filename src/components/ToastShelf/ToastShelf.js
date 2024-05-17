import React from 'react';

import Toast from '../Toast';
import { ToastContext } from '../ToastProvider/ToastProvider';
import styles from './ToastShelf.module.css';

function ToastShelf() {
  const { toasts } = React.useContext(ToastContext);
  if (toasts.length === 0) return null
  return (
    <ol className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map(u => (
        <li key={u.key} className={styles.toastWrapper}>
          <Toast identifier={u.key} variant={u.variant}>{u.message}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default React.memo(ToastShelf);
