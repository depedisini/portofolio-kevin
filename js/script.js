// Fungsi untuk menjalankan animasi reveal
function revealElements() {
    // 1. Pilih semua elemen yang ingin dianimasikan
    const elementsToReveal = document.querySelectorAll('.revealable');

    // 2. Looping (periksa satu per satu) setiap elemen
    elementsToReveal.forEach(element => {
        // 3. Dapatkan informasi posisi elemen di layar
        const windowHeight = window.innerHeight; // Tinggi layar browser
        const elementTop = element.getBoundingClientRect().top; // Jarak elemen dari atas layar
        const elementVisible = 150; // Jarak buffer agar animasi muncul lebih awal

        // 4. Cek kondisinya: jika posisi elemen sudah masuk ke area pandang
        if (elementTop < windowHeight - elementVisible) {
            // 5. Tambahkan class 'revealed' untuk memicu transisi CSS
            element.classList.add('revealed');
        } else {
            // (Opsional) Hapus class jika elemen keluar layar lagi (untuk animasi berulang)
            // element.classList.remove('revealed');
        }
    });
}

// 6. "Dengarkan" event scroll di window, dan jalankan fungsi kita setiap kali ada scroll
window.addEventListener('scroll', revealElements);

// 7. Jalankan fungsi sekali saat halaman pertama kali dimuat
// (untuk elemen yang mungkin sudah terlihat di awal)
const animatedTextElement = document.getElementById('animated-text');
const texts = [
    "Kevin Diaz Pramono",
    "Mahasiswa Bina Nusantara",
    "Cyber Security Student"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentText = '';
let typingSpeed = 100; // Kecepatan mengetik
let deletingSpeed = 50; // Kecepatan menghapus
let delayBetweenTexts = 2000; // Jeda antar teks

// --- Efek Typing ---
function typeWriterEffect() {
    currentText = texts[textIndex];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    animatedTextElement.textContent = currentText.substring(0, charIndex);
    animatedTextElement.classList.add('typing'); // Tambah kursor

    let speed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentText.length) {
        speed = delayBetweenTexts;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // Jeda sebelum mengetik teks berikutnya
    }

    setTimeout(typeWriterEffect, speed);
}

// --- Efek Falling Letters ---
function fallInLettersEffect() {
    animatedTextElement.classList.remove('typing'); // Hapus kursor typing
    const textToAnimate = texts[textIndex];
    animatedTextElement.textContent = ''; // Kosongkan dulu

    // Buat span untuk setiap huruf
    for (let i = 0; i < textToAnimate.length; i++) {
        const span = document.createElement('span');
        span.textContent = textToAnimate[i] === ' ' ? '\u00A0' : textToAnimate[i]; // Jaga spasi
        animatedTextElement.appendChild(span);

        setTimeout(() => {
            span.classList.add('fall-in');
        }, i * 100); // Setiap huruf muncul dengan jeda
    }

    // Setelah semua huruf muncul, tunggu sebentar lalu ganti efek
    setTimeout(() => {
        textIndex = (textIndex + 1) % texts.length;
        startNextAnimation();
    }, delayBetweenTexts + textToAnimate.length * 100);
}

// --- Pengelola Animasi Utama ---
let currentAnimationType = 0; // 0 = typing, 1 = falling

function startNextAnimation() {
    animatedTextElement.innerHTML = ''; // Pastikan bersih
    if (currentAnimationType === 0) {
        charIndex = 0; // Reset charIndex untuk typing
        isDeleting = false;
        animatedTextElement.classList.remove('typing'); // Pastikan tidak ada kursor
        setTimeout(typeWriterEffect, 100);
    } else if (currentAnimationType === 1) {
        animatedTextElement.classList.remove('typing');
        fallInLettersEffect();
    }
    // Tambahkan lebih banyak jenis animasi di sini
    
    currentAnimationType = (currentAnimationType + 1) % 2; // Ganti jenis animasi berikutnya (0, 1, 0, 1...)
}

// Mulai animasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    // Jalankan revealElements saat DOMContentLoaded
    revealElements();
    
    // Mulai animasi teks setelah delay singkat
    setTimeout(startNextAnimation, 500); 
});

// Pastikan revealElements juga jalan saat scroll
window.addEventListener('scroll', revealElements);

revealElements();

