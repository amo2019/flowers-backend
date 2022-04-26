import style from '../../styles/Adminnavbar.module.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { useToggle, getToggle } from "../../zustand-store";
import Link from 'next/link';

const Navbar = () => {
  
  const toggle = useToggle();
  return (
    <div className={style.navbar}>
      <div className={style.wrapper}>
        <div className={style.search}>
          <input className={style.input} type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className={style.items}>
          <div className={style.item}>
            <LanguageOutlinedIcon className={style.icon} />
            English
          </div>
          <div className={style.item}>
            {getToggle()?(
            <LightModeIcon
              className={style.icon}
                            onClick={() => toggle()}
              
            />):(<DarkModeOutlinedIcon
              className={style.icon}
                            onClick={() => toggle()}
              
            />)}
          </div>
          <div className={style.item}>
            <NotificationsNoneOutlinedIcon className={style.icon} />
            <div className={style.counter}>1</div>
          </div>
          <div className={style.item}>
            <ChatBubbleOutlineOutlinedIcon className={style.icon} />
            <div className={style.counter}>1</div>
          </div>
          <div className={style.item}>
            <ListOutlinedIcon className={style.icon} />
          </div>
          <div className={style.item}>
            <img 
              src="https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg"
              alt=""
              className={style.avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
