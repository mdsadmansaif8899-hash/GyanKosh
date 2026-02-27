window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// নেভিগেশন স্ক্রল
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // ব্যাক টু টপ বাটন
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// মোবাইল মেনু টগল
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        navMenu.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        navMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// সার্চ টগল
function toggleSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    searchOverlay.classList.toggle('active');
    
    if (searchOverlay.classList.contains('active')) {
        document.getElementById('searchInput').focus();
    }
}

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
}

// থিম টগল
function toggleTheme() {
    const body = document.body;
    const icon = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('light-theme');
    
    if (body.classList.contains('light-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// লগইন পপআপ
function showLoginPopup() {
    document.getElementById('loginPopup').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLoginPopup() {
    document.getElementById('loginPopup').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ট্যাব সুইচ
function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        document.getElementById('loginTab').classList.add('active');
    } else {
        tabs[1].classList.add('active');
        document.getElementById('signupTab').classList.add('active');
    }
}

// চ্যাটবট
function openChatbot() {
    window.location.href = 'pages/chatbot.html';
}

// স্ক্রল টু টপ
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// কাউন্টার অ্যানিমেশন
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// ইন্টারসেকশন অবজারভার
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // কাউন্টার স্টার্ট
            if (entry.target.classList.contains('hero-stats')) {
                animateCounter();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// সার্চ ফাংশন
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    const results = document.getElementById('searchResults');
    
    if (query.length < 2) {
        results.innerHTML = '';
        return;
    }
    
    // সার্চ ফলাফল দেখান
    results.innerHTML = '<div class="searching">সার্চ করা হচ্ছে...</div>';
    
    // এজে
