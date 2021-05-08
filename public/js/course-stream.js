var i = 1;
function addNext(){
  var element = document.querySelector(".container-4");
  element.parentNode.removeChild(element);
  const div4 = document.createElement('div');
  div4.className = 'container-6'
  const div0 = document.createElement('div');
  div0.className = 'container-2';
  i++;
  div0.innerHTML = `
  <p>Week ${i} : </p>
    `;
  const div = document.createElement('div');
  div.className = 'container-5';
  div.innerHTML = `
  <textarea name="message" id="message" type="text"></textarea>
    `;
  const div1 = document.createElement('div');
  div1.className = 'container-5';
  div1.innerHTML = `
  <input type="submit" value="Submit" onclick="writeWeek()" id="input-submit">
  `;
  document.querySelector('.container').appendChild(div4);
  document.querySelector('.container-6').appendChild(div0);
  document.querySelector('.container-6').appendChild(div);
  document.querySelector('.container-6').appendChild(div1);
  window.scrollBy(0,300);
  console.log("Hello World")
}  
function writeWeek(){
  const div0 = document.createElement('div');
  div0.className = 'container-2';
  div0.innerHTML = `
  <p>Week ${i} : </p>
    `;
  document.querySelector('.container').appendChild(div0);
  const message = document.getElementById("message");
  console.log(message.value);
  const div = document.createElement('div');
  div.className = 'container-1';
  div.innerHTML = `
  <p>${message.value}</p>
    `;
  document.querySelector('.container').appendChild(div);
  const hrtag = document.getElementById("hrtag");
  document.querySelector('.container').appendChild(hrtag);
  var element = document.querySelector(".container-6");
  element.parentNode.removeChild(element);
  const div3 = document.createElement('div');
  div3.className = 'container-4';
  div3.innerHTML = `
  <input type="submit" value="Add" onclick="addNext()">
    `;
  document.querySelector('.container').appendChild(div3);
}