import style from "../../styles/ProductDetails.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

const getFlower = async (key, title) => {
  const { data } = await axios.get(
    `http://localhost:3000/api/flowers?title=${escape(title)}`
  );
  return data;
};

export async function getServerSideProps(context) {
  const data = await getFlower(null, context.params.title);
  return {
    props: {
      data: data,
    },
  };
}

function title ({ data }) {
/*   const dispatch = useDispatch();
  
  useEffect(()=>{
    dispatch(setHeaderStatus(false))    
    return () => dispatch(setHeaderStatus(true))
  },[]) */
  return (
<div className={style.wrapper}>
<Head>
  <title>{(data && data.title) || "Perfume"}</title>
</Head>
<div>
  {data && (
    <>
      <h2>{data.title}</h2>
      <div className={style.container}>
        <div >
          <Image
            className={style.detailsImage}
            alt=""
            src={`/flowers/${data.title
              .toLowerCase()
              .replace(" ", "-")}.jpg`}
              width="250"
              height="200"
              objectFit="cover"
          />
        </div>
        <div className={style.textContainer}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {(key !== "image" && key !== "title") && 
              <>
              <span style={{fontWeight: "bold"}}>{key}:&nbsp;</span>
              <span >{value}&nbsp;</span> </> }
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</div>
</div>
  );
};

export default title;




