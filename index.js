// Затрудняюсь, Не смогу прийти, Смогу / сможем

let container = document.querySelector('#root')
let counter = document.querySelector('#counter')
console.log(container);
let arr = []
const getData = () => {
  fetch('https://636a27e5b10125b78fd2189a.mockapi.io/shoes')
  .then(resp => resp.json())
  .then(data => {
    console.log(data);
    let card = ''
    data.map(item => {
      card += cardFunc(item);
    });
    container.innerHTML = card
    counter.innerText = data.length
  })
} 
getData() 

const getColor = (status) => {
  if (status.includes('Затрудняюсь')) {
    return 'purple'
  } else if (status.includes('Смогу')) {
    return 'green'
  } else if (status.includes('Не смогу')) {
    return 'red'
  } 
}

function cardFunc (item) {
  return `
  <div class="guest" style="border-color: ${getColor(item.status)}">
      <p>${item.name}</p>
      <p style="color: ${getColor(item.status)}">${item.status}</p>
      <button onclick="handleDel(${item.id})">delete</button>
  </div>
  `
}

const handleDel = (id) => {
  fetch(
    `https://636a27e5b10125b78fd2189a.mockapi.io/shoes/${id}`, {
      method: "DELETE"
    })
  alert("user deleted");
  location.reload()
}

const btns = document.querySelectorAll('.filter')
btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    let status = e.target.innerText
    console.log(status);
    
    fetch(`https://636a27e5b10125b78fd2189a.mockapi.io/shoes`)
    .then(resp => resp.json())
    .then(data => {
      let card = ''
      data.filter(item => {
        if(item.status.includes(status)) {
          card += cardFunc(item);
        }
      });
      if (status === 'все') {
        data.map(item => {
          card += cardFunc(item);
        });
        
      }
      container.innerHTML = card
      counter.innerText = data.length
    })
  })
})
