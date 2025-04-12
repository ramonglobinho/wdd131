const year = document.querySelector("#currentyear");
const today = new Date();
year.innerHTML = today.getFullYear();

const alter = document.querySelector("#lastModified")
let oLast = new Date(document.lastModified);
alter.innerHTML = oLast;

const menuButton = document.getElementById("menu-button");
const primaryNav = document.getElementById("primary-nav");

menuButton.addEventListener("click", () => {
    primaryNav.classList.toggle("open");
});

const temples = [
    {
        templeName: "Belo Horizonte Brazil Temple",
        location: "Belo Horizonte, Brazil",
        dedicated: "2022, November, 20",
        area: 2.664,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/belem-brazil-temple/belem-brazil-temple-31310-main.jpg"    
    },
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
  ];

  function createTempleCards() {
    const picsContainer = document.querySelector('.pics');
    
    temples.forEach(temple => {
        const card = document.createElement('div');
        card.className = 'temple-card';
        
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <div class="temple-info">
                <h2>${temple.templeName}</h2>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </div>
        `;
        
        picsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', createTempleCards);

function filterTemples(criteria) {
    const currentYear = today.getFullYear();
    
    switch(criteria) {
        case 'Old':
            return temples.filter(temple => {
                const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
                return dedicatedYear < 1900;
            });
        case 'New':
            return temples.filter(temple => {
                const dedicatedYear = parseInt(temple.dedicated.split(',')[0]);
                return dedicatedYear >= 2000;
            });
        case 'Large':
            return temples.filter(temple => temple.area > 90000);
        case 'Small':
            return temples.filter(temple => temple.area < 10000);
        case 'Home':
        default:
            return temples;
    }
}

function createTempleCards(filteredTemples) {
    const picsContainer = document.querySelector('.pics');
    picsContainer.innerHTML = ''; 
    
    filteredTemples.forEach(temple => {
        const card = document.createElement('div');
        card.className = 'temple-card';
        
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <div class="temple-info">
                <h2>${temple.templeName}</h2>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </div>
        `;
        
        picsContainer.appendChild(card);
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('#primary-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filterCriteria = e.target.textContent;
            const filteredTemples = filterTemples(filterCriteria);
            createTempleCards(filteredTemples);
            
            primaryNav.classList.remove('open');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createTempleCards(temples); 
    setupNavigation();
});
