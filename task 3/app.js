document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const errorMessage = document.getElementById('error-message');
    const sortSelect = document.getElementById('sort-select');
    const backHomeBtn = document.getElementById('back-home');

    let currentProducts = [];

    // Fetch and display all products on load
    fetchProducts();

    // Search form submit handler
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        errorMessage.textContent = '';
        if (!query) {
            errorMessage.textContent = 'Search field cannot be empty!';
            return;
        }
        fetchProducts(query);
        backHomeBtn.style.display = 'inline-block';
    });

    backHomeBtn.addEventListener('click', function() {
        searchInput.value = '';
        fetchProducts();
        backHomeBtn.style.display = 'none';
    });

    // Sorting handler
    sortSelect.addEventListener('change', function() {
        sortAndDisplayProducts();
    });

    function fetchProducts(query = '') {
        let url = 'https://dummyjson.com/products';
        if (query) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
        }
        fetch(url)
            .then(res => res.json())
            .then(data => {
                currentProducts = data.products || data; // API returns {products:[]}
                sortAndDisplayProducts();
            })
            .catch(() => {
                productsContainer.innerHTML = '<p>Failed to fetch products.</p>';
            });
    }

    function sortAndDisplayProducts() {
        let sortedProducts = [...currentProducts];
        if (sortSelect.value === 'asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortSelect.value === 'desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        displayProducts(sortedProducts);
    }

    function displayProducts(products) {
        if (!products.length) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        productsContainer.innerHTML = products.map(product => `
            <div class="product-card">
                <img src="${product.thumbnail || product.image || ''}" alt="${product.title || product.name}" />
                <div class="product-title">${product.title || ''}</div>
                <div class="product-name">${product.name || ''}</div>
                <div class="product-price">$${product.price || ''}</div>
            </div>
        `).join('');
    }
});
