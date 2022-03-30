import style from "../../styles/ProductDetails.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import CustomButton from '../../components/customButton/CustomButton';
import {useAddToCart, useRemoveFromCart, useCartItems} from '../../zustand-store';
import { handleCart } from "../../components/utils/utils";

const getFlower = async (key, title) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/flowers?title=${escape(title)}`
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

function Title ({ data }) {
  const addToCart = useAddToCart()
  const handleCart = async (method) => {
     try {
       const req = await fetch('/api/cart', {
         method,
         body: JSON.stringify({
           quantity:   1, 
           userId: '1412c9f0-733a-42bd-911e-96a99e17219f',
           productId: "69dd215c-5351-4690-a7df-8d3f3277d9de"
         })
       });
 
       const res = await req.json();
     } catch (err) {
       console.log(err);
     }
   };
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
        <div className={style.buttonsBarContainer}>
          <CustomButton onClick={()=>addToCart({ productId: data.productId, title: data.title, price: data.price, image: `/flowers/${data.title
              .toLowerCase()
              .replace(" ", "-")}.jpg` })}> Add To Cart </CustomButton>
        </div>
      </div>
    </>
  )}
</div>
<div className={style.buttonsBarContainer}>
          <CustomButton onClick={()=>handleCart('POST')}> Add To Cart + </CustomButton>
</div>
<div className={style.buttonsBarContainer}>
          <CustomButton onClick={()=>handleCart('DELETE')}> Remove from Cart - </CustomButton>
</div>

</div>
  );
};

export default Title;




