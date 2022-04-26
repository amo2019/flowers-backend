//import flowers from "../flowers.json"; 
import { async } from '@firebase/util';
import {returnData} from '../zustand-store';
import axios from "axios";


const getFlower = async (key, name) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/flowers?name=${escape(name)}`
  );
  return data;
};

const handleProducts = async (method) => {
  try {
    const { data } = await axios.get('http://localhost:3001/api/product');
    return data.products || [];
    
  } catch (err) {
    console.log("Error:",err);
  }
};

export const search = async(item) => {
  const {flowers} = await handleProducts();
  if (!item) item = /.*/;
  const filter = item ? new RegExp(item, "i") : /.*/;
/*   console.log("i:",flowers?.filter(({ title }) => title.match(filter))
  .slice(0, 33)) */
  return flowers?.filter(({ name }) => name.match(filter))
        .slice(0, 33).map((flower) => ({
          ...flower,
          image: `/flowers/${flower.name
            .toLowerCase()
            .replace(" ", "-")}.jpg`,
        }));
};
