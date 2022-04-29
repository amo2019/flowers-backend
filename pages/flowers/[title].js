import style from "../../styles/ProductDetails.module.css";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import CustomButton from '../../components/customButton/CustomButton';
import {Stars} from '../../components/Stars';
import {useAddToCart, UserData, uidData} from '../../zustand-store';
import { handleCart } from "../../components/utils/utils";
import { useState } from "react";

const getFlower = async (key, title) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/flowers?title=${escape(title)}`
  );
  return data;
};

export async function getServerSideProps(context) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product?title=${context.params.title}`);
  const data = await response.json();

  return {
    props: {
      res: JSON.parse(JSON.stringify(data.product)) || {}, 
    },
  };
}

function Title ({res} ) {
  const {reviews:[review], ...data} = res; // || {reviews: []};
  const [userReview, setUserReview] = useState({
    userText: review?.text ? review.text:'',
    starsNo: review?.rating ? review.rating:4,
  });
  //const review = data ? data.review : []
  const addToCart = useAddToCart()
  const handleCart = async (method) => {
     try {
       const req = await fetch('/api/cart', {
         method,
         body: JSON.stringify({
           quantity:   1, 
           userId: '18ec7f0c-68fc-4589-8294-06e6623971f4',
           productId: data.id
         })
       });
       addToCart({ productId: data.id, name: data.name, price: data.price, image: `/flowers/${data?.name?.toLowerCase()
        .replace(" ", "-")}.jpg` });
       const res = await req.json();
     } catch (err) {
       console.log(err);
     }

     try {
      const req = await fetch('/api/product', {
        method: 'DELETE',
        body: JSON.stringify({
          productId: '4f7160ea-bad3-4007-a7bf-b7e855a32afe',
          name:          "test2",
          price:         44,
        })
      });
      addToCart({ productId: data.id, name: data.name, price: data.price, image: `/flowers/${data?.name?.toLowerCase()
       .replace(" ", "-")}.jpg` });
      const res = await req.json();
    } catch (err) {
      console.log(err);
    }
   };

   const handleSubmit = async () => {
    try {
      const req = await fetch('/api/review', {
        method: 'POST',
        body: JSON.stringify({
          text: userReview.userText,
          rating: userReview.starsNo,
          userId: '18ec7f0c-68fc-4589-8294-06e6623971f4',
          productId: data.id
        })
      });

      const res = await req.json();
    } catch (err) {
      console.log(err);
    }
  };
const {userText, starsNo} = userReview;
  const handleChange = event => {
    const { name, value } = event.target;

    setUserReview({ ...userReview, [name]: value });
  };
  
  return (
<div className={style.wrapper}>
<Head>
  <title>{(data && data.name) || "Perfume"}</title>
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
            src={`/flowers/${data?.name?.toLowerCase()
              .replace(" ", "-")}.jpg`}
              width="250"
              height="200"
              objectFit="cover"
          />
        </div>
        <div className={style.textContainer}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {(key !== "image" && key !== "createdAt" && key !== "updatedAt" && key !== "amountInStock" && key !== "notice") && 
              <>
              <span >{key}:&nbsp;:&nbsp;</span>
              <span >{key=="id"?value.slice(26, 32).concat("..."):value}&nbsp;</span> 
              </>  }
            </div>

          ))}
        </div>
        <div className={style.buttonsBarContainer}>
          <CustomButton onClick={()=>handleCart('POST')}>Add To Cart</CustomButton>
        </div>
        &#127809;		      
        </div>
      </>
  )}
</div>
    <div className={style.ratingContainer}>
      <section>
        <textarea
               rows="3" cols="34"
               placeholder="Add a review"
               name='userText'
               value={userText}
               onChange={handleChange}
               >
          </textarea>
      </section>
        <Stars review = {review?.rating || 3} setUserReview={setUserReview} userReview={userReview}/>
        <CustomButton style={{maxWidth: "6ch"}} onClick={()=>handleSubmit()}>rate</CustomButton>
  </div>
</div>
  );
};

export default Title;




