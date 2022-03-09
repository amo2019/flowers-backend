import style from "../styles/Contact.module.css";

const Contact = () => {
  return (
    <>
    <div className={style.container}>
      <h1 className={style.title}>Contact Us</h1>
      <form className={style.form}>
        <input className={style.inputSmall} type="text" placeholder="Name" />
        <input className={style.inputSmall} type="text" placeholder="Phone" />
        <input className={style.inputLarge} type="text" placeholder="Email" />
        <input className={style.inputLarge} type="text" placeholder="Subject" />
        <textarea
          className={style.textArea}
          type="text"
          rows={6}
          placeholder="Message"
        />
        <button className={style.LargeButton}>SUBMIT</button>
      </form>
    </div>
    </>
  );
};

export default Contact;
