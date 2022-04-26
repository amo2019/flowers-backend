import style from '../styles/Newuser.module.css';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import { useEffect, useState } from 'react';
import { orderInputs } from './formSource';
import { useRouter } from "next/router";

const ViewOrder = ({ inputs, title = 'Order' }) => {
  const router = useRouter();
  const query = router.query;

 const {
    id,userId,total,orderStatus,method,createdAt,charge} = query;
    let preData = {};
    if (query) { preData = {...preData, id,userId,total,orderStatus,method,createdAt,charge}}
      const initialData = {id: "", userId: "", total: "",orderStatus: "",method: "",createdAt: "",charge: ""}
    const [data, setData] = useState(query.id? preData: initialData);

  return (
    <div className={style.new}>
      <Sidebar />
      <div className={style.newContainer}>
        <Navbar />
        <div className={style.top}>
          <h1>{title}</h1>
        </div>
        <div className={style.bottom}>
          <div className={style.right}>
            <form className={style.form}>

              {orderInputs?.map((input) => (
                <div className={style.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    className={style.input}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={data[input.value]}
                    name={input.name}                  
                    disabled={input.disabled}
                  />
                </div>
              ))}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
