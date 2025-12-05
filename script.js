// --- SEPET MANTIĞI (Javascript) ---
// (Taşındı: fonksiyonlar global bırakıldı böylece inline onclick çağrıları çalışmaya devam eder)

let cart = [];

// Sayfa Değiştirme Fonksiyonu
function switchPage(pageId) {
    document.querySelectorAll('main section').forEach(sec => sec.classList.remove('active-page'));
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.classList.add('active-page');
    }
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    const activeLink = document.getElementById('nav-' + pageId);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    window.scrollTo(0, 0);
}

// Header Scroll Efekti
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Ürün ekleme fonksiyonu
function addToCart(title, price, image) {
    const existingItem = cart.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            title: title,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCartIcon();
    toggleCart(); // Sepete ekleyince otomatik aç
}

// Sepet ikonundaki sayıyı güncelle
function updateCartIcon() {
    const countSpan = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (countSpan) {
        countSpan.innerText = totalItems;
        
        if (totalItems > 0) {
            countSpan.classList.add('show');
        } else {
            countSpan.classList.remove('show');
        }
    }
}

// Sepet Penceresini Aç/Kapa (X butonu bunu tetikler)
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    const isOpen = modal.classList.contains('open');
    
    if (!isOpen) {
        renderCartItems(); // Açarken sepeti çiz
        modal.classList.add('open');
    } else {
        modal.classList.remove('open'); // Sepeti kapatır
    }
}

// Sepet içeriğini HTML'e dök
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalSpan = document.getElementById('cart-total');
    if (!container || !totalSpan) return;
    
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; margin-top:50px; color:#999;">Your cart is empty.</p>';
        totalSpan.innerText = "$0.00";
        return;
    }

    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const html = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}"> 
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-qty">Qty: ${item.quantity}</div>
                </div>
                <div style="font-weight:600;">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
        container.innerHTML += html;
    });

    totalSpan.innerText = "$" + total.toFixed(2);
}

// Sipariş Ver Butonu
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    alert("Your order is on its way! 🚚");
    
    cart = [];
    updateCartIcon();
    toggleCart(); // Sepeti kapat
}

// (İsteğe bağlı) sayfa yüklendiğinde ikon güncellemesi
document.addEventListener('DOMContentLoaded', () => {
    updateCartIcon();
});