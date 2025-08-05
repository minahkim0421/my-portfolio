// Get all dropdown items
const dropdownItems = document.getElementsByClassName("dropdown-item");
let activeElements = []; // Array to track multiple active elements

// Function to get current window width
function getWindowWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

// Function to apply styles based on window width
function applyResponsiveStyles() {
    const windowWidth = getWindowWidth();

    // Loop through all dropdown items
    Array.from(dropdownItems).forEach((dropdownItem, index) => {
        const dropdown = dropdownItem.querySelector(".dropdown");
        if (!dropdown) return; // Skip if no dropdown found

        // Remove all size-specific classes first
        dropdown.classList.remove('dropdown-large', 'dropdown-medium', 'dropdown-small');

        if (windowWidth > 1500) {
            // Large screens: original behavior
            // dropdown.classList.add('dropdown-large');
            // dropdown.classList.remove('active');
            // enableHoverFunctionality(dropdownItem, dropdown, index);
             dropdown.classList.add('dropdown-medium');
            dropdown.classList.remove('active');
            enableHoverFunctionality(dropdownItem, dropdown, index);

        } else if (windowWidth <= 1500 && windowWidth > 800) {
            // Medium screens: overlay at top
            dropdown.classList.add('dropdown-medium');
            dropdown.classList.remove('active');
            enableHoverFunctionality(dropdownItem, dropdown, index);

        } else {
            // Small screens: always visible
            dropdown.classList.add('dropdown-small');
            dropdown.classList.add('active');
            disableHoverFunctionality(dropdownItem, index);
        }
    });
}

// Function to enable hover functionality for a specific dropdown
function enableHoverFunctionality(dropdownItem, dropdown, index) {
    // Remove existing listeners to avoid duplicates
    disableHoverFunctionality(dropdownItem, index);

    // Create unique event handlers for this dropdown
    const handleMouseOver = function (e) {
        const windowWidth = getWindowWidth();
        if (windowWidth > 800) {
            // Close any other active dropdowns in medium screen mode
            if (windowWidth <= 1500) {
                closeAllDropdowns();
            }
            activeElements[index] = dropdown;
            dropdown.classList.add("active");
        }
    };

    const handleMouseLeave = function (e) {
        const windowWidth = getWindowWidth();
        if (windowWidth > 800 && activeElements[index]) {
            activeElements[index].classList.remove("active");
            activeElements[index] = null;
        }
    };

    // Store event handlers on the element for later removal
    dropdownItem._handleMouseOver = handleMouseOver;
    dropdownItem._handleMouseLeave = handleMouseLeave;

    // Add event listeners
    dropdownItem.addEventListener("mouseover", handleMouseOver);
    dropdownItem.addEventListener("mouseleave", handleMouseLeave);
}

// Function to disable hover functionality for a specific dropdown
function disableHoverFunctionality(dropdownItem, index) {
    if (dropdownItem._handleMouseOver) {
        dropdownItem.removeEventListener("mouseover", dropdownItem._handleMouseOver);
        dropdownItem._handleMouseOver = null;
    }
    if (dropdownItem._handleMouseLeave) {
        dropdownItem.removeEventListener("mouseleave", dropdownItem._handleMouseLeave);
        dropdownItem._handleMouseLeave = null;
    }
    // Clear the active element reference
    activeElements[index] = null;
}

// Function to close all active dropdowns (useful for medium screens)
function closeAllDropdowns() {
    Array.from(dropdownItems).forEach((dropdownItem, index) => {
        const dropdown = dropdownItem.querySelector(".dropdown");
        if (dropdown && activeElements[index]) {
            dropdown.classList.remove("active");
            activeElements[index] = null;
        }
    });
}


// Initial setup
applyResponsiveStyles();

// Listen for window resize events
window.addEventListener('resize', function () {
    // Debounce the resize event to avoid excessive calls
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(applyResponsiveStyles, 100);
});


// intro text reveal animation
// Main function to reveal text character by character
function revealTextByCharacter(elementId, delay = 100) {
    const element = document.getElementById(elementId);
    const text = element.textContent;

    // Clear the element and wrap each character in a span
    element.innerHTML = '';

    // Split text into characters while preserving spaces
    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space
        return span;
    });

    // Add all character spans to the element
    chars.forEach(span => element.appendChild(span));

    // Reveal characters one by one
    let currentIndex = 0;

    const revealNext = () => {
        if (currentIndex < chars.length) {
            chars[currentIndex].classList.add('revealed');
            currentIndex++;
            setTimeout(revealNext, delay);
        }
    };

    // Start the reveal process
    setTimeout(revealNext, delay);
}

function startReveal() {
    // Only run animation if window width is under 800px
    if (window.innerWidth < 800) {
        revealTextByCharacter('intro', 100);
    }
}

function hideText() {
    const element = document.getElementById('intro');
    element.innerHTML = ''; // Completely hide the text
}

function checkWindowSize() {
    const element = document.getElementById('intro');
    const windowWidth = getWindowWidth();
    
    if (windowWidth < 800) {
        // Show and animate text on mobile
        if (element.innerHTML === '') {
            // Set original text first
            element.innerHTML = "Hello! I'm Minah. Thank you for visiting my space. I am a designer who likes to play with some languages, layouts, and interactions. Hope you have some fun here! P.S. My website might be more enjoyable in PC environments.";
            // Then start animation
            setTimeout(() => startReveal(), 100);
        }
    } else {
        // Hide text completely on desktop
        hideText();
    }
}

// Check window size when page loads
window.addEventListener('load', () => {
    setTimeout(() => checkWindowSize(), 500);
});

// Auto-start animation when page loads
window.addEventListener('load', () => {
    setTimeout(() => startReveal(), 500);
});

// Re-check on window resize
window.addEventListener('resize', () => {
    checkWindowSize();
});