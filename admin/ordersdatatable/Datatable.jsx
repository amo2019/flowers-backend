import style from '../../styles/Datatable.module.css';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import { orderColumns } from '../datatablesource';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Datatable = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const id = '4f7160ea-bad3-4007-a7bf-b7e855a32afe';
    useEffect(() => {

      const users = async () => {
        try {
          const resp = await fetch(
            `http://localhost:3000/api/order?admin=${true}`
          );
         const {orders} = await resp.json()
          setData(orders);
        } catch (err) {
          console.log(err);
        }
      };
      users();

  }, []);
  const handleChange = (e, paramsRow)=>
  {
    setStatus(e.target.value);
  }
  const handleUpdate = async (id) => {
    try {
      const resp = await fetch(
        `http://localhost:3000/api/order?admin=${true}`, {
          method: 'PUT',
          body: JSON.stringify({
            orderId: id,
            orderStatus: status
          })
        });
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 280,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Link
              href={{
                pathname: '/admin/orders/view',
                query: params.row, 
              }}
              style={{ textDecoration: 'none' }}
              passHref
            >
              <div className={style.viewButton}>View</div>
            </Link>
            <select onChange={(e)=>handleChange(e,params.row)}>
              <option value={params.row.orderStatus} selected defaultValue="STAGE_ONE">{params.row.orderStatus}</option>
              <option value="STAGE_ONE">STAGE_ONE</option>
              <option value="STAGE_TWO">STAGE_TWO</option>
              <option value="STAGE_THREE">STAGE_THREE</option>
              <option value="STAGE_FOUR">STAGE_FOUR</option>
              <option value="STAGE_FIVE">STAGE_FIVE</option>
              <option value="STAGE_SIX">STAGE_SIX</option>
            </select>
            <div
              className={style.deleteButton}
              onClick={() => handleUpdate(params.row.id)}
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className={style.new}>
    <Sidebar />
    <div className={style.newContainer}>
      <Navbar />
    <div className={style.datatable}>
      <div className={style.datatableTitle}>
      Oeders
      </div>
      <DataGrid
        className={style.datagrid}
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
    </div>
    </div>
  );
};

export default Datatable;
