document.querySelector("body").innerHTML =
  '<textarea readonly> </textarea> <div class="box"></div> <h2>Ctrl + X - CLEAR<h2><h2>Alt + Shift - TO CHANGE LANGUAGE <h2>';
export function createKeyboard(keysArray) {
  const keyCreate = keysArray
    .map((item) => {
      if (item == "Control") {
        return `<div class="key-element" data="${item}"><p>Ctrl</p></div>`;
      } else if (item == "Meta") {
        return `<div class="key-element" data="${item}"><p>Win</p></div>`;
      } else {
        return `<div class="key-element" data="${item}"><p>${item}</p></div>`;
      }
    })
    .join("");
  document.querySelector(".box").innerHTML = keyCreate;
}
