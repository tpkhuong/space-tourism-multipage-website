import React, { useState } from "react";
import Image from "next/image";
import { storageObj } from "../src/storage";
import CrewStyles from "../styles/Crew.module.css";
import Head from "next/head";
import Hurley from "../public/images/crew/image-douglas-hurley.png";
import Shuttleworth from "../public/images/crew/image-mark-shuttleworth.png";
import Glover from "../public/images/crew/image-victor-glover.png";
import Ansari from "../public/images/crew/image-anousheh-ansari.png";
import data from "../src/data.json";
import Header from "../Components/Header";
import SectionWrapper from "../Components/SectionWrapper";
import { horizontalVerticalTabpanel } from "../src/helperFunc";

function Crew(props) {
  /**
   * reset storage.count to 0 when user click to home, destinations, or crew page
   * **/
  storageObj.count = storageObj.count > 0 ? 0 : storageObj.count;

  const arrOfCrewImg = [Hurley, Shuttleworth, Glover, Ansari];
  const crewInitialData = props.dataCrew[0];
  const crewData = {
    crewImg: arrOfCrewImg[0],
    crewIndex: 0,
    crewPosition: crewInitialData.role,
    crewName: crewInitialData.name,
    crewDescription: crewInitialData.bio,
    imgText: crewInitialData.altText,
  };
  const [crewStateData, useCrewState] = useState(crewData);
  return (
    <React.Fragment>
      <Head>
        <title>Meet Your Crew</title>
        <link
          rel="shortcut icon"
          href="/images/favicon-32x32.png"
          type="image/x-icon"
        />
        ;
      </Head>
      <SectionWrapper idAttr="crew">
        <Header activeEffect="CREW"></Header>
        {/* title-content-img-wrapper */}
        <section className={CrewStyles[`title-content-img-wrapper`]}>
          {/* title-wrapper */}
          <div className={CrewStyles[`title-wrapper`]}>
            <h1 className={CrewStyles[`page-title`]} id="tablist-2">
              <span className={CrewStyles[`page-title-digit`]}>02</span> MEET
              YOUR CREW
            </h1>
          </div>
          {/* content, tab and tabpanel */}
          <div className={CrewStyles[`content-wrapper`]}>
            {/* tablist */}
            <div
              onClick={crewDataPanelChnage.bind({
                pageData: props.dataCrew,
                arrOfImgSrc: arrOfCrewImg,
                stateObj: { crewStateData, useCrewState },
              })}
              role="tablist"
              aria-labelledby="tablist-2"
              onKeyDown={horizontalVerticalTabpanel}
              className={CrewStyles[`tablist`]}
            >
              {/* Hurley */}
              <button
                data-index="0"
                className={CrewStyles[`crewTab-btn`]}
                role="tab"
                aria-controls="tabpanel-0"
                aria-selected="true"
                id="tab-0"
                aria-label="Douglas Hurley"
              ></button>
              {/* Shuttleworth*/}
              <button
                data-index="1"
                className={CrewStyles[`crewTab-btn`]}
                role="tab"
                aria-controls="tabpanel-1"
                aria-selected="false"
                aria-label="Mark Shuttleworth"
                id="tab-1"
              ></button>
              {/* Glover */}
              <button
                data-index="2"
                className={CrewStyles[`crewTab-btn`]}
                role="tab"
                aria-controls="tabpanel-2"
                aria-selected="false"
                aria-label="Victor Glover"
                id="tab-2"
              ></button>
              <button
                data-index="3"
                className={CrewStyles[`crewTab-btn`]}
                role="tab"
                aria-controls="tabpanel-3"
                aria-selected="false"
                aria-label="Anousheh Ansari"
                id="tab-3"
              ></button>
              {/* Ansari */}
            </div>
            {/* tabpanel */}
            <div
              className={CrewStyles[`tabpanel`]}
              role="tabpanel"
              // aria-labelledby matches tab id
              aria-labelledby={`tab-${crewStateData.crewIndex}`}
              // id matches tab aria-controls
              id={`tabpanel-${crewStateData.crewIndex}`}
            >
              {/* position */}
              <span className={CrewStyles[`position`]}>
                {crewStateData.crewPosition}
              </span>
              {/* crewname */}
              <h2 tabIndex="-1" className={CrewStyles[`title`]}>
                {crewStateData.crewName}
              </h2>
              {/* crew description */}
              <p className={CrewStyles[`description`]}>
                {crewStateData.crewDescription}
              </p>
            </div>
          </div>

          {/* tabpanel name will come from the button element with matching value of the button id attr and tabpanel aria-labelledby */}
          {/* img wrapper */}
          <div className={CrewStyles[`img-wrapper`]}>
            <Image
              layout="fill"
              src={crewStateData.crewImg}
              alt={crewStateData.imgText}
            />
          </div>
        </section>
      </SectionWrapper>
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      dataCrew: data.crew,
    },
  };
}

function crewDataPanelChnage(event) {
  if (
    event.target.closest("BUTTON") &&
    event.target.closest("BUTTON").getAttribute("aria-selected") == "false"
  ) {
    // find button with aria-selected true
    const currentSelectedCrewMember = document.querySelector(
      "[aria-selected='true']"
    );
    // change value of aria-selected to false for currentSelectedCrewMember
    currentSelectedCrewMember.getAttribute("aria-selected") == "true"
      ? currentSelectedCrewMember.setAttribute("aria-selected", "false")
      : null;
    // change value of aria-selected of clicked button to true
    event.target.closest("BUTTON").getAttribute("aria-selected") == "false"
      ? event.target.closest("BUTTON").setAttribute("aria-selected", "true")
      : null;
    // get data index
    const index = Number(
      event.target.closest("BUTTON").getAttribute("data-index")
    );
    // get img src
    const imgComponent = this.arrOfImgSrc[index];
    // data from json file
    const currentData = this.pageData[index];
    this.stateObj.useCrewState((prevValues) => {
      return {
        ...prevValues,
        crewImg: imgComponent,
        crewIndex: index,
        crewPosition: currentData.role,
        crewName: currentData.name,
        crewDescription: currentData.bio,
        imgText: currentData.altText,
      };
    });
  }
}

export default Crew;
