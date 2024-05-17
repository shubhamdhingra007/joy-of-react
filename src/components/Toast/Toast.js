import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';


import { ToastContext } from '../ToastProvider/ToastProvider';
import styles from './Toast.module.css';

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ identifier, children, variant }) {
  const { onToastClose } = React.useContext(ToastContext);
  const Icon = ICONS_BY_VARIANT[variant];
  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <span className="VisuallyHidden_wrapper">
          {variant} -
        </span>
        {children}
      </p>
      <button onClick={() => onToastClose(identifier)} className={styles.closeButton}
        aria-label="Dismiss message"
        aria-live="off">
        <X size={24} />
      </button>
    </div>
  );
}

export default React.memo(Toast);
