import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import style from '../../styles/Admin.module.css';
import Widget from '../widget/Widget';
import Featured from '../featured/Featured';
import Chart from '../chart/Chart';
import List from '../table/List';
import { useEffect, useState } from 'react';
import { useToggle, getToggle } from "../../zustand-store";
  
 



const Home = () => {
  const darkMode = getToggle();
  const [theme, setTheme] = useState("Admin_dark__LcV5H")
  useEffect(() => {
    setTheme(darkMode ? "Admin_dark__LcV5H" : "")
  },[darkMode])

  const id = '575cbd95-6d19-45ad-aba5-2a13114b49c0';
  let res = null;
  useEffect(() => {
    const users = async () => {
      try {
        const req = await fetch(`/api/user?id=${id}`);
        res = await req.json();
      } catch (err) {
        console.log(err);
      }
    };
    users();
  }, []);
  const users = async () => {
    try {
      const req = await fetch('/api/user');
      res = await req.json();
    } catch (err) {
      console.log(err.message);
    }
  };
  users();
  return (
    <div >
    <div className={style.home}>
      <Sidebar />
      <div className={style.homeContainer}>
        <Navbar />
        <div className={style.widgets}>
          <Widget type={style.user} />
          <Widget type={style.product} />
          <Widget type={style.order} />
          <Widget type={style.earning} />
        </div>
        <div className={style.charts}>
          <Featured />
          <Chart />
        </div>
        <div className={style.listContainer}>
          <div className={style.listTitle}>Latest Transactions</div>
          <List />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
