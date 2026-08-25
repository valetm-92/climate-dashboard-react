import { Leaf, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { indicatorList } from '../../config/indicators';
import styles from './MobileHeader.module.css';

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className={styles.header}>
        <NavLink to="/" className={styles.brand} onClick={() => setOpen(false)}><Leaf size={22} /> Climate Dashboard</NavLink>
        <button className={styles.button} type="button" aria-label="Apri menu" onClick={() => setOpen(true)}><Menu /></button>
      </header>
      {open && <button type="button" className={styles.backdrop} aria-label="Chiudi menu" onClick={() => setOpen(false)} />}
      <aside className={`${styles.drawer} ${open ? styles.open : ''}`} aria-hidden={!open}>
        <div className={styles.drawerTop}><strong>Menu</strong><button type="button" className={styles.button} aria-label="Chiudi menu" onClick={() => setOpen(false)}><X /></button></div>
        <NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink>
        {indicatorList.map(({ path, navLabel, Icon }) => <NavLink key={path} to={path} onClick={() => setOpen(false)}><Icon size={19} /> {navLabel}</NavLink>)}
      </aside>
    </>
  );
}
