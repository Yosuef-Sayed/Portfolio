// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    duration: 1000,
  });

  // Update copyright year
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});

// Certificate modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("certificate-modal");
  const modalImg = document.getElementById("modal-image");
  const closeButton = document.getElementsByClassName("close-button")[0];
  const certificateCards = document.querySelectorAll(".certificate-card");

  // Open modal when clicking on any certificate
  certificateCards.forEach((card) => {
    card.addEventListener("click", function () {
      const img = this.querySelector("img");
      modal.style.display = "flex";
      modalImg.src = img.src;
      document.body.style.overflow = "hidden"; // Prevent scrolling while modal is open
    });
  });

  // Close modal when clicking the × button
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  });
});
