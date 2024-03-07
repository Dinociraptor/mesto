const initialCards = [
    {
      name: 'Байкал',
      link: 'images/baikal.png',
      alt: 'Берег озера Байкал'
    },
    {
      name: 'Белуха',
      link: 'images/beluha.png',
      alt: 'Озеро на фоне горы Белухи'
    },
    {
      name: 'Ергаки',
      link: 'images/ergaki.png',
      alt: 'Природный заповедник Ергаки'
    },
    {
      name: 'Камчатка',
      link: 'images/kamchatka.png',
      alt: 'Цветы на Камчатке'
    },
    {
      name: 'Карелия',
      link: 'images/karelia.png',
      alt: 'Озеро в Карелии'
    },
    {
      name: 'Токаревский маяк',
      link: 'images/tokarev.png',
      alt: 'Вид на Токаревский маяк'
    }
  ];


const page = document.querySelector ('.page');
const autor = page.querySelector ('.profile__autor');
const avatar = page.querySelector('.profile__avatar');
const occupation = page.querySelector ('.profile__occupation');
const editButton = page.querySelector ('.profile__edit-button');
const formAutor = page.querySelector('.popup__input_name');
const formOccupation = page.querySelector('.popup__input_occupation');
const formAvatar = page.querySelector('.popup__input_avatar');

const addButton = page.querySelector ('.profile__add-button');
const addPlace = page.querySelector('.popup__input_place');
const addDescription = page.querySelector('.popup__input_description');
const addPicture = page.querySelector('.popup__input_picture');

const editPopup = page.querySelector ('.popup_profile-edit');
const addPopup = page.querySelector ('.popup_profile-add');
const imgPopup  = page.querySelector ('.popup_image');
const openedPopup = page.querySelector ('.popup_opened');

const closedPopup_edit = page.querySelector ('.popup__close_edit');
const closedPopup_add = page.querySelector ('.popup__close_add');
const closedPopup_img = page.querySelector('.popup__close_image');

const cards = page.querySelector('.cards');


// Функция добавление контента из профиля в попап "Редактировать профиль"
function editProfile() {
  formAutor.value = autor.textContent;
  formOccupation.value = occupation.textContent;
}

// Функция очистки попапа "Новое место" при открытии
function removePopupAdd() {
    addPlace.value = '';
    addDescription.value = '';
    addPicture.value = '';
}

// Функции открытия и закрытия попапов 
function openPopup(namePopup) {
  namePopup.classList.remove('popup_opened');
}
function closePopup(namePopup) {
  namePopup.classList.add('popup_opened');
}


// Функция редактирования профиля с помощью попапа
function formSubmitHandler (evt) {
	evt.preventDefault(); 
  closePopup(editPopup);
    autor.textContent = `${formAutor.value}`;
    occupation.textContent = `${formOccupation.value}`;
    avatar.src = `${formAvatar.value ? formAvatar.value: '/mesto/images/image.png'}`
}

//Функция добавления карточек 
function addCard(name, link, alt) {
  const cardTemplate = page.querySelector('#card-template').content; 
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); 
  const cardPicture = cardElement.querySelector('.card__picture');
  const cardTitle = cardElement.querySelector('.card__title');

  cardTitle.textContent = name;
  cardPicture.src = link;
  cardPicture.alt = alt;

  // Функция активации "лайков"
  cardElement.querySelector ('.card__like').addEventListener('click', evt => evt.target.classList.toggle('card__like_active'));
  
  // Функция удаления карточки
  function removeCard(){ 
    this.parentElement.remove();
  }
  cardElement.querySelector('.card__trash').addEventListener('click', removeCard);
    
  // Наделяем картинки возможностью отслеживать клики
  cardPicture.addEventListener('click', () => openPopup(imgPopup));
  
  // Функция передачи картинки в попап
  function enlargePicture () { 
    imgPopup.querySelector('.popup__picture').setAttribute('src', cardPicture.getAttribute('src'));
    imgPopup.querySelector('.popup__description').textContent = cardTitle.textContent;
  }
 
  // Вызов функции передачи картинки в попап
  cardPicture.addEventListener('click',enlargePicture);
  return cardElement;
}

// Функция заполнения станицы первоначальным контентом
function fillInitialCards(){
  initialCards.forEach(function (element) {
    cards.append(addCard(element.name, element.link, element.alt));
  })
}
// Вызов функции заполнения станицы первоначальным контентом
fillInitialCards();

// Функция добавления новых карточек
function addNewCard(event) {
  event.preventDefault(); 
  cards.prepend(addCard(addPlace.value, addPicture.value, addDescription.value));
  closePopup(addPopup);
}

// Слушатели событий
editButton.addEventListener('click', () => {openPopup(editPopup);editProfile()});
addButton.addEventListener('click', () => {openPopup(addPopup);removePopupAdd()});

closedPopup_edit.addEventListener('click', () => closePopup(editPopup));
closedPopup_add.addEventListener('click', () => closePopup(addPopup));
closedPopup_img.addEventListener ('click', () => closePopup(imgPopup));
editPopup.addEventListener('submit', formSubmitHandler);
addPopup.addEventListener('submit', addNewCard);







