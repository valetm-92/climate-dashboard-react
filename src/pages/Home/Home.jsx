import { Activity, ArrowDown } from 'lucide-react';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import { indicatorList } from '../../config/indicators';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div><span className={styles.kicker}><Activity size={16} /> Dati climatici globali</span><h1>Comprendere il cambiamento climatico attraverso i dati.</h1><p>Esplora cinque indicatori chiave del riscaldamento globale attraverso dashboard semplici, responsive e alimentate da API pubbliche.</p><a href="#indicatori" className={styles.heroLink}>Esplora gli indicatori <ArrowDown size={17} /></a></div>
        <div className={styles.visual} aria-hidden="true"><div className={styles.orbit} /><span>5</span><small>indicatori<br />climatici</small></div>
      </section>
      <section id="indicatori" className={styles.section}><div className={styles.sectionTitle}><span>Dashboard</span><h2>Seleziona un indicatore</h2><p>Ogni sezione utilizza dati aggiornati recuperati dalle API di global-warming.org.</p></div><div className={styles.grid}>{indicatorList.map((indicator) => <DashboardCard key={indicator.id} indicator={indicator} />)}</div></section>
    </div>
  );
}
