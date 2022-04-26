import style from "../styles/Main.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import List from "../components/carousel/List";
import CustomButton from '../components/customButton/CustomButton';
import {useAddItemToCart, useAddToCart, useClearCart, useSearchItem, useFetchedData} from '../zustand-store';
import {
  Add,
} from "@material-ui/icons";
import {getCartItems} from "./api/cartapi"

export async function getServerSideProps() {
  const cart = await getCartItems({id: '18ec7f0c-68fc-4589-8294-06e6623971f4'})
  const resp = await fetch(
    'http://localhost:3000/api/product'
  );
 const {products} = await resp.json()

  return {
    props: {
      flowers: JSON.parse(JSON.stringify(products)),
      cartItems: JSON.parse(JSON.stringify(cart)),
    },
  };
}

const Home = ({flowers, cartItems}) => {
  const addItemToCart = useAddItemToCart()
  const addToCart = useAddToCart()
  const clearCart = useClearCart();
  useEffect(() => {
    clearCart();
    cartItems.map(async(item)=>{
      addItemToCart({ productId: item.productId, title: item.product.name, price: item.product.price, quantity: item.quantity, image: `/flowers/${item.product?.image}`})
    })    }, []);
    const id = "18ec7f0c-68fc-4589-8294-06e6623971f4"

    const users = async ()=>{
      try {
        const req = await fetch(`/api/user?id=${id}`);
       const res = await req.json();
      } catch (err) {
        console.log(err.message);
      }
    }
    users()

const search = async(item) => {
    if (!item) item = /.*/;
    const filter = item ? new RegExp(item, "i") : /.*/;
    return flowers?.filter(({ name }) => name.match(filter))
          .slice(0, 32).map((flower) => ({
            ...flower,
            image: `/flowers/${flower.name
              .toLowerCase()
              .replace(" ", "-")}.jpg`,
          }));
  };

  const injectFetchedData = useFetchedData()
  injectFetchedData(flowers);

  const searchItem = useSearchItem()
  const [data, setData] = useState(flowers)
  const setProducts = useFetchedData()
  setProducts(flowers);
    useEffect(async()=>{
      setData(await search(searchItem));
    },[searchItem])

    const handleCart = async (method, {  productId, name, price, image } ) => {
       try {
         const req = await fetch('/api/cart', {
           method,
           body: JSON.stringify({
             quantity:   1, 
             userId: '18ec7f0c-68fc-4589-8294-06e6623971f4',
             productId: productId
           })
         });
         addToCart({  productId, name, price, image });
         const res = await req.json();
       } catch (err) {
         console.log(err);
       }
     };

  return (
    <>
    <div className={style.mostPopular}>
    &#127809;	&nbsp; MOST POPULAR &nbsp; &#127809;					
    </div>
    <List/>
    <div className={style.container}>
        {data && (
          <div className={style.productListCardContainer}>
            {data.map(({ id, name, price, description, image }) => (
              <div className={style.card}  key={id}>
                <Link href={`/flowers/${name}`} passHref>
                  <div className={style.imageContainer}>
                    <Image
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_URL}/${image}`}
                      width="250"
                      height="250"
                      objectFit="cover"
                  />
                    <div className={style.cardDesc} >
                      <span>{name}</span>
                    </div>
                  </div>
                </Link>
                        <button className={style.buttonsBarContainer} onClick={handleCart.bind(this,'POST', {  productId: id, name, price, image })}> Add To Cart </button>

              </div>
            ))}
          </div>
        )}
      </div>
  </>
  );
};

export default Home;