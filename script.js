/* ===========================
   SLIDER UNDANGAN PERNIKAHAN
   =========================== */

// Posisi slide saat ini (dimulai dari 0)
let currentSlide = 0;

// Ambil semua slide kecuali intro
const slides = document.querySelectorAll(".slide:not(.intro-slide)");

/**
 * Fungsi untuk memulai undangan
 * - Memutar musik
 * - Menyembunyikan intro
 * - Menampilkan slide pertama
 */
function startInvitation() {
  const audio = document.getElementById("bgm"); // Musik latar
  audio.play();

  const intro = document.querySelector(".intro-slide");
  intro.classList.remove("active");
  intro.classList.add("fade-out");

  // Setelah animasi hilang (0.6 detik), sembunyikan intro dan tampilkan slider
  setTimeout(() => {
    intro.style.display = "none";

    // Tampilkan slide pertama
    currentSlide = 0;
    showSlide(currentSlide);

    // Tampilkan tombol navigasi
    const nav = document.querySelector(".nav-buttons");
    nav.classList.add("show");
  }, 600);

  // Tampilkan container slider
  document.querySelector('.slider-container')?.classList.add('is-open');
}

/**
 * Menampilkan slide berdasarkan index
 * @param {number} index - Nomor slide yang ingin ditampilkan
 */
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  currentSlide = index;

  // Pastikan tombol navigasi muncul setelah intro
  const nav = document.querySelector(".nav-buttons");
  if (index >= 0) {
    nav.classList.add("show");
  } else {
    nav.classList.remove("show");
  }
}

/**
 * Navigasi ke slide berikutnya
 */
function nextSlide() {
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  }
}

/**
 * Navigasi ke slide sebelumnya
 */
function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1);
  }
}

/* ===========================
   NAVIGASI DENGAN KEYBOARD
   =========================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

/* ===========================
   EKSPOR FUNGSI KE HTML
   =========================== */
window.startInvitation = startInvitation;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;

// ===========================
// COUNTDOWN SCRIPT
// ===========================

// Ganti tanggal acara sesuai kebutuhan (format: YYYY-MM-DD HH:MM:SS)
const eventDate = new Date("2026-01-04 10:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "<h2>Hari ini adalah hari bahagia! 🎉</h2>";
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // jalankan langsung pertama kali
