import React, { useEffect, useState, useCallback } from "react";
import TechStyles from "../styles/Technology.module.css";
import { storageObj } from "../src/storage";
import { horizontalVerticalTabpanel } from "../src/helperFunc";

import Head from "next/head";
import data from "../src/data.json";
import Header from "../Components/Header";
import SectionWrapper from "../Components/SectionWrapper";

function TechPage(props) {
  /**
   * landscape
   * **/
  const vehicleLandscape =
    "/images/technology/image-launch-vehicle-landscape.jpg";
  const spaceportLandscape = "/images/technology/image-spaceport-landscape.jpg";
  const capsuleLandscape =
    "/images/technology/image-space-capsule-landscape.jpg";
  /**
   * portrait
   * **/
  const vehiclePortrait =
    "/images/technology/image-launch-vehicle-portrait.jpg";
  const spaceportPortrait = "/images/technology/image-spaceport-portrait.jpg";
  const capsulePortrait = "/images/technology/image-space-capsule-portrait.jpg";
  // landscape img src component
  const landscapeImgSrc = [
    vehicleLandscape,
    spaceportLandscape,
    capsuleLandscape,
  ];
  // portrait img src component
  const portraitImgSrc = [vehiclePortrait, spaceportPortrait, capsulePortrait];

  useEffect(() => {
    if (storageObj.count === 0) {
      // run once
      window.screen.width < 815
        ? document
            .querySelector("#imgSelector")
            .setAttribute("src", landscapeImgSrc[0])
        : (document
            .querySelector("#imgSelector")
            .setAttribute("src", portraitImgSrc[0]),
          document
            .querySelector("[role='tablist']")
            .setAttribute("aria-orientation", "vertical"));
      storageObj.count++;
    }
  });
  // not using array of img component because we will use background image in css instead
  const techInitialData = props.techData[0];
  const techData = {
    techIndex: 0,
    techImg: "",
    techName: techInitialData.name,
    techDescription: techInitialData.description,
    imgText: techInitialData.altText,
  };
  const [techStateData, useTechState] = useState(techData);

  return (
    <React.Fragment>
      <Head>
        <title>Space Launch</title>
        <link
          rel="shortcut icon"
          href="/images/favicon-32x32.png"
          type="image/x-icon"
        />
        ;
      </Head>
      <SectionWrapper idAttr="technology">
        <Header activeEffect="TECHNOLOGY"></Header>
        {/* title-content-img-wrapper */}
        <section className={TechStyles[`title-content-img-wrapper`]}>
          {/* title wrapper */}
          <div className={TechStyles[`title-wrapper`]}>
            <h1 className={TechStyles[`page-title`]} id="tablist-3">
              <span className={TechStyles[`page-title-digit`]}>03</span> SPACE
              LAUNCH 101
            </h1>
          </div>
          {/* content-img wrapper */}
          <div className={TechStyles[`content-img-wrapper`]}>
            {/* check window screen size/width and load img based on screen width */}
            <div className={TechStyles[`img-wrapper`]}>
              <img
                id="imgSelector"
                className={TechStyles[`imgElement`]}
                src={techStateData.techImg}
                alt={techStateData.imgText}
              />
            </div>
            {/* img wrapper */}
            {/* content tablist/tab/tapanel */}
            <div className={TechStyles[`content-wrapper`]}>
              {/* tablist */}
              <div
                onClick={techDataChange.bind({
                  pageData: props.techData,
                  arraysOfTechImgSrc: { landscapeImgSrc, portraitImgSrc },
                  stateObj: { techStateData, useTechState },
                })}
                aria-labelledby="tablist-3"
                role="tablist"
                onKeyDown={horizontalVerticalTabpanel}
                className={TechStyles[`tablist`]}
              >
                {/* tabs */}
                {/* launch vehicle */}
                <button
                  className={TechStyles[`techTab-btn`]}
                  data-index="0"
                  aria-label="launch vehicle"
                  role="tab"
                  aria-controls="tabpanel-0"
                  aria-selected="true"
                  id="tab-0"
                >
                  <span className={TechStyles[`tab-digit`]}>1</span>
                </button>
                {/* spaceport */}
                <button
                  className={TechStyles[`techTab-btn`]}
                  data-index="1"
                  aria-label="space port"
                  role="tab"
                  aria-controls="tabpanel-1"
                  aria-selected="false"
                  id="tab-1"
                >
                  <span className={TechStyles[`tab-digit`]}>2</span>
                </button>
                {/* space capsule */}
                <button
                  className={TechStyles[`techTab-btn`]}
                  data-index="2"
                  aria-label="space capsule"
                  role="tab"
                  aria-controls="tabpanel-2"
                  aria-selected="false"
                  id="tab-2"
                >
                  <span className={TechStyles[`tab-digit`]}>3</span>
                </button>
              </div>
              {/* tabpanel */}
              <div
                role="tabpanel"
                aria-labelledby={`tab-${techStateData.techIndex}`}
                id={`tabpanel-${techStateData.techIndex}`}
                className={TechStyles[`tabpanel`]}
              >
                {/* span */}
                <span className={TechStyles[`tabpanel-subheading`]}>
                  THE TERMINOLOGY ...
                </span>
                {/* title */}
                <h2 tabIndex="-1" className={TechStyles[`title`]}>
                  {techStateData.techName}
                </h2>
                {/* description */}
                <p className={TechStyles[`description`]}>
                  {techStateData.techDescription}
                </p>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>
    </React.Fragment>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      techData: data.technology,
    },
  };
}

function techDataChange(event) {
  if (
    event.target.closest("BUTTON") &&
    event.target.closest("BUTTON").getAttribute("aria-selected") == "false"
  ) {
    /**
     * remove event listener
     * **/
    const windowScreenSize = window.screen.width;
    // find button with aria-selected true
    const currentSelectTechPanel = document.querySelector(
      "[aria-selected='true']"
    );
    // change value of aria-selected to false for currentSelectTechPanel
    currentSelectTechPanel.setAttribute("aria-selected", "false");
    // change value of aria-selected of clicked button to true
    event.target.closest("BUTTON").getAttribute("aria-selected") == "false"
      ? event.target.closest("BUTTON").setAttribute("aria-selected", "true")
      : null;
    // get index
    const index = Number(
      event.target.closest("BUTTON").getAttribute("data-index")
    );
    // get img src based on html element screen width
    // if windowScreenSize is < 769 serve landscape img else serve portrait img
    const imgComponentSrc =
      windowScreenSize < 815
        ? this.arraysOfTechImgSrc.landscapeImgSrc[index]
        : this.arraysOfTechImgSrc.portraitImgSrc[index];
    // get data from json file
    const currentTechData = this.pageData[index];
    this.stateObj.useTechState((prevValues) => {
      return {
        ...prevValues,
        techIndex: index,
        techImg: imgComponentSrc,
        techName: currentTechData.name,
        techDescription: currentTechData.description,
        imgText: currentTechData.altText,
      };
    });
  }
}

export default TechPage;
