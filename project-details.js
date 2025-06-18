// DOM Elements
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close-button');
const backToTopBtn = document.getElementById('back-to-top');

// Project data - this would typically come from a database or API in a real app
const projects = {
  'ibwallet': {
    title: 'IBWallet (Open-Source)',
    type: 'Mobile Banking App',
    date: 'Aug 2024 - Sep 2024',
    description: 'A secure and user-friendly mobile banking application built with Flutter. IBWallet provides a seamless banking experience with features like account management, fund transfers, bill payments, and transaction history.',
    technologies: ['Flutter', 'Dart', 'RESTful APIs', 'GetX', 'MVC', 'Localization', 'Git/GitHub'],
    features: [
      'Secure user authentication and authorization',
      'Real-time account balance and transaction updates',
      'Fund transfers between accounts',
      'Bill payments and scheduling',
      'Transaction history with search and filter options',
      'Multi-language support',
      'Responsive UI that works on all device sizes'
    ],
    screenshots: [
      'screenshots/IBWallet_1.jpg',
      'screenshots/IBWallet_2.jpg',
      'screenshots/IBWallet_3.jpg'
    ],
    links: [
      { text: 'GitHub Repository', url: 'https://github.com/Yosuef-Sayed/IBWallet' }
    ]
  },
  'noteit': {
    title: 'Note It! (Closed-Source)',
    type: 'Note-taking Application',
    date: 'Nov 2024',
    description: 'A feature-rich note-taking application that allows users to create, edit, and organize their notes. The app supports offline functionality with SQLite and syncs with Supabase when online. The intuitive interface makes it easy to manage your thoughts, ideas, and tasks across all your devices.',
    technologies: ['Flutter', 'Supabase', 'SQLite', 'SharedPreferences', 'Git/GitHub'],
    features: [
      'Create, edit, and delete notes with rich text formatting',
      'Organize notes with folder structuring and notes coloring',
      'Offline-first architecture for reliability',
      'Cloud sync across all your devices',
      'Secure data storage and backup'
    ],
    screenshots: [
      'screenshots/NoteIt_1.jpg',
      'screenshots/NoteIt_2.jpg',
      'screenshots/NoteIt_3.jpg'
    ],
    links: [
      { text: 'Application Website', url: 'https://yosuef-sayed.github.io/Note-It_Flutter_Application/' }
    ]
  },
  'gdg': {
    title: 'GDG CIC Platform (Prototype)',
    type: 'Community Platform',
    date: 'Feb 2024',
    description: 'An application for the Google Developer Groups community, providing event information, speaker details, session schedules, and networking opportunities for developers. The app serves as a central hub for GDG CIC members to stay updated and engaged with the community.',
    technologies: ['Flutter', 'MVC', 'GetX', 'Tech Stack Expanding...'],
    features: [
      'Event browsing and registration',
      'Detailed session schedules and speaker profiles',
      'Push notifications for important updates',
      'Networking features to connect with other members',
      'Agenda and session bookmarking',
      'Feedback and rating system for events'
    ],
    screenshots: [
      'screenshots/GDG_1.jpg',
      'screenshots/GDG_2.jpg',
      'screenshots/GDG_3.jpg',
      'screenshots/GDG_4.jpg'
    ],
    links: [
      { text: 'APK File Download', url: 'https://drive.google.com/file/d/1YuG0TUEKDAOaNmt9bMOuhUn0bfoBxjs6/view?usp=sharing' }
    ]
  }
};

// Load project data based on URL parameter
function loadProject() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  const project = projects[projectId];
  
  if (!project) {
    window.location.href = 'index.html';
    return;
  }
  
  // Update page title
  document.title = `${project.title} | Yousef Sayed`;
  
  // Update project header
  document.getElementById('project-title').textContent = project.title;
  document.getElementById('project-type').textContent = project.type;
  document.getElementById('project-date').textContent = project.date;
  
  // Update project description
  document.getElementById('project-description').textContent = project.description;
  
  // Update technologies
  const technologiesList = document.getElementById('technologies-list');
  technologiesList.innerHTML = project.technologies
    .map(tech => `<li>${tech}</li>`)
    .join('');
  
  // Update features
  const featuresList = document.getElementById('features-list');
  featuresList.innerHTML = project.features
    .map(feature => `<li>${feature}</li>`)
    .join('');
  
  // Update screenshots
  const screenshotsContainer = document.getElementById('screenshots-container');
  screenshotsContainer.innerHTML = project.screenshots
    .map((screenshot, index) => `
      <div class="screenshot" data-index="${index}">
        <img src="images/${screenshot}" alt="${project.title} Screenshot ${index + 1}">
      </div>
    `)
    .join('');
  
  // Add click event to screenshots
  document.querySelectorAll('.screenshot').forEach((screenshot, index) => {
    screenshot.addEventListener('click', () => {
      openModal(project.screenshots[index]);
    });
  });
  
  // Update project links
  const linksContainer = document.getElementById('links-container');
  if (project.links && project.links.length > 0) {
    linksContainer.innerHTML = project.links
      .map(link => `
        <a 
          href="${link.url}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="project-link-btn"
        >
          <i class="${getLinkIcon(link.text)}"></i>
          ${link.text}
        </a>
      `)
      .join('');
  } else {
    document.getElementById('project-links').style.display = 'none';
  }
  
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-quad'
  });
}

// Get appropriate icon for link type
function getLinkIcon(linkText) {
  if (linkText.toLowerCase().includes('github')) return 'fab fa-github';
  if (linkText.toLowerCase().includes('app store')) return 'fab fa-apple';
  if (linkText.toLowerCase().includes('play')) return 'fab fa-google-play';
  if (linkText.toLowerCase().includes('demo') || linkText.toLowerCase().includes('live')) return 'fas fa-external-link-alt';
  return 'fas fa-link';
}

// Modal functions
function openModal(imageSrc) {
  modalImg.src = `images/${imageSrc}`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
  document.body.classList.remove('modal-open');
}

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// Close modal with close button
const closeButton = document.querySelector('#image-modal .close-button');
if (closeButton) {
  closeButton.addEventListener('click', closeModal);
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide back to top button
function toggleBackToTop() {
  if (window.pageYOffset > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadProject();
  
  // Close button event
  closeBtn.addEventListener('click', closeModal);
  
  // Back to top button
  backToTopBtn.addEventListener('click', scrollToTop);
  
  // Show/hide back to top button on scroll
  window.addEventListener('scroll', toggleBackToTop);
  
  
  // Smooth scroll for anchor links
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
});
