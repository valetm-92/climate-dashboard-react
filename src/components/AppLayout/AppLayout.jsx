import Sidebar from '../Sidebar/Sidebar';
import MobileHeader from '../MobileHeader/MobileHeader';
import styles from './AppLayout.module.css';

export default function AppLayout({ children }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <MobileHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
