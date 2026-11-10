// Database latihan sinkron
const dataLatihanTimer = {
    dada: {
        items: [
            { nama: "Push Up", spec: "x10", emoji: "🤸‍♂️" },
            { nama: "loncat bintang", spec: "00:30", emoji: "💪" },
            { nama: "Push Up lutut", spec: "x10", emoji: "🏋️‍♂️" },
            { nama: "Push Up Tangan Melebar", spec: "x10", emoji: "🧘‍♂️" }
        ]
    },
    perut: {
        items: [
            { nama: "Loncat Bintang", spec: "00:30", emoji: "🤸‍♂️" },
            { nama: "crunch perut", spec: "x20", emoji: "🧘‍♂️" },
            { nama: "puntir rusia", spec: "x20", emoji: "💪🏻" },
            { nama: "sit up", spec: "x25", emoji: "💪" },
            { nama: "Loncat Bintang", spec: "00:50", emoji: "🤸‍♂️" }
        ]
    },
    lengan: {
        items: [
            { nama: "push up.", spec: "x36", emoji: "💪🏻" },
            { nama: "Chair Dips", spec: "x15", emoji: "🪑" },
            { nama: "Diamond Push Up", spec: "x20", emoji: "💎" },
            { nama: "Self-Resisted Bicep Curl", spec: "00:60", emoji: "🥊" }
        ]
    },
    kaki: {
        items: [
            { nama: "Loncat samping", spec: "00:30", emoji: "🤸‍♂️" },
            { nama: "squad", spec: "x24", emoji: "🚶‍♂️" },
            { nama: "Calf Raises", spec: "x25", emoji: "🦶" },
            { nama: "Terjang mundur", spec: "x24", emoji: "🧘‍♂️" },
            { nama: "Jump Squats", spec: "x30", emoji: "🏃‍♂️" }
        ]
    }
};

// Baca Parameter URL
const urlParams = new URLSearchParams(window.location.search);
const kategori = urlParams.get('kategori') || 'dada';
const clickedNama = urlParams.get('nama');

const currentList = dataLatihanTimer[kategori]?.items || dataLatihanTimer['dada'].items;

// Cari Indeks Gerakan
let currentIndex = 0;
if (clickedNama) {
    const foundIndex = currentList.findIndex(item => item.nama.trim() === clickedNama.trim());
    if (foundIndex !== -1) currentIndex = foundIndex;
} else {
    currentIndex = parseInt(urlParams.get('index')) || 0;
}

const currentExercise = currentList[currentIndex] || currentList[0];

// Tampilkan Info ke UI
document.getElementById('exerciseName').innerText = currentExercise.nama;
document.getElementById('exerciseEmoji').innerText = currentExercise.emoji;

const subLabelContainer = document.getElementById('subLabelContainer');
const displayCenter = document.getElementById('displayCenter');
const mainActionBtn = document.getElementById('mainActionBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

const isRepetition = currentExercise.spec.includes('x');

let timerInterval = null;
let isRunning = false;

if (isRepetition) {
    // --- MODE REPETISI (Contoh: x10, x36) ---
    subLabelContainer.innerHTML = `<span class="rep-badge">Pengulangan</span>`;
    displayCenter.innerText = currentExercise.spec;
    
    mainActionBtn.innerHTML = "✓";
    mainActionBtn.classList.add('btn-check');

    mainActionBtn.addEventListener('click', () => {
        goNext();
    });

} else {
    // --- MODE TIMER (Contoh: 00:30, 00:60) ---
    subLabelContainer.innerHTML = `<div style="color: #888; font-size: 16px;">Target: ${currentExercise.spec}</div>`;
    
    let totalSeconds = 30;
    if (currentExercise.spec.includes(':')) {
        const parts = currentExercise.spec.split(':');
        totalSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }

    let remainingTime = totalSeconds;
    isRunning = true;

    function formatTime(seconds) {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;
        return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }

    function updateDisplay() {
        displayCenter.innerText = formatTime(remainingTime);
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (remainingTime > 0) {
                remainingTime--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                goNext();
            }
        }, 1000);
    }

    mainActionBtn.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
            mainActionBtn.innerHTML = '▶';
        } else {
            isRunning = true;
            mainActionBtn.innerHTML = '<span class="pause-icon-line"></span><span class="pause-icon-line"></span>';
            startTimer();
        }
    });

    updateDisplay();
    startTimer();
}

// Navigasi & Penyimpanan Statistik Otomatis
function goNext() {
    if (currentIndex < currentList.length - 1) {
        window.location.href = `timer.html?kategori=${kategori}&index=${currentIndex + 1}`;
    } else {
        // --- 1. Simpan Data Statistik (Sesi, Kalori, Waktu) ---
        let currentSesi = parseInt(localStorage.getItem('totalSesi') || '0');
        let currentKalori = parseInt(localStorage.getItem('totalKalori') || '0');
        let currentMenit = parseInt(localStorage.getItem('totalMenit') || '0');

        localStorage.setItem('totalSesi', currentSesi + 1);
        localStorage.setItem('totalKalori', currentKalori + 120);
        localStorage.setItem('totalMenit', currentMenit + 20);

        // --- 2. Simpan Data Hari Beruntun (Streak) ---
        let currentStreak = parseInt(localStorage.getItem('streakCount') || '1');
        let bestStreak = parseInt(localStorage.getItem('bestStreak') || '1');

        currentStreak += 1;
        if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
        }

        localStorage.setItem('streakCount', currentStreak);
        localStorage.setItem('bestStreak', bestStreak);

        alert('Selamat! Semua gerakan selesai, statistik dan streak harianmu berhasil disimpan! 🎉🏆');
        window.location.href = 'dashboard.html';
    }
}

function goPrev() {
    if (currentIndex > 0) {
        window.location.href = `timer.html?kategori=${kategori}&index=${currentIndex - 1}`;
    } else {
        alert('Ini adalah gerakan pertama.');
    }
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);