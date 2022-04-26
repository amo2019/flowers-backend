import style from '../../styles/Sidebar.module.css';
import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <div className={style.top}>
        <div className={style.corner}>
      <Link href={'/admin'} style={{ textDecoration: 'none' }} passHref>
          <span className={style.logo}>ADMIN</span>
        </Link>
        <Link href={'/'} style={{ textDecoration: 'none' }} passHref>
          <span className={style.logo}>HOME</span>
        </Link>
        </div>
      </div>
      <hr />
      <div className={style.center}>
        <ul className={style.ul}>
          <p className={style.title}>MAIN</p>
          <Link href="/admin" style={{ textDecoration: 'none' }} passHref>
          <li className={style.li}>
            <DashboardIcon className={style.icon}  />
            <span className={style.span}>Dashboard</span>
          </li>
          </Link>
          <p className={style.title}>LISTS</p>
          <Link href="/admin/users" style={{ textDecoration: 'none' }} passHref>
            <li className={style.li}>
              <PersonOutlineIcon className={style.icon} />
              <span className={style.span}>Users</span>
            </li>
          </Link>
          <Link
            href="/admin/products"
            style={{ textDecoration: 'none' }}
            passHref
          >
            <li className={style.li}>
              <StoreIcon className={style.icon} />
              <span className={style.span}>Products</span>
            </li>
          </Link>
          <Link
            href="/admin/orders"
            style={{ textDecoration: 'none' }}
            passHref
          >
          <li className={style.li}>
            <CreditCardIcon className={style.icon} />
            <span className={style.span}>Orders</span>
          </li>
          </Link>
          <li className={style.li}>
            <LocalShippingIcon className={style.icon} />
            <span className={style.span}>Delivery</span>
          </li>
          <p className={style.title}>USEFUL</p>
          <li className={style.li}>
            <InsertChartIcon className={style.icon} />
            <span className={style.span}>Stats</span>
          </li>
          <li className={style.li}>
            <NotificationsNoneIcon className={style.icon} />
            <span className={style.span}>Notifications</span>
          </li>
          <p className={style.title}>SERVICE</p>
          <li className={style.li}>
            <SettingsSystemDaydreamOutlinedIcon className={style.icon} />
            <span className={style.span}>System Health</span>
          </li>
          <li className={style.li}>
            <PsychologyOutlinedIcon className={style.icon} />
            <span className={style.span}>Logs</span>
          </li>
          <li className={style.li}>
            <SettingsApplicationsIcon className={style.icon} />
            <span className={style.span}>Settings</span>
          </li>
          <p className={style.title}>USER</p>
          <li className={style.li}>
            <AccountCircleOutlinedIcon className={style.icon} />
            <span className={style.span}>Profile</span>
          </li>
          <li className={style.li}>
            <ExitToAppIcon className={style.icon} />
            <span className={style.span}>Logout</span>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Sidebar;
