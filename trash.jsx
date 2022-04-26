import style from "../styles/Main.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import List from "../components/carousel/List";
import CustomButton from '../components/customButton/CustomButton';
import {useAddItemToCart, useClearCart, useSearchItem, useFetchedData, useCartItems} from '../zustand-store';
import {
  Add,
} from "@material-ui/icons";
import create from "zustand";

import flowers from "../flowers.json"; 
import {getCartItems, subTotal} from "./api/cartapi"


const useCartStore =create((set) => ({
  cartItems: [],
  setFlowers: (cartItems) =>
    set({ cartItems }),
}));

/* export async function getServerSideProps() {
const cart = await getCartItems({id: '9c0ca629-64e7-4c90-bdb6-5a597c53ff8d'})

 const cartx = await cart.json()
 console.log("cartx:",cartx)
 useCartStore.getState().setFlowers(cartx);

  return {
    props: {
      cartItems: useCartStore.getState().cartItems,
    },
  };
} */


const useFlowersStore = create((set) => ({
  flowers: [],
  filteredFlowers: [],
  filter: "",

  setFlowers: (flowers) =>
  set({ flowers, filteredFlowers: flowers }),
  setFilter: (filter) =>
    set((state) => ({
      filter,
      filteredFlowers: state.flowers.filter((flowers) =>
        flowers.name.toLowerCase().includes(filter.toLowerCase())
      ),
    })),
}));

export async function getServerSideProps() {
  const cart = await getCartItems({id: 'e4ee638e-6dab-4f85-86a1-3fcb0f6d2f61'})
  const subTotal2 = await subTotal({id: 'e4ee638e-6dab-4f85-86a1-3fcb0f6d2f61'}, cart)


 //const cartx = await cart.json()
 console.log("subTotal2:",subTotal2)
 //console.log("cartx:",cart)
 useCartStore.getState().setFlowers(cart);

  const resp = await fetch(
    'http://localhost:3000/api/product'
  );
 const {products} = await resp.json()
  useFlowersStore.getState().setFlowers(products);


  return {
    props: {
      flowers: useFlowersStore.getState().flowers,
      cartItems: useCartStore.getState().cartItems,
    },
  };
}



const getPerfume = async (key, q) => {
  const { data } = await axios.get(`/api/search?q=${escape(q)}`);
  return data.map((perfume) => ({
    ...perfume,
    image: `/flowers/${perfume.title
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

/* export async function getServerSideProps(context) {
  const cart = await getCartItems({id: '9c0ca629-64e7-4c90-bdb6-5a597c53ff8d'})

 const cartx = await cart.json()
 console.log("cartx:",cartx)
 useFlowersStore.getState().setFlowers(cartx);

  const response = await fetch('http://localhost:3001/api/product');
  const data = await response.json();
  console.log("flowers.products:",data)

  return {
    props: {
      datax: data.products || [],
    },
  };
} */

const Home = ({flowers, cartItems}) => {
  const addToCart = useAddItemToCart()
  const clearCart = useClearCart();
  clearCart();
  cartItems.map(async(item)=>{
/*     const response = await fetch(`http://localhost:3000/api/product?id=${item.productId}`);
    let {product} = await response.json(); */
    //console.log("data:::",product, item.quantity)
    addToCart({ productId: item.productId, title: item.product.name, price: item.product.price, quantity: item.quantity, image: `/flowers/${item.product?.image}`})
  })
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

  const searchItem = useSearchItem()
 const [data, setData] = useState(flowers)
  const setProducts = useFetchedData()
  setProducts(flowers);
    useEffect(async()=>{
      setData(await search(searchItem));
    },[searchItem])

  return (
    <>
    <div className={style.mostPopular}>
          MOST POPULAR
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
                        <button className={style.buttonsBarContainer} onClick={addToCart.bind(this, {  productId: id, name, price, image })}> Add To Cart </button>

              </div>
            ))}
          </div>
        )}
      </div>
  </>
  );
};

export default Home;


/* 
{
  "id": "6992dcd6-97f0-42f7-9f82-e84907ccaeb3",
  "total": 97,
  "charge": null,
  "userId": "18ec7f0c-68fc-4589-8294-06e6623971f4",
  "orderStatus": "STAGE_ONE",
  "method": "ONLINE",
  "createdAt": "2022-04-23T18:15:49.245Z",
  "updatedAt": "2022-04-23T18:15:49.250Z",
  "items": [
      {
          "id": "2f9c231d-e795-43bd-a768-7ff5a56294e8",
          "quantity": 1,
          "orderId": "6992dcd6-97f0-42f7-9f82-e84907ccaeb3",
          "products": [
              {
                  "id": "9445ac89-18db-4873-a0cc-6febb2e24c87",
                  "name": "Tibouchina Semidecandra",
                  "price": 33,
                  "size": null,
                  "image": "tibouchina-semidecandra.jpg",
                  "description": "Beautiful large royal purple flowers adorn attractive satiny green leaves that turn orange\\/red in cold weather. Grows to up to 18 feet, or prune annually to shorten.",
                  "category": "Shrubs",
                  "notice": null,
                  "amountInStock": 100,
                  "createdAt": "2022-04-23T16:57:12.191Z",
                  "updatedAt": "2022-04-23T16:57:12.192Z"
              }
          ]
      },
      {
          "id": "71875ebb-ad2c-40a8-b562-b23b27cd8b04",
          "quantity": 2,
          "orderId": "6992dcd6-97f0-42f7-9f82-e84907ccaeb3",
          "products": []
      },
      {
          "id": "5c36e794-c4fb-43e9-86c2-5b6fcac0354f",
          "quantity": 2,
          "orderId": "6992dcd6-97f0-42f7-9f82-e84907ccaeb3",
          "products": []
      },
      {
          "id": "710af19f-38c9-4e57-a284-3a17021da0dd",
          "quantity": 1,
          "orderId": "6992dcd6-97f0-42f7-9f82-e84907ccaeb3",
          "products": [
              {
                  "id": "d61e010b-37eb-4977-8b43-881d99772c23",
                  "name": "Bougainvillea Spectabilis",
                  "price": 10,
                  "size": null,
                  "image": "bougainvillea-spectabilis.jpg",
                  "description": "Thorny woody vine scrambles over other plants with their hooked thorns. Pest free.",
                  "category": "Shrubs",
                  "notice": null,
                  "amountInStock": 100,
                  "createdAt": "2022-04-23T16:57:12.304Z",
                  "updatedAt": "2022-04-23T16:57:12.305Z"
              }
          ]
      }
  ],
  "user": {
      "id": "18ec7f0c-68fc-4589-8294-06e6623971f4",
      "name": "Amin",
      "email": "am@am.com",
      "password": "aminpassword",
      "address": "la",
      "country": "us",
      "phone": "00544678903",
      "userStatus": "APPROVED",
      "image": null,
      "role": "USER",
      "notice": null,
      "createdAt": "2022-04-23T17:02:42.340Z"
  }
}
.forEach((item)=>{return {...item, id:item.id.slice(26, 32).concat("...")}})
 */