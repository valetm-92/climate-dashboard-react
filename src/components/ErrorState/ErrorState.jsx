import { RefreshCw, TriangleAlert } from 'lucide-react';
import styles from './ErrorState.module.css';
export default function ErrorState({ onRetry }) { return <div className={styles.wrap}><TriangleAlert size={34} /><h2>Impossibile caricare i dati</h2><p>Controlla la connessione o riprova tra poco.</p><button type="button" onClick={onRetry}><RefreshCw size={17} /> Riprova</button></div>; }
