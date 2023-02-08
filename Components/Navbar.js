import React from "react";
import Link from "next/link";
import NavStyles from "../styles/Navbar.module.css";
import { arrayOfLinkText } from "../src/storage";

function Navbar(props) {
  const { layout, currentPage } = props;

  return (
    <nav className={NavStyles.navbar} aria-label={layout} role="navigation">
      <ul className={NavStyles[`navlist`]} role="menubar">
        {arrayOfLinkText.map(function makeLink(element, index) {
          return (
            <li key={index} role="none" className={NavStyles[`navitem`]}>
              <Link href={index != 0 ? `/${element.toLowerCase()}` : "/"}>
                {element == currentPage ? (
                  <a
                    role="menuitem"
                    className={NavStyles[`navlink`]}
                    data-current="true"
                  >
                    <span
                      className={NavStyles[`link-digit`]}
                    >{`0${index}`}</span>
                    {element}
                  </a>
                ) : (
                  <a role="menuitem" className={NavStyles[`navlink`]}>
                    <span
                      className={NavStyles[`link-digit`]}
                    >{`0${index}`}</span>
                    {element}
                  </a>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
