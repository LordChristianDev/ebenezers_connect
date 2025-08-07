// -- Opens Mobile Menu
function toggleMobileMenu() {
	const mobileMenu = document.getElementById('mobileMenu');
	const toggle = document.querySelector('.mobile-menu-toggle');

	mobileMenu.classList.toggle('active');
	toggle.classList.toggle('active');
}
// -- Closes Mobile Menu
function closeMobileMenu() {
	const mobileMenu = document.getElementById('mobileMenu');
	const toggle = document.querySelector('.mobile-menu-toggle');

	mobileMenu.classList.remove('active');
	toggle.classList.remove('active');
}

// -- In-charge of Closing the Menu when you Click Outside
document.addEventListener('click', function (event) {
	const mobileMenu = document.getElementById('mobileMenu');
	const toggle = document.querySelector('.mobile-menu-toggle');

	if (!toggle.contains(event.target) && !mobileMenu.contains(event.target)) {
		mobileMenu.classList.remove('active');
		toggle.classList.remove('active');
	}
});

// -- In-charge of Closing Menu when size Reaches Desktop Size
window.addEventListener('resize', function () {
	if (window.innerWidth > 900) {
		const mobileMenu = document.getElementById('mobileMenu');
		const toggle = document.querySelector('.mobile-menu-toggle');

		mobileMenu.classList.remove('active');
		toggle.classList.remove('active');
	}
});

// -- Updates Carousel
window.addEventListener('load', () => {
	const track = document.querySelector('.carousel-track');
	const slides = Array.from(track.children);
	const dots = document.querySelectorAll('.dot');
	const prevBtns = document.querySelectorAll('.nav.prev');
	const nextBtns = document.querySelectorAll('.nav.next');
	let currentIndex = 0;

	// Ensure we have slides before proceeding
	if (!track || slides.length === 0) {
		return;
	}

	function updateCarousel(index) {
		// Ensure index is within bounds
		if (index < 0) index = slides.length - 1;
		if (index >= slides.length) index = 0;

		currentIndex = index;

		// Get slide width (assuming all slides have same width)
		const slideWidth = slides[0].offsetWidth;

		// Apply transform to move the track
		track.style.transform = `translateX(-${slideWidth * index}px)`;

		// Update dots
		dots.forEach(dot => dot.classList.remove('active'));
		if (dots[index]) {
			dots[index].classList.add('active');
		}
	}

	// Add event listeners to all previous buttons
	prevBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			currentIndex = currentIndex - 1;
			updateCarousel(currentIndex);
		});
	});

	// Add event listeners to all next buttons
	nextBtns.forEach(btn => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			currentIndex = currentIndex + 1;
			updateCarousel(currentIndex);
		});
	});

	// Dot navigation
	dots.forEach((dot, index) => {
		dot.addEventListener('click', (e) => {
			e.preventDefault();
			updateCarousel(index);
		});
	});

	// Handle window resize
	window.addEventListener('resize', () => {
		updateCarousel(currentIndex);
	});

	// Initialize carousel
	updateCarousel(0);
});