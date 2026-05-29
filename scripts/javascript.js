// const track = document.getElementById('track');
// const carousel = document.getElementById('carousel');

// const originalItems = Array.from(track.children);

// originalItems.forEach(item => track.appendChild(item.cloneNode(true)));
// originalItems.forEach(item => track.appendChild(item.cloneNode(true)));

// requestAnimationFrame(() => {
//     const gap = parseFloat(getComputedStyle(track).gap) || 0;
//     const wrapH = carousel.offsetHeight;
//     const screenCenter = wrapH / 2;

//     const itemMetas = originalItems.map(item => ({
//         top: item.offsetTop,
//         height: item.offsetHeight,
//         center: item.offsetTop + item.offsetHeight / 2,
//     }));

//     const N = originalItems.length;
//     const TOTAL = track.scrollHeight / 3;

//     let offsetY = screenCenter - itemMetas[0].center;

//     function clamp() {
//         if (offsetY > screenCenter - itemMetas[0].center + TOTAL) offsetY -= TOTAL;
//         if (offsetY < screenCenter - itemMetas[0].center - TOTAL) offsetY += TOTAL;
//     }

//     function updateScales() {
//         const ITEM_H_AVG = (originalItems[0].offsetHeight + gap);
//         Array.from(track.children).forEach(item => {
//             const rect = item.getBoundingClientRect();
//             const carouselRect = carousel.getBoundingClientRect();
//             const itemCenter = rect.top - carouselRect.top + rect.height / 2;
//             const dist = Math.abs(itemCenter - screenCenter);
//             const maxDist = ITEM_H_AVG * 1.5;
//             const t = Math.min(dist / maxDist, 1);
//             const scale = 1 - t * 0.12;
//             const opacity = 1 - t * 0.45;
//             item.style.transform = `scale(${scale})`;
//             item.style.opacity = opacity;
//         });
//     }

//     function render() {
//         track.style.transform = `translateY(${offsetY}px)`;
//         updateScales();
//     }

//     function snapToNearest() {
//         const carouselRect = carousel.getBoundingClientRect();
//         const screenCenter = carouselRect.height / 2;

//         let bestItem = null;
//         let bestDist = Infinity;

//         Array.from(track.children).forEach(item => {
//             const rect = item.getBoundingClientRect();
//             const itemCenter = rect.top - carouselRect.top + rect.height / 2;
//             const dist = Math.abs(itemCenter - screenCenter);
//             if (dist < bestDist) {
//                 bestDist = dist;
//                 bestItem = item;
//             }
//         });

//         if (!bestItem) return;

//         const rect = bestItem.getBoundingClientRect();
//         const itemCenter = rect.top - carouselRect.top + rect.height / 2;
//         offsetY += (screenCenter - itemCenter);
//         clamp();

//         track.style.transition = 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//         render();

//         setTimeout(() => {
//             track.style.transition = '';
//         }, 280);
//     }

//     render();

//     let isDragging = false, startY = 0, startOffset = 0;

//     carousel.addEventListener('mousedown', e => {
//         isDragging = true;
//         startY = e.clientY;
//         startOffset = offsetY;
//         carousel.classList.add('grabbing');
//         track.style.transition = '';
//         e.preventDefault();
//     });

//     window.addEventListener('mousemove', e => {
//         if (!isDragging) return;
//         offsetY = startOffset + (e.clientY - startY);
//         clamp();
//         render();
//     });

//     window.addEventListener('mouseup', () => {
//         if (!isDragging) return;
//         isDragging = false;
//         carousel.classList.remove('grabbing');
//         snapToNearest();
//     });

//     let touchStartY = 0;
//     carousel.addEventListener('touchstart', e => {
//         touchStartY = e.touches[0].clientY;
//         startOffset = offsetY;
//         track.style.transition = '';
//     }, { passive: true });

//     carousel.addEventListener('touchmove', e => {
//         offsetY = startOffset + (e.touches[0].clientY - touchStartY);
//         clamp();
//         render();
//     }, { passive: true });

//     carousel.addEventListener('touchend', () => { snapToNearest(); }, { passive: true });

//     let wheelTimer;
//     carousel.addEventListener('wheel', e => {
//         e.preventDefault();
//         track.style.transition = '';
//         offsetY -= e.deltaY * 0.8;
//         clamp();
//         render();
//         clearTimeout(wheelTimer);
//         wheelTimer = setTimeout(snapToNearest, 120);
//     }, { passive: false });
// });

// /* =========================================
//    PROJECT SLIDER NAVIGATION
// ========================================= */

// const projectCards = document.querySelectorAll('.project-card');
// const navDots = document.querySelectorAll('.nav-dot');

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             navDots.forEach(dot => dot.classList.remove('active'));
//             const activeDot = document.querySelector(
//                 `.nav-dot[data-project="${entry.target.id}"]`
//             );
//             if (activeDot) activeDot.classList.add('active');
//         }
//     });
// }, {
//     root: document.querySelector('.projects-track'),
//     threshold: 0.6
// });

// projectCards.forEach(card => observer.observe(card));




// Pak alle cards die je wil observeren
const weeklyNerdsCards = document.querySelectorAll('.weekly-nerd-card');

// Maak een IntersectionObserver aan    
// Dit “kijkt” wanneer elementen in beeld komen binnen een scroll container
const observer = new IntersectionObserver(
  (entries) => {
    // entries = alle cards die net zijn veranderd (in beeld / uit beeld)
    entries.forEach(entry => {

      // entry.isIntersecting = true als element in beeld komt
      if (entry.isIntersecting) {

        // Voeg class toe als card zichtbaar genoeg is
        entry.target.classList.add('active');

      } else {

        // Verwijder class als card weer uit beeld gaat
        entry.target.classList.remove('active');
      }
    });
  },

  {
    // De container waarin we scrollen (niet de hele browser viewport)
    root: document.querySelector('.carousel-wrapper'),

    // Hoeveel % van het element zichtbaar moet zijn om "active" te worden
    threshold: .9
  }
);

// Vertel de observer welke elementen hij moet volgen
weeklyNerdsCards.forEach(item => observer.observe(item));

/* =========================================
   PROJECT SCROLL WITH INTERSECTION OBSERVER
========================================= */

// Pak alle project cards die je wil observeren
const projectCards = document.querySelectorAll('.project-card');
const navDots = document.querySelectorAll('.nav-dot');

// Maak een IntersectionObserver aan voor horizontaal scrollen
const projectObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      // entry.isIntersecting = true als element in beeld komt
      if (entry.isIntersecting) {
        // Voeg class toe als card zichtbaar genoeg is
        entry.target.classList.add('active');
        
        // Update nav dots
        const projectId = entry.target.id;
        navDots.forEach(dot => {
          dot.classList.remove('active');
          if (dot.getAttribute('data-project') === projectId) {
            dot.classList.add('active');
          }
        });
      } else {
        // Verwijder class als card weer uit beeld gaat
        entry.target.classList.remove('active');
      }
    });
  },

  {
    // De container waarin we scrollen (projects-track)
    root: document.querySelector('.projects-track'),

    // Hoeveel % van het element zichtbaar moet zijn om "active" te worden
    threshold: 0.5
  }
);

// Vertel de observer welke elementen hij moet volgen
projectCards.forEach(card => projectObserver.observe(card));