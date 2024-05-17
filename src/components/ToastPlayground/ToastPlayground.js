import React from 'react';

import Button from '../Button';

import { useEscapeKey } from '../../hooks/useEscapeKey';
import { getKey } from '../../utils/key.utils';
import ToastProvider from '../ToastProvider/ToastProvider';
import ToastShelf from '../ToastShelf';
import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = React.useState('')
  const [selectedVariant, setSelectedVariant] = React.useState('notice')
  const [showPop, setShowPop] = React.useState(false)
  const [toasts, setToasts] = React.useState([])

  useEscapeKey(() => {
    setToasts([])
  })

  const onToastSubmit = (e) => {
    e.preventDefault()
    if (!message.trim().length) return

    setShowPop(true)
    setToasts(u => [...u, {
      message,
      variant: selectedVariant,
      key: getKey()
    }])

    setMessage('')
    setSelectedVariant('notice')
  }

  const onToastClose = (key) => {
    setToasts(u => u.filter(t => t.key !== key))
  }

  return (
    <ToastProvider toasts={toasts} onToastClose={onToastClose}>
      <div className={styles.wrapper}>
        <header>
          <img alt="Cute toast mascot" src="/toast.png" />
          <h1>Toast Playground</h1>
        </header>

        {showPop && <ToastShelf />}

        <form className={styles.controlsWrapper} onSubmit={onToastSubmit}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="message" className={styles.messageInput} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {VARIANT_OPTIONS.map((option, index) => (
                <label key={option} htmlFor={`variant-${option}`}>
                  <input
                    id={`variant-${option}`}
                    type="radio"
                    name="variant"
                    checked={selectedVariant === option}
                    value={option}
                    onChange={(e) => setSelectedVariant(e.target.value)}
                  />
                  {option}
                </label>
              ))}

            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button type="submit">Pop Toast!</Button>
            </div>
          </div>
        </form>
      </div>
    </ToastProvider>
  );
}

export default ToastPlayground;
