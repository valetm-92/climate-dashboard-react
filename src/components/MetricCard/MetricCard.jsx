import styles from './MetricCard.module.css';
export default function MetricCard({ value, label }) { return <article className={styles.card}><strong>{value}</strong><span>{label}</span></article>; }
