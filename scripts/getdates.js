const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = today.getFullYear();

const alter = document.querySelector("#lastModified")
let oLast = new Date(document.lastModified);
alter.innerHTML = oLast;
