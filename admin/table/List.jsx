import style from '../../styles/Table.module.css';
import { Table } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useEffect, useState } from 'react';

  

export default function List() {
  const [data, setData] = useState([]);
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

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={style.tableCell}>Tracking ID</TableCell>
              <TableCell className={style.tableCell}>Customer</TableCell>
              <TableCell className={style.tableCell}>Status</TableCell>
              <TableCell className={style.tableCell}>Amount</TableCell>
              <TableCell className={style.tableCell}>Payment Method</TableCell>
              <TableCell className={style.tableCell}>Country</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className={style.tableCell}>{row.id.slice(26, 32).concat("...")}</TableCell>
                <TableCell className={style.tableCell}>
                  {row.user.name}
                </TableCell>
                <TableCell className={style.tableCell}>{row.orderStatus}</TableCell>
                <TableCell className={style.tableCell}>{row.total}</TableCell>
                <TableCell className={style.tableCell}>{row.method}</TableCell>
                <TableCell className={style.tableCell}>
                  <span className={style.status}>{row.user.country}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
