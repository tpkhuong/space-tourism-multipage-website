import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import HeaderStyles from "../styles/Header.module.css";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener("change", (event) => updateTarget(event));

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () =>
      media.removeEventListener("change", (event) => updateTarget(event));
  }, []);

  return targetReached;
};

function Header(props) {
  const { activeEffect } = props;
  const isBreaking = useMediaQuery(768);
  return (
    <header className={HeaderStyles[`top-parent`]}>
      {/* svg logo */}
      <div className={HeaderStyles[`logo-wrapper`]}>
        <Link href="/">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
              <g fill="none" fillRule="evenodd">
                <circle cx="24" cy="24" r="24" fill="#FFF" />
                <path
                  fill="#0B0D17"
                  d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"
                />
              </g>
            </svg>
          </a>
        </Link>
      </div>
      {/* mobile icon/modal wrapper */}
      <div className={HeaderStyles[`mobile-icon-modal-wrapper`]}>
        <button
          aria-label="open mobile navigation"
          onClick={openModalNav}
          data-show-modal="false"
          className={HeaderStyles[`open-menu-btn`]}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
            <g fill="#D0D6F9" fillRule="evenodd">
              <path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
            </g>
          </svg>
        </button>
        <div
          onKeyDown={modalTabThroughLinks}
          className={HeaderStyles[`modal-wrapper`]}
          aria-modal="true"
          role="dialog"
        >
          <button
            aria-label="close mobile navigation"
            id="close"
            onClick={closeModalNav}
            className={HeaderStyles[`close-menu-btn`]}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21">
              <g fill="#D0D6F9" fillRule="evenodd">
                <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
                <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
              </g>
            </svg>
          </button>
          {/* better to build navbar inside our header instead of using component */}
          {/* because every time our page renders it will run Navbar component twice */}
          {isBreaking ? (
            <Navbar layout="secondary" currentPage={activeEffect} />
          ) : null}
        </div>
      </div>
      {/* desktop/tablet nav */}
      <Navbar layout="primary" currentPage={activeEffect} />
    </header>
  );
}

function openModalNav(event) {
  const closeBtnElement = document.querySelector("[id='close']");

  // ontouchend and onkeyup
  event.target.closest("BUTTON").setAttribute("data-show-modal", "true");
  closeBtnElement.focus();
}

function closeModalNav(event) {
  const openMenuBtn = document.querySelector("[data-show-modal]");
  if (event.target.closest("BUTTON")) {
    openMenuBtn.getAttribute("data-show-modal") == "true"
      ? openMenuBtn.setAttribute("data-show-modal", "false")
      : null;
  }
  openMenuBtn.focus();
}

function modalTabThroughLinks(event) {
  const firstItem = document.querySelector("[id='close']");
  const lastItem = document.querySelector(
    "[aria-label='secondary'] a[href='/technology']"
  );
  if (event.shiftKey) {
    event.code == "Tab" && document.activeElement == firstItem
      ? (lastItem.focus(), event.preventDefault())
      : null;
  } else {
    event.code == "Tab" && document.activeElement == lastItem
      ? (firstItem.focus(), event.preventDefault())
      : null;
  }
}

export default Header;
