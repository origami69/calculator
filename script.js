const para = document.createElement('p');
para.textContent = 'I am HK416, please remember this name';
para.style.color = 'red';
document.querySelector('body').appendChild(para);
const head = document.createElement('h3');
head.innerText = 'Dont Simp';
head.style.color = 'blue';
document.querySelector('body').appendChild(head);
const container = document.createElement('div');
const pc = document.createElement('p');
const hc = document.createElement('h1');
container.appendChild(pc);
container.appendChild(hc);
pc.textContent = 'free me im stuck in a div'
hc.innerText = 'No Stfu'
document.querySelector('body').appendChild(container)