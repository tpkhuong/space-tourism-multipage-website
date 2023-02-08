import { storageObj } from "./storage";

export function horizontalVerticalTabpanel(event) {
  const [first, last] = getTabButtons(
    Array.from(document.querySelectorAll("[data-index]"))
  );

  // const [first, last] = this;
  /**
   *  left arrow || up arrow
   * **/

  if (event.code == "ArrowLeft" || event.code == "ArrowUp") {
    if (document.activeElement == first) {
      last.focus();
    } else {
      event.target.previousElementSibling.focus();
    }
  }

  /**
   *  right arrow || down arrow
   * **/
  if (event.code == "ArrowRight" || event.code == "ArrowDown") {
    if (document.activeElement == last) {
      first.focus();
    } else {
      event.target.nextElementSibling.focus();
    }
  }
  /**
   * hitting tab when focus btn has aria-selected = true will focus tabpanel title
   * **/

  if (!event.shiftKey) {
    if (
      event.code == "Tab" &&
      event.target.getAttribute("aria-selected") == "true"
    ) {
      //   get that btn data-index
      event.preventDefault();
      console.log("here");
      // use the value of data-index to select tabpanel with matches value
      const dataIndex = document.activeElement.getAttribute("data-index");
      const panelTitle = document.querySelector(
        `[id='tabpanel-${dataIndex}'] h2`
      );
      panelTitle.focus();
      //   if (event.target.getAttribute("aria-selected") == "true") {
      //     // event.preventDefault();
      //     // console.log("here");
      //     // // use the value of data-index to select tabpanel with matches value
      //     // const dataIndex = document.activeElement.getAttribute("data-index");
      //     // const panelTitle = document.querySelector(
      //     //   `[id='tabpanel-${dataIndex}'] h2`
      //     // );
      //     // panelTitle.focus();
      //   }
    }
  }
}

export function getTabButtons(array) {
  const firstBtn = array[0];
  const lastBtn = array[array.length - 1];
  return [firstBtn, lastBtn];
}
