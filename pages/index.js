import React from "react";
import Head from "next/head";
import HomeStyles from "../styles/Home.module.css";
import { storageObj } from "../src/storage";
import Header from "../Components/Header";
import SectionWrapper from "../Components/SectionWrapper";

function Home(props) {
  /**
   * reset storage.count to 0 when user click to home, destinations, or crew page
   * **/
  storageObj.count = storageObj.count > 0 ? 0 : storageObj.count;
  return (
    <React.Fragment>
      <Head>
        <title>Space</title>
        <link
          rel="shortcut icon"
          href="/images/favicon-32x32.png"
          type="image/x-icon"
        />
      </Head>
      <SectionWrapper idAttr="home">
        <Header activeEffect="HOME" />
        <section className={HomeStyles[`content-btn-wrapper`]}>
          <div className={HomeStyles[`content-wrapper`]}>
            <span className={HomeStyles[`sub-heading`]}>
              SO, YOU WANT TO TRAVEL TO
            </span>
            <h1 className={HomeStyles.title}>SPACE</h1>
            <p className={HomeStyles.description}>
              Let’s face it. If you want to go to space, you might as well
              genuinely go to outer space and not hover kind of on the edge of
              it. Well sit back, and relax because we’ll give you a truly out of
              this world experience!
            </p>
          </div>
          <button className={HomeStyles[`homebtn`]}>EXPLORE</button>
        </section>
      </SectionWrapper>
    </React.Fragment>
  );
}

export default Home;
