import React, { useState } from "react";
import { storageObj } from "../src/storage";
import Head from "next/head";
import Image from "next/image";
import Moon from "../public/images/destination/image-moon.png";
import Mars from "../public/images/destination/image-mars.png";
import Europa from "../public/images/destination/image-europa.png";
import Titan from "../public/images/destination/image-titan.png";
import DestStyles from "../styles/Destination.module.css";
import data from "../src/data.json";
import Header from "../Components/Header";
import SectionWrapper from "../Components/SectionWrapper";
import { horizontalVerticalTabpanel } from "../src/helperFunc";

function Destinations(props) {
  /**
   * reset storage.count to 0 when user click to home, destinations, or crew page
   * **/

  storageObj.count = storageObj.count > 0 ? 0 : storageObj.count;
  const arrayOfImgComponents = [Moon, Mars, Europa, Titan];
  const initialData = props.destinations[0];
  const dataObj = {
    imgSrc: arrayOfImgComponents[0],
    tabIndex: 0,
    panelTitle: initialData.name,
    panelDescription: initialData.description,
    panelDistance: initialData.distance,
    panelTravel: initialData.travel,
    imgText: initialData.altText,
  };

  const [stateData, useStateData] = useState(dataObj);

  return (
    <React.Fragment>
      <Head>
        <title>Pick Your Destination</title>
        <link
          rel="shortcut icon"
          href="/images/favicon-32x32.png"
          type="image/x-icon"
        />
        ;
      </Head>
      {/* <div className="app" id="destination">
      </div> */}
      <SectionWrapper idAttr="destination">
        <Header activeEffect="DESTINATION" />
        {/* title-content-img-wrapper */}
        <section className={DestStyles[`title-content-img-wrapper`]}>
          {/* title wrapper */}
          <div className={DestStyles[`title-wrapper`]}>
            <h1 className={DestStyles[`page-title`]}>
              <span className={DestStyles[`page-title-digit`]}>01</span> PICK
              YOUR DESTINATION
            </h1>
          </div>
          {/* content and img wrapper */}
          <div className={DestStyles[`content-img-wrapper`]}>
            {/* img wrapper */}
            <div className={DestStyles[`img-wrapper`]}>
              <Image src={stateData.imgSrc} alt={stateData.imgText} />
            </div>
            {/* content, tab and tabpanel */}
            <div className={DestStyles[`content-wrapper`]}>
              {/* tablist */}
              <div
                onClick={changeTabpanelContent.bind({
                  appData: props.destinations,
                  arrOfImgComp: arrayOfImgComponents,
                  ourState: {
                    stateData,
                    useStateData,
                  },
                })}
                role="tablist"
                onKeyDown={horizontalVerticalTabpanel}
                // aria-labelledby="tablist-1"
                className={DestStyles[`tablist-wrapper`]}
              >
                {/* moon */}
                {/* button aria-controls will match the value of the tabpanel id */}
                <button
                  className={DestStyles[`tab-wrapper`]}
                  data-index="0"
                  role="tab"
                  aria-selected="true"
                  aria-controls="tabpanel-0"
                  id="tab-0"
                >
                  <span className={DestStyles[`bottom-line`]}>MOON</span>
                </button>
                {/* mars */}
                <button
                  className={DestStyles[`tab-wrapper`]}
                  data-index="1"
                  role="tab"
                  aria-selected="false"
                  aria-controls="tabpanel-1"
                  id="tab-1"
                >
                  <span className={DestStyles[`bottom-line`]}>MARS</span>
                </button>
                {/* europa */}
                <button
                  className={DestStyles[`tab-wrapper`]}
                  data-index="2"
                  role="tab"
                  aria-selected="false"
                  aria-controls="tabpanel-2"
                  id="tab-2"
                >
                  <span className={DestStyles[`bottom-line`]}>EUROPA</span>
                </button>
                {/* titan */}
                <button
                  className={DestStyles[`tab-wrapper`]}
                  data-index="3"
                  role="tab"
                  aria-selected="false"
                  aria-controls="tabpanel-3"
                  id="tab-3"
                >
                  <span className={DestStyles[`bottom-line`]}>TITAN</span>
                </button>
              </div>
              {/* tabpanel */}
              {/* tabpanel name will come from the button element with matching value of the button id attr and tabpanel aria-labelledby */}
              <div
                role="tabpanel"
                aria-labelledby={`tab-${stateData.tabIndex}`}
                id={`tabpanel-${stateData.tabIndex}`}
                className={DestStyles[`tabpanel`]}
              >
                {/* title */}
                <h2 tabIndex="-1" className={DestStyles[`title`]}>
                  {stateData.panelTitle}
                </h2>
                {/* description */}
                <p className={DestStyles[`description`]}>
                  {stateData.panelDescription}
                </p>
                {/* distance and travel */}
                <div className={DestStyles[`distance-travel-wrapper`]}>
                  <div className={DestStyles[`distance`]}>
                    <span className={DestStyles[`text`]}>AVG. DISTANCE</span>
                    <span className={DestStyles[`digit`]}>
                      {stateData.panelDistance}
                    </span>
                  </div>
                  <div className={DestStyles[`travel`]}>
                    <span className={DestStyles[`text`]}>EST. TRAVEL TIME</span>
                    <span className={DestStyles[`digit`]}>
                      {stateData.panelTravel}
                    </span>
                  </div>
                </div>
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
      destinations: data.destinations,
    },
  };
}

function changeTabpanelContent(event) {
  // if user click on current selected button do nothing

  if (
    event.target.closest("BUTTON") &&
    event.target.closest("BUTTON").getAttribute("aria-selected") == "false"
  ) {
    const currentSelectedPanel = document.querySelector(
      "[aria-selected='true']"
    );
    // change value of aria-selected to false for currentSelectedPanel
    currentSelectedPanel.getAttribute("aria-selected") == "true"
      ? currentSelectedPanel.setAttribute("aria-selected", "false")
      : null;
    // change value of aria-selected of clicked button to true
    event.target.closest("BUTTON").getAttribute("aria-selected") == "false"
      ? event.target.closest("BUTTON").setAttribute("aria-selected", "true")
      : null;

    const index = Number(
      event.target.closest("BUTTON").getAttribute("data-index")
    );
    const getOurDataFromProp = this.appData[index];
    const ourImgComponent = this.arrOfImgComp[index];

    this.ourState.useStateData((prevValues) => {
      return {
        ...prevValues,
        imgSrc: ourImgComponent,
        tabIndex: index,
        panelTitle: getOurDataFromProp.name,
        panelDescription: getOurDataFromProp.description,
        panelDistance: getOurDataFromProp.distance,
        panelTravel: getOurDataFromProp.travel,
        imgText: getOurDataFromProp.altText,
      };
    });
  }
}

export default Destinations;
