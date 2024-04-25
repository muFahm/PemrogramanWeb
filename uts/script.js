// Fungsi untuk menghasilkan ID unik
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Fungsi untuk menambahkan data user ke local storage
function addUserToLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

// Fungsi untuk menambahkan data barang ke local storage
function addProductToLocalStorage(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

// Fungsi untuk melakukan login
function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'catalog.html';
    } else {
        alert('Email atau password salah');
    }
}

// Fungsi untuk melakukan registrasi
function register(email, username, password, address) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailExists = users.some(u => u.email === email);
    if (isEmailExists) {
        alert('Email sudah terdaftar');
        return;
    }
    const newUser = { id: generateId(), email, username, password, address };
    addUserToLocalStorage(newUser);
    alert('Registrasi berhasil');
    window.location.href = 'index.html';
}

// Fungsi untuk menambahkan barang baru
function addProduct(name, year, category, model, quantity, price) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        const product = { id: generateId(), name, year, category, model, quantity, price };
        addProductToLocalStorage(product);
        alert('Barang berhasil ditambahkan');
        window.location.href = 'catalog.html';
    } else {
        alert('Anda harus login terlebih dahulu');
        window.location.href = 'index.html';
    }
}

// Fungsi untuk menampilkan katalog produk
function displayProductCatalog() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.year}</td>
            <td>${product.category}</td>
            <td>${product.model}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        `;
        productList.appendChild(row);
    });
}

// Fungsi untuk melakukan pencarian barang
function searchProduct(keyword) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    filteredProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.year}</td>
            <td>${product.category}</td>
            <td>${product.model}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
        `;
        productList.appendChild(row);
    });
}

// Fungsi untuk pindah ke halaman tambah barang
function goToAddProduct() {
    window.location.href = 'add_product.html';
}

// Implementasi logika lainnya sesuai kebutuhan

// Ketika halaman dimuat, cek apakah ada user yang sudah login
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
        displayProductCatalog();
    } else {
        window.location.href = 'index.html';
    }
});

// Event listener untuk form pencarian
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = document.getElementById('searchInput').value.trim();
    searchProduct(keyword);
});

// Event listener untuk form tambah barang
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('productName').value.trim();
    const year = document.getElementById('year').value.trim();
    const category = document.getElementById('category').value.trim();
    const model = document.getElementById('model').value.trim();
    const quantity = document.getElementById('quantity').value.trim();
    const price = document.getElementById('price').value.trim();
    addProduct(name, year, category, model, quantity, price);
});
