document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const errorMessage = document.getElementById('error-message');
    const sortSelect = document.getElementById('sort-select');
    const backHomeBtn = document.getElementById('back-home');
    const brandFilter = document.getElementById('brand-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const applyFiltersBtn = document.getElementById('apply-filters');

    let currentProducts = [];
    let allBrands = [];

    
    fetchProducts();

  
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
                currentProducts = data.products || data;
                
                allBrands = Array.from(new Set(currentProducts.map(p => p.brand))).filter(Boolean);
                updateBrandFilter();
                sortAndDisplayProducts();
            })
            .catch(() => {
                productsContainer.innerHTML = '<p>Failed to fetch products.</p>';
            });
    }

    function updateBrandFilter() {
    
        if (!allBrands.length) return;
        brandFilter.innerHTML = '<option value="all">All Brands</option>' +
            allBrands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
    }

    applyFiltersBtn.addEventListener('click', function() {
        sortAndDisplayProducts();
    });

    function sortAndDisplayProducts() {
        let filteredProducts = [...currentProducts];
        
        const selectedBrand = brandFilter.value;
        if (selectedBrand && selectedBrand !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.brand === selectedBrand);
        }
       
        const minPrice = parseFloat(minPriceInput.value);
        const maxPrice = parseFloat(maxPriceInput.value);
        if (!isNaN(minPrice)) {
            filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
        }
        if (!isNaN(maxPrice)) {
            filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
        }
      
        if (sortSelect.value === 'asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortSelect.value === 'desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (sortSelect.value === 'rating-asc') {
            filteredProducts.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        } else if (sortSelect.value === 'rating-desc') {
            filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }
        displayProducts(filteredProducts);
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
                <div class="product-rating">⭐ ${product.rating || 'N/A'}</div>
            </div>
        `).join('');
    }
});
