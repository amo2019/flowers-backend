import style from '../../styles/Datatable.module.css';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../datatablesource';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Datatable = () => {
  const [data, setData] = useState([]);
  const id = '4f7160ea-bad3-4007-a7bf-b7e855a32afe';
  useEffect(() => {
    const users = async () => {
      try {
        const req = await fetch(`/api/user`);
        const res = await req.json();
        setData(res.users);
      } catch (err) {
        console.log(err);
      }
    };
    users();

  }, []);


  const handleDelete = async (id) => {
    try {
      const req = await fetch('/api/user', {
        method: 'DELETE',
        body: JSON.stringify({
          userId: id
        })
      });
      const res = await req.json();
      setData(data.filter((item)=>item.id!==id));
      //router.back(-1);
    } catch (err) {
      console.log("err:",err);
    }
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className={style.cellAction}>
            <Link
                        href={{
            pathname: "/admin/users/new",
            query: params.row, 
          }}
              style={{ textDecoration: 'none' }}
              passHref
            >
              <div className={style.viewButton}>
                View User
                </div>
            </Link>
            <div
              className={style.deleteButton}
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
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
        Users
        <Link href={'/admin/users/new'} className={style.link} passHref>
        Add New User
        </Link>
      </div>
      <DataGrid
        className={style.datagrid}
        rows={data}
        columns={userColumns.concat(actionColumn)}
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


//data.map((item)=>{return {...item, id:item.id.slice(26, 32).concat("...")}})