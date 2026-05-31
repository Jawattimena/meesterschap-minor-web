
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