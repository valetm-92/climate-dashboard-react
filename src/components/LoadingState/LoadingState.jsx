import styles from './LoadingState.module.css';
export default function LoadingState() { return <div className={styles.wrap} role="status"><span className={styles.spinner} /><p>Caricamento dei dati climatici…</p></div>; }
