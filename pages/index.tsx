import { useState, useRef, FormEvent } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import LaptopCard from "@/components/dashboard/_laptopCard";
import ScrollToTop from "@/components/ScrollToTop";
import { Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { fontSize } from "@mui/system";

// import { useRef } from 'react';
interface Laptop {
  image: string;
  brand: string;
  model: string;
  strikePrice: number;
  price: number;
  ram: string;
  gpu: string;
  processor: string;
  disk: string;
  os: string;
  display: string;
  name: string;
}

export default function Home() {
  // const scrollRef = useRef(null);
  // useScrollSnap({ ref: scrollRef, duration: 100, delay: 50 });
  const data = require("@/pages/api/laptops/laptop.json");
  const laptops: Laptop[] = data;
  const [open, setOpen] = useState(false);
  const contactRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [laptopModel, setLaptopModel] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  async function handleOrder(e: FormEvent) {
    e.preventDefault();
    const data = {
      model: laptopModel,
      contactNo: contactRef.current?.value,
      name: nameRef.current?.value,
    };
    console.log(data);
    const res = await axios.post(`/api/contact`, data);
    console.log(res);
    handleClose();
  }
  return (
    <>
      <Head>
        <title>Laptops</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <section className={styles.bigContainer}>
        <section className={styles.wrapper}>
          <div className={styles.top}>ZIIIP</div>
          <div
            className={styles.bottom}
            aria-hidden="true">
            ZIIIP
          </div>
        </section>
        <section className={styles.snapChild}>
          {/* <Dashboard /> */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="form-modal"
            aria-describedby="modal-that-contains-order now from">
            <div className={styles.modalContainer}>
              <div className={styles.modalContent}>
                <div
                  className={styles.closeIcon}
                  onClick={handleClose}>
                  <CloseIcon sx={{ color: "#333" }} />
                </div>
                {/* <form
                  className={styles.modalForm}
                  onSubmit={handleOrder}>
                  <div className={styles.formGroup}>
                    <label htmlFor="modelNo">Model Number</label>
                    <input
                      type="text"
                      name="modelNo"
                      id="modelNo"
                      disabled
                      value={laptopModel}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="contactNo">Contact Number</label>
                    <input
                      type="number"
                      name="contactNo"
                      id="contactNo"
                      required
                      placeholder="Enter your contact number"
                      ref={contactRef}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder="Enter your full name"
                      ref={nameRef}
                    />
                  </div>
                  <button
                    className={styles.infoButton}
                    type="submit"
                    style={{ marginTop: "1rem" }}>
                    Order Now
                  </button>
                </form> */}
                <p style={{ fontSize: "1.5rem" }}>
                  Please Contact at <strong>9862513949</strong> to order.
                </p>
              </div>
            </div>
          </Modal>

          {laptops.map((laptop, index) => (
            <LaptopCard
              laptop={laptop}
              key={index}
              setLaptopModel={setLaptopModel}
              setOpen={setOpen}></LaptopCard>
          ))}

          <ScrollToTop
            styles={{
              width: "calc(100% + 4rem)",
              textAlign: "center",
              backgroundColor: "#000",
              height: "5rem",
              color: "#fff",
              gridColumn: "1/-1",
              marginLeft: "-2rem",
              marginBottom: "-1rem",
            }}
          />
        </section>
      </section>
    </>
  );
}

// export async function getStaticProps(context: any) {
//   const res = await fetch("http://localhost:3000/api/laptops");
//   const data = await res.json();
//   // console.log(data)
//   // const data = "weeeeeeeeee"
//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }
