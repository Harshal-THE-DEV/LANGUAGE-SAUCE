const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", function () {
  const words = ["Where", "coding", "gets", "gourmet", "twist!"];
  const loadingWord = document.querySelector(".loading-word");
  let wordIndex = 0;

  function updateText() {
    if (loadingWord) {
      loadingWord.textContent = words[wordIndex];
      loadingWord.style.opacity = 1; // Show the text
      setTimeout(() => {
        loadingWord.style.opacity = 0; // Hide the text
      }, 700); // Time to display each word
      wordIndex = (wordIndex + 1) % words.length;
    } else {
      console.error("Loading text element not found.");
    }
  }

  // Change the word every 0.9 seconds
  setInterval(updateText, 900);

  // Initial trigger
  updateText();

  // Hide the overlay after the animation is complete
  setTimeout(() => {
    document.querySelector(".loading-container").style.display = "none";
  }, 4500); // Adjust timing as needed
});

gsap.to("path", {
  duration: 5, // Shorter duration for a smoother wave
  ease: "sine.inOut", // Sine easing for a natural wave-like motion
  repeat: -1, // Infinite loop
  yoyo: true, // Reverses the animation
  keyframes: [
    { attr: { d: "M0,45 Q25,65 50,45 T100,45 L100,100 L0,100 Z" } }, // Higher wave peaks
    { attr: { d: "M0,60 Q25,50 50,60 T100,60 L100,100 L0,100 Z" } }, // Lower wave peaks
    { attr: { d: "M0,55 Q25,75 50,55 T100,55 L100,100 L0,100 Z" } }, // Back to a middle state
  ],
});


gsap.registerPlugin(ScrollTrigger);

// Animate the marquee lines based on scroll position
function createScrollMarquee(selector, startX, endX) {
  return gsap.fromTo(
    selector,
    { x: startX },
    {
      x: endX,
      delay: 0,
      duration: 300,
      ease: "power4.in", // No easing for constant movement
      scrollTrigger: {
        trigger: selector,
        start: "top 100%", // Start when the element enters the viewport
        end: "bottom 30", // End when the element leaves the viewport
        scrub: true, // Sync animation with scroll position
        pin: false, // Not pinning, to keep natural scroll
        markers: false, // Remove markers for clean display
        invalidateOnRefresh: true, // Ensure recalculation on resize
      },
    }
  );
}

const scroller = gsap.fromTo(
  "#movingContainer",
  {
    x: 10, // Starting position
  },
  {
    x: -1000, // Ending position
    duration: 20,
    repeat: -1,
    yoyo: true, // Enables the return to the starting position
  }
);

