const items = [{
        title: "Соевая свеча в банке",
        description: "Объём: 50 мл.",
        tags: ["jar"],
        price: 15,
        img: "./img/1.jpeg",
        rating: 4.4,
    },
    {
        title: "Соевая свеча в стакане с дубовой крышкой",
        description: "Объём: 300 мл.",
        tags: ["glassful"],
        price: 55,
        img: "./img/2.jpeg",
        rating: 3.1,
    },
    {
        title: "Диффузор для машины",
        description: "Объём: 300 мл.",
        tags: ["diffuser"],
        price: 20,
        img: "./img/3.jpeg",
        rating: 5.0,
    },
    {
        title: "Аромадиффузор с дубовой крышкой",
        description: "Объём: 300 мл.",
        tags: ["diffuser"],
        price: 50,
        img: "./img/4.jpeg",
        rating: 4.7,
    },
    {
        title: "Соевая свеча в гипсе",
        description: "Объём: 300 мл.",
        tags: ["gypsum"],
        price: 50,
        img: "./img/5.jpeg",
        rating: 4.9,
    },
    {
        title: "Соевая свеча в бетоне с дубовой крышкой",
        description: "Объём: 370 мл.",
        tags: ["concreate"],
        price: 80,
        img: "./img/6.jpeg",
        rating: 3.2,
    },
    {
        title: "Соевая свеча в бетоне",
        description: "Объём: 370 мл.",
        tags: ["concreate"],
        price: 75,
        img: "./img/7.jpeg",
        rating: 3.9,
    },
    {
        title: "Сет из 4-х свечей",
        description: "Объём 40 мл.",
        tags: ["set"],
        price: 55,
        img: "./img/8.jpeg",
        rating: 3.4,
    },
    {
        title: "Соевая свеча в бетоне",
        description: "Объём 150 мл.",
        tags: ["concrete"],
        price: 40,
        img: "./img/9.jpeg",
        rating: 4.8,
    },
    {
        title: "Соевая свеча в бетоне белого цвета",
        description: "Объём 150 мл.",
        tags: ["concrete"],
        price: 30,
        img: "./img/10.jpeg",
        rating: 3.2,
    },
    {
        title: "Соевая свеча в стакане с дубовой крышкой",
        description: "Объём 230 мл.",
        tags: ["cat", "glassful"],
        price: 50,
        img: "./img/11.jpeg",
        rating: 3.7,
    },
    {
        title: "Сет из 3-х свечей",
        description: "Объём 100 мл.",
        tags: ["set"],
        price: 70,
        img: "./img/12.jpeg",
        rating: 4.1,
    },
];

const itemsContainer = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

function prepareShopItem(shopItem) {

    const { title, description, tags, img, price, rating } = shopItem;

    const item = itemTemplate.content.cloneNode(true);
    item.querySelector('h1').textContent = title;
    item.querySelector('p').textContent = description;
    item.querySelector('img').src = img;
    item.querySelector('.price').textContent = `${price} рублей`;


    const ratingContainer = item.querySelector('.rating');

    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
    });

    return item;
}

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = '';
    itemsContainer.innerHTML = '';
    arr.forEach((item) => {
        itemsContainer.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = 'Ничего не найдено';
    }
}

renderItems(currentState);

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector('#sort');
sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
        case 'expensive':
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case 'cheap':
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case 'rating':
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case 'alphabet':
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
});

const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();
    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );
    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}

searchButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);