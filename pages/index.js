import style from "../styles/Main.module.css";
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";
import Image from "next/image";
import List from "../components/carousel/List";
import CustomButton from '../components/customButton/CustomButton';
import {useAddToCart, useSearchItem} from '../zustand-store';
import {
  Add,
} from "@material-ui/icons";


const getPerfume = async (key, q) => {
  const { data } = await axios.get(`/api/search?q=${escape(q)}`);
  return data.map((perfume) => ({
    ...perfume,
    image: `/flowers/${perfume.title
      .toLowerCase()
      .replace(" ", "-")}.jpg`,
  }));
};

const Home = () => {
  const addToCart = useAddToCart()
  const searchItem = useSearchItem()
  const [query, setQuery] = useState("");
  useEffect(()=>{
    setQuery(searchItem);
  },[searchItem])
  const { data } = useQuery(["q", query], getPerfume);

  const handleQuery = (evt) => {
    setQuery(evt.target.value);
  }

  return (
    <>
    <div className={style.mostPopular}>
          MOST POPULAR
    </div>
    <List/>
    <div className={style.container}>
        {data && (
          <div className={style.productListCardContainer}>
            {data.map(({ productId, title, price, description, image }) => (
              <div className={style.card}  key={productId}>
                <Link href={`/flowers/${title}`} passHref>
                  <div className={style.imageContainer}>
                    <Image
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_URL}/${image}`}
                      width="250"
                      height="250"
                      objectFit="cover"
                  />
                    <div className={style.cardDesc} >
                      <span>{title}</span>
                    </div>
                  </div>
                </Link>
                        <button className={style.buttonsBarContainer} onClick={addToCart.bind(this, { productId, title, price, image })}> Add To Cart </button>

              </div>
            ))}
          </div>
        )}
      </div>
  </>
  );
};

export default Home;
