// Confetti Animation (Improved)
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiPieces = [];
const confettiColors = ['#ff69b4', '#ff8e8e', '#7b68ee', '#ff1493', '#00bfff', '#ffd700'];

class Confetti {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height - canvas.height;
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 8 + 3;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.1 - 0.05;
        this.wobble = Math.random() * 5;
        this.wobbleSpeed = Math.random() * 0.1;
        this.time = Math.random() * 100;
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size, this.size/2);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size, this.size/2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
    }
    
    update() {
        this.time += 0.1;
        this.y += this.speed;
        this.x += Math.sin(this.time * this.wobbleSpeed) * this.wobble;
        this.angle += this.rotationSpeed;
        
        if (this.y > canvas.height + this.size) {
            this.reset();
        }
    }
}

function initConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiPieces.push(new Confetti());
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiPieces.forEach(confetti => {
        confetti.draw();
        confetti.update();
    });
    
    requestAnimationFrame(animateConfetti);
}

// Music Player
const musicToggle = document.getElementById('music-toggle');
const birthdaySong = document.getElementById('birthday-song');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        birthdaySong.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i><span>Play Music</span>';
    } else {
        birthdaySong.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i><span>Pause Music</span>';
    }
    isPlaying = !isPlaying;
});

// Photo Gallery
let currentSlide = 0;
const slides = document.querySelectorAll('.photo-gallery img');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

document.querySelector('.next-btn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
});

// Auto-rotate gallery
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}, 5000);

// Countdown Timer (Set to August 11)
function updateTimer() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, 9, 23); // August is month 7 (0-indexed)
    
    // If birthday has passed this year, set to next year
    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 9, 23);
    }
    
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = Math.floor(seconds).toString().padStart(2, '0');
}

// Typing Effect
function typeEffect(element, speed) {
    const text = element.innerHTML;
    element.innerHTML = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}

// Wish Form
const wishForm = document.querySelector('.wish-form');
const wishInput = document.getElementById('wish-input');
const wishDisplay = document.getElementById('wish-display');

document.getElementById('send-wish').addEventListener('click', () => {
    const wishText = wishInput.value.trim();
    if (wishText) {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.innerHTML = `
            <p>${wishText}</p>
            <div class="wish-meta">
                <span class="wish-time">${new Date().toLocaleString()}</span>
                <span class="wish-heart"><i class="fas fa-heart"></i></span>
            </div>
        `;
        wishDisplay.prepend(wishItem);
        wishInput.value = '';
        
        // Add animation
        wishItem.style.animation = 'fadeInUp 0.5s ease';
        
        // Add heart click effect
        const heart = wishItem.querySelector('.wish-heart');
        heart.addEventListener('click', () => {
            heart.classList.toggle('liked');
            if (heart.classList.contains('liked')) {
                heart.innerHTML = '<i class="fas fa-heart" style="color: red;"></i>';
            } else {
                heart.innerHTML = '<i class="fas fa-heart"></i>';
            }
        });
    }
});

// Memory Wall Animation
const memoryItems = document.querySelectorAll('.memory-item');
memoryItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('zoomed');
    });
});

// Initialize Everything
window.addEventListener('load', () => {
    // Start confetti
    initConfetti();
    animateConfetti();
    
    // Start countdown timer
    updateTimer();
    setInterval(updateTimer, 1000);
    
    // Start typing effect
    const typingElement = document.querySelector('.typing-effect');
    typeEffect(typingElement, 30);
    
    // Show first slide
    showSlide(0);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Add some sample wishes
    const sampleWishes = [
        "Wishing you a day filled with happiness and a year filled with joy!",
        "Hope all your birthday wishes come true!",
        "You're not getting older, you're getting better!",
        "Another year of wonderful you! Happy Birthday!"
    ];
    
    sampleWishes.forEach((wish, index) => {
        setTimeout(() => {
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.innerHTML = `
                <p>${wish}</p>
                <div class="wish-meta">
                    <span class="wish-time">${new Date().toLocaleString()}</span>
                    <span class="wish-heart"><i class="fas fa-heart"></i></span>
                </div>
            `;
            wishDisplay.appendChild(wishItem);
            wishItem.style.animation = 'fadeInUp 0.5s ease';
        }, index * 1000);
    });
});


// Surprise Button Functionality
const surpriseBtn = document.querySelector('.surprise-btn');
const surpriseContent = document.querySelector('.surprise-content');

surpriseBtn.addEventListener('click', () => {
  surpriseContent.classList.toggle('hidden');
  surpriseContent.classList.toggle('visible');
  
  if (surpriseContent.classList.contains('visible')) {
    createBalloons(10);
  }
});

