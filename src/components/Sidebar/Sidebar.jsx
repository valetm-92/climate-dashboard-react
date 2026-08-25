import {
  Home,
  Leaf,
  Info,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';
import { indicatorList } from '../../config/indicators';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ''}`;

  return (
    <aside className={styles.sidebar}>
      <NavLink
        to="/"
        className={styles.brand}
        aria-label="Climate Dashboard Home"
      >
        <span className={styles.logo}>
          <Leaf size={24} />
        </span>

        <span>
          Climate
          <br />
          Dashboard
        </span>
      </NavLink>

      <nav
        className={styles.nav}
        aria-label="Navigazione principale"
      >
        <NavLink
          to="/"
          end
          className={linkClass}
        >
          <Home size={19} />
          Home
        </NavLink>

        {indicatorList.map(({ path, navLabel, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={linkClass}
          >
            <Icon size={19} />
            {navLabel}
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        <a
          className={styles.link}
          href="#informazioni"
        >
          <Info size={19} />
          Informazioni
        </a>

        <a
          className={styles.link}
          href="https://github.com/valetm-92/climate-dashboard-react"
          target="_blank"
          rel="noreferrer"
        >
          <span>GH</span>
          GitHub
        </a>
      </div>
    </aside>
  );
}
