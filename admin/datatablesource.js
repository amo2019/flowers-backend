import style from '../styles/Datatable.module.css';

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img className={style.cellImg} src={params.row.image || '/img/male-avatar.jpeg'} alt="avatar"  width={50} height={50}/>
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Address",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.country}`}>
          {params.row.country}
        </div>
      );
    },
  },
  {
    field: "userStatus",
    headerName: "Status",
    width: 160,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.userStatus}`}>
          {params.row.userStatus}
        </div>
      );
    },
  },
];

export const productColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Product",
    width: 330,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img className={style.cellImg} src={`/flowers/${params.row.image.toLowerCase()
              .replace(" ", "-")}`} alt="avatar" width={50} height={50}/>
          &nbsp; {params.row.name}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Category",
    width: 130,
  },

  {
    field: "amountInStock",
    headerName: "Stock",
    width: 60,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.amountInStock}`}>
          {params.row.amountInStock}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 60,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.price}`}>
          {params.row.price}
        </div>
      );
    },
  },
];

export const orderColumns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "user",
    headerName: "Customer",
    width: 230,
    renderCell: (params) => {
      return (
        <div className={style.cellWithImg}>
          <img className={style.cellImg} src={params.row.image || '/img/male-avatar.jpeg'} alt="avatar"  width={50} height={50}/>
          &nbsp; {params.row.user.name}
        </div>
      );
    },
  },
  {
    field: "orderStatus",
    headerName: "Status",
    width: 130,
  },

  {
    field: "method",
    headerName: "Method",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.method}`}>
          {params.row.method}
        </div>
      );
    },
  },
  {
    field: "total",
    headerName: "Total",
    width: 60,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.total}`}>
          {params.row.total}
        </div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "Create dAt",
    width: 85,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.createdAt}`}>
          {params.row.createdAt}
        </div>
      );
    },
  },
];
