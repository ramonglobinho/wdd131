const input = document.querySelector("#favchap");
const button = document.querySelector('button');
const list = document.querySelector('lista');

const li = document.createElement('li');
const del = document.createElement('button');

li.textContent = input.value;
del.textContent= 'X';

li.append(del);
list.append(li);