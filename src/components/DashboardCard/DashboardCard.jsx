import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './DashboardCard.module.css';

export default function DashboardCard({ indicator }) {
  const { path, title, shortDescription, Icon } = indicator;
  return (
    <Link to={path} className={styles.card}>
      <span className={styles.icon}><Icon size={25} /></span>
      <div><h2>{title}</h2><p>{shortDescription}</p></div>
      <span className={styles.cta}>Visualizza <ArrowRight size={17} /></span>
    </Link>
  );
}
