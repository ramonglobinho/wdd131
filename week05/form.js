document.documentElement.style.setProperty('--bg-dark', '#121212');
document.documentElement.style.setProperty('--bg-darker', '#1e1e1e');
document.documentElement.style.setProperty('--text-light', '#e0e0e0');
document.documentElement.style.setProperty('--text-lighter', '#ffffff');
document.documentElement.style.setProperty('--accent-color', '#6d4cff');
document.documentElement.style.setProperty('--border-color', '#333');
document.documentElement.style.setProperty('--input-bg', '#2a2a2a');

const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];

document.addEventListener('DOMContentLoaded', function() {
    const productSelect = document.getElementById('product');
    
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id; 
        option.textContent = `${product.name} (${product.averagerating}★)`;  
        productSelect.appendChild(option);
    });

    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString();
});

document.getElementById('reviewForm').addEventListener('submit', function() {
    let reviewCount = localStorage.getItem('reviewCount') || 0;
    localStorage.setItem('reviewCount', ++reviewCount);
});