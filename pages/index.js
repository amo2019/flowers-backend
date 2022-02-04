import style from "../styles/Main.module.css";
import { useState, useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { filteredProducts, filteredField, setHeaderStatus } from "../redux/productSlice";
import Image from "next/image";
import List from "../components/carousel/List";

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
  const [query, setQuery] = useState("");
  let searchField = useSelector((state) => state.product.searchField);
  useEffect(()=>{
    setQuery(searchField);
  },[searchField])
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
            {data.map(({ productId, title, description, image }) => (
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
                      {/* <span >{description}</span> */}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
  </>
  );
};

export default Home;
