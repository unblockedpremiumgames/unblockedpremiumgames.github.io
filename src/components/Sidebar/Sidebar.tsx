import styles from './styles/Sidebar.module.scss';
import BestGames from '../BestGames';

const Sidebar = ({ ...rest }) => {
  return (
    <aside {...rest} className={styles.sidebar}>
        <BestGames />
    </aside>
  );
};

export default Sidebar;
