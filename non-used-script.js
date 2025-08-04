const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');


canvas.width = 1600;
canvas.height = 300;

let drawing = false;

function getMousePos(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  const pos = getMousePos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;
  const pos = getMousePos(e);
  ctx.lineTo(pos.x, pos.y);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.closePath();
});

canvas.addEventListener('mouseleave', () => {
  drawing = false;
  ctx.closePath();
});


// Main function to handle portfolio hover effects
function initPortfolioHover() {

  // Get all elements with the portfolio-link class
  const portfolioLinks = document.querySelectorAll('.portfolio-link');
  const thumbnailContainer = document.getElementById('thumbnail-container');
  const thumbnailImg = document.getElementById('thumbnail-img');

  // Base path for images (adjust this to match your image directory)
  const imagePath = 'assets/images/'; // e.g., 'assets/images/' or '/images/
  const imageExtension = '.jpg'; // Change to .png, .webp, etc. as needed

  portfolioLinks.forEach(link => {
    // Add mouseenter event (hover start)
    link.addEventListener('mouseenter', function () {
      const elementId = this.id;

      if (elementId) {
        // Construct image path based on element ID
        const imageSrc = imagePath + elementId + imageExtension;

        // Set the image source
        thumbnailImg.src = imageSrc;

        // Handle image load success/error
        thumbnailImg.onload = function () {
          // Image loaded successfully, display it
          thumbnailContainer.style.display = 'block';
        };

        thumbnailImg.onerror = function () {
          // Image failed to load, hide thumbnail
          thumbnailContainer.style.display = 'none';
          console.warn(`Image not found: ${imageSrc}`);
        };
      }
    });

    // Add mouseleave event (hover end)
    link.addEventListener('mouseleave', function () {
      // Hide the thumbnail when not hovering
      thumbnailContainer.style.display = 'none';
    });

    // Optional: Update thumbnail position on mouse move for follow effect
    link.addEventListener('mousemove', function (e) {
      if (thumbnailContainer.style.display === 'block') {
        // You can uncomment these lines to make thumbnail follow cursor
        thumbnailContainer.style.position = 'fixed';
        thumbnailContainer.style.left = e.clientX + 20 + 'px';
        thumbnailContainer.style.top = e.clientY + -400 + 'px';
        thumbnailContainer.style.transform = 'none';
      }
    });
  });

}

document.addEventListener('DOMContentLoaded', function () {
  initPortfolioHover();
});