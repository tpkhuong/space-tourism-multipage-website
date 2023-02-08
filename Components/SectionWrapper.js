import React from "react";
import SectionStyles from "../styles/SectionWrapper.module.css";

function SectionWrapper(props) {
  const { idAttr, children } = props;
  return (
    <React.Fragment>
      <div className={SectionStyles.app} id={idAttr}>
        {children}
      </div>
    </React.Fragment>
  );
}

export default SectionWrapper;
