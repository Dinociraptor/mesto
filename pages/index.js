let page = document.querySelector ('.page')
let autor = page.querySelector ('.profile__autor');
let occupation = page.querySelector ('.profile__occupation');
let editButton = page.querySelector ('.profile__edit-button');
let addButton = page.querySelector ('.profile__add-button');
let editPopup = page.querySelector ('.popup_profile-edit');
let addPopup = page.querySelector ('.popup_profile-add');
let openedPopup = page.querySelector ('.popup_opened');
let closedPopup_edit = page.querySelector ('.popup__close_edit');
let closedPopup_add = page.querySelector ('.popup__close_add');

let profileAutor = page.querySelector('.profile__autor');
let profileOccupation = page.querySelector('.profile__occupation');
let formIntup = page.querySelector('.popup__input');

let cards = page.querySelector('.cards');

let addPlace = page.querySelector('.popup__input_place');
let addDescription = page.querySelector('.popup__input_description');
let addPicture = page.querySelector('.popup__input_picture');

// let like = page.querySelector ('.card__like');

// Функция добавление контента из профиля в попап
function editProfile() {
    formIntup.innerHTML =`<input class="popup__input-text popup__input_name" placeholder="Имя" type="text" value="${profileAutor.textContent}" required>
    <input class="popup__input-text popup__input_occupation" placeholder="Род занятий" type="text" value="${profileOccupation.textContent}" required>
    <input class="popup__input-submit" type="submit" value="Сохранить" >`
}

// Функция очистки попапа "Новое место" при открытии
function removePopupAdd() {
    addPlace.value = '';
    addDescription.value = '';
    addPicture.value = '';
}

// Функции открытия и закрытия попапов 
function openPopupEdit () {
    editPopup.setAttribute('class', 'popup popup_profile-edit');
    editProfile();
}
function closePopupEdit () {
    editPopup.setAttribute('class', 'popup popup_opened popup_profile-edit');
}

function openPopupAdd () {
    addPopup.setAttribute('class', 'popup popup_profile-add');
    removePopupAdd()
}
function closePopupAdd () {
    addPopup.setAttribute('class', 'popup popup_opened popup_profile-add');
}

// Функция редактирования профиля с помощью попапа
function formSubmitHandler (evt) {
	evt.preventDefault(); 
    closePopupEdit();
	let formAutor = page.querySelector('.popup__input_name');
	let formOccupation = page.querySelector('.popup__input_occupation');

    profileAutor.textContent = `${formAutor.value}`;
    profileOccupation.textContent = `${formOccupation.value}`;
}

// Функция добавления карточек
function addCard (event) {
    event.preventDefault(); 
    closePopupAdd ();

    cards.insertAdjacentHTML ('beforeend', `
    <div class="card">
        <img class="card__picture" src="${addPicture.value}" alt="${addDescription.value}">
        <div class="card__description">
            <p class="card__title">${addPlace.value}</p>
            <button class="card__like"></button>
        </div>
    </div>`
    )

}

// Функция активации "лайков"
// function activeLike() {
//     like.setAttribute ('class', 'card__like card__like_active');
// }


// Слушатели событий
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
closedPopup_edit.addEventListener('click', closePopupEdit);
closedPopup_add.addEventListener('click', closePopupAdd);
editPopup.addEventListener('submit', formSubmitHandler);
addPopup.addEventListener('submit', addCard);
// like.addEventListener('click', activeLike);


