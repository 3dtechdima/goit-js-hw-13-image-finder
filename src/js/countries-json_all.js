import country from '../templates/img-card.hbs';
const form = document.querySelector('.search-form');
const nextImg = document.querySelector('.next-page-btn');
const outputParametiers = document.querySelector('.gallery');
// console.log(nextImg);

let userValue = '';
let counterValue = 1;

async function nextPage() {
  counterValue += 1;
  const data = await getData();
  appendImages(data);
}

const getImg = inputTextImg => {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputTextImg}&page=${nextPage}&per_page=12&key=23310920-d081bc49b0dbcec0d7d3e38c7`,
  )
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
};

async function getData() {
  const data = await getImg(userValue);
  return data;
}

async function selectAnswer(e) {
  e.preventDefault();
  const userValue = e.currentTarget.elements.query.value;
  if (!userValue) {
    return;
  }
  counterValue = 1;
  const data = await getData();
  addImages(data);
}

function addImages(data) {
  const markup = country(data.hits);
  outputParametiers.innerHTML = markup;
}

function appendImages(data) {
  const markup = country(data.hits);
  outputParametiers.insertAdjacentHTML('beforeend', markup);
}

form.addEventListener('submit', selectAnswer);
nextImg.addEventListener('click', nextPage);