// Floating Balloons
function createBalloons(count) {
  const colors = ['#ff69b4', '#ff8e8e', '#7b68ee', '#ff1493', '#00bfff', '#ffd700'];
  const container = document.querySelector('.balloons-container');
  
  // Clear existing balloons
  container.innerHTML = '';
  
  for (let i = 0; i < count; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    
    // Random properties
    const size = Math.random() * 20 + 30;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 5 + 5;
    
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size * 1.25}px`;
    balloon.style.background = color;
    balloon.style.left = `${left}%`;
    balloon.style.animationDelay = `${delay}s`;
    balloon.style.animationDuration = `${duration}s`;
    
    // Pop effect on click
    balloon.addEventListener('click', function() {
      this.style.transition = 'all 0.2s ease';
      this.style.transform = 'scale(1.5)';
      this.style.opacity = '0';
      setTimeout(() => {
        this.remove();
      }, 200);
    });
    
    container.appendChild(balloon);
  }
}

// Enhanced hover effects for memory items
document.querySelectorAll('.memory-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.querySelector('.memory-caption').style.transform = 'translateY(0)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.querySelector('.memory-caption').style.transform = 'translateY(100%)';
  });
});



// Enhanced Preloader Functionality
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate progress (you can replace this with actual loading progress)
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
      }
      progressBar.style.width = `${progress}%`;
    }, 200);
    
    // Update loading messages
    const loadingMessages = [
      "Gathering birthday wishes...",
      "Preparing surprises...",
      "Wrapping gifts...",
      "Lighting candles...",
      "Almost ready..."
    ];
    
    let currentMessage = 0;
    const messageInterval = setInterval(() => {
      document.querySelector('.preloader-subtext').textContent = 
        loadingMessages[currentMessage % loadingMessages.length];
      currentMessage++;
    }, 2500);
    
    // When everything is loaded
    window.addEventListener('load', function() {
      clearInterval(messageInterval);
      progressBar.style.width = '100%';
      
      // Add slight delay for smooth transition
      setTimeout(() => {
        preloader.classList.add('loaded');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }, 500);
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(function() {
      if (!preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 800);
      }
    }, 10000); // Maximum 10 seconds
  });


// Enhanced Memory Wall Animation
function initMemoryWall() {
    const memoryItems = document.querySelectorAll('.memory-item');
    
    // Add click effect to memory items
    memoryItems.forEach(item => {
      item.addEventListener('click', function() {
        this.classList.toggle('active');
      });
      
      // Create floating hearts on hover
      item.addEventListener('mouseenter', function() {
        if (window.innerWidth > 768) { // Only on desktop
          createFloatingHearts(this, 5);
        }
      });
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, { threshold: 0.1 });
    
    memoryItems.forEach(item => {
      observer.observe(item);
      item.style.animationPlayState = 'paused';
    });
  }
  
  function createFloatingHearts(container, count) {
    const colors = ['#ff6b8b', '#ff8e8e', '#ff4757', '#ff1493', '#ff69b4'];
    
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '❤️';
      
      // Random properties
      const size = Math.random() * 20 + 10;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2;
      
      heart.style.fontSize = `${size}px`;
      heart.style.color = color;
      heart.style.left = `${left}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${duration}s`;
      
      container.appendChild(heart);
      
      // Remove heart after animation
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }
  }
  
  // Initialize when page loads
window.addEventListener('load', initMemoryWall);
  

// Auto-sliding Memory Slider
function initMemorySlider() {
    const slider = document.querySelector('.memory-slider');
    const slides = document.querySelectorAll('.memory-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    const slideWidth = slides[0].offsetWidth + 30; // Include margin
    
    // Auto-slide function
    function autoSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
    }
    
    // Set up auto-sliding
    let slideInterval = setInterval(autoSlide, 3000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(autoSlide, 3000);
    });
    
    // Manual navigation
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
      resetInterval();
    });
    
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slideCount;
      slider.scrollTo({
        left: currentIndex * slideWidth,
        behavior: 'smooth'
      });
      resetInterval();
    });
    
    function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, 3000);
    }
    
    // Initialize first slide as active
    slides[0].classList.add('active');
    
    // Update active slide on scroll
    slider.addEventListener('scroll', () => {
      const scrollPos = slider.scrollLeft + (slider.offsetWidth / 2);
      
      slides.forEach((slide, index) => {
        const slidePos = slide.offsetLeft + (slide.offsetWidth / 2);
        if (Math.abs(scrollPos - slidePos) < slide.offsetWidth / 2) {
          slides.forEach(s => s.classList.remove('active'));
          slide.classList.add('active');
          currentIndex = index;
        }
      });
    });
  }
  
  // Initialize when page loads
window.addEventListener('load', initMemorySlider);
  


// Gift Unboxing Functionality
function initGiftUnboxing() {
  const giftBox = document.querySelector('.gift-box');
  const openBtn = document.querySelector('.open-gift-btn');
  const surpriseContent = document.querySelector('.surprise-content');
  const particlesContainer = document.querySelector('.particles');

  let isOpened = false;

  function createParticles() {
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const angle = (Math.random() * 360) * (Math.PI/180);
      const distance = 100 + Math.random() * 100;
      
      particle.style.cssText = `
        --tx: ${Math.cos(angle) * distance}px;
        --ty: ${Math.sin(angle) * distance}px;
        left: ${50 + Math.cos(angle) * 10}%;
        top: ${50 + Math.sin(angle) * 10}%;
        background: hsl(${Math.random() * 360}, 70%, 50%);
        animation-delay: ${Math.random() * 0.5}s;
      `;
      
      particlesContainer.appendChild(particle);
      setTimeout(() => particle.remove(), 1500);
    }
  }

  function openGift() {
    if(isOpened) return;
    
    giftBox.classList.add('open');
    surpriseContent.classList.add('visible');
    document.getElementById('openSound').play();
    
    // Add particles after short delay
    setTimeout(() => {
      createParticles();
      document.getElementById('sparkleSound').play();
    }, 300);

    // Add floating effect
    giftBox.style.animation = 'boxFloat 2s ease-in-out infinite';
    
    isOpened = true;
    openBtn.textContent = "🎁 Amazing!";
  }

  openBtn.addEventListener('click', openGift);
}

// Initialize when page loads
window.addEventListener('load', initGiftUnboxing);


confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#ff6b8b', '#ffd700', '#7b68ee']
});



