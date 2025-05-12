// Text rotation animation
class TxtRotate {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.isDeleting = false;
        this.tick();
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => this.tick(), delta);
    }
}

// Initialize text rotation
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.getElementsByClassName('txt-rotate');
    for (const element of elements) {
        const toRotate = element.getAttribute('data-rotate');
        const period = element.getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(element, JSON.parse(toRotate), period);
        }
    }

    // Add cursor animation
    const css = document.createElement('style');
    css.textContent = `
        .txt-rotate > .wrap {
            border-right: 0.08em solid #666;
            animation: blink 0.7s infinite;
        }
        @keyframes blink {
            50% { border-color: transparent; }
        }
    `;
    document.head.appendChild(css);

    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(34, 34, 34, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--dark-color)';
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

const abt = document.querySelector(".landing-page");

abt.addEventListener('click', goToLink);

function goToLink(event){
    const item = event.target;
    if(item.classList[1] === 'linkedin-btn'){
        window.open("https://in.linkedin.com/in/shefali-tripathi-529474167", "_blank");
    }

    if(item.classList[1] === 'git-btn'){
        window.open("https://github.com/sheftrip", "_blank");
    }
    
}
