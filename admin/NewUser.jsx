import style from '../styles/Newuser.module.css';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useEffect, useState } from 'react';
import { productInputs, userInputs } from './formSource';
import { useRouter } from "next/router";
import { auth, db, storage } from "../firebase/firebase.utils.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const NewUser = ({ inputs, title = 'User' }) => {
  const router = useRouter();
  const query = router.query;
 const {
    id,name,image,email,phone,address,country,notice} = query;
    let preData = {};
    if (query) { preData = {...preData, id,name,image,email,phone,address,country,notice}}
      const initialData = {id: "", name: "", image: "",email: "",phone: "",address: "",country: "", notice:""}
    const [data, setData] = useState(query.id? preData: initialData);
    const [file, setFile] = useState('');
    const [per, setPerc] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState('');


  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    delete data.id;
    try {
      const req = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          ...data
        })
      });
      const res = await req.json();
      router.back(-1);
    } catch (err) {
      console.log("err:",err);
    }
  };

  return (
    <div className={style.new}>
      <Sidebar />
      <div className={style.newContainer}>
        <Navbar />
        <div className={style.top}>
          <h1>{title}</h1>
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            <img
              className={style.img}
              src={
                !file
                  ? query.image? `/flowers/${query.image}` :'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                  : URL.createObjectURL(file)
              }
              alt=""
            />
          </div>
          <div className={style.right}>
            <form onSubmit={handleAdd} className={style.form}>
              <div className={style.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  className={style.input}
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: 'none' }}
                />
              </div>

              {userInputs?.map((input) => (
                <div className={style.formInput} key={input.id}>
                  <label>{input.label}</label>
                  <input
                    className={style.input}
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={data[input.value]}
                    onChange={handleInput}
                    name={input.name}                  
                    disabled={input.disabled}
                  />
                </div>
              ))}
              <button
                disabled={per !== null && per < 100}
                type="submit"
                className={style.button}
              >
               {query.id? 'Update': 'Send'}
              </button>
            </form>
            {errorMessage&&<Error>{errorMessage}</Error>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
