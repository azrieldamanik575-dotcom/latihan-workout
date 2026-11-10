const dataLatihan = {
    dada: {
        judul: "Otot Dada  💥",
        durasi: "⏱️ 22 Menit",
        jumlah: "🔥 4 Latihan",
        totalText: "4 Gerakan",
        items: [
            { nama: "Push Up ", spec: "x10", emoji: "🤸‍♂️" },
            { nama: "loncat bintang", spec: "00:30", emoji: "💪" },
            { nama: " Push Up lutut ", spec: "x10", emoji: "🏋️‍♂️" },
            { nama: "Push Up Tangan Melebar", spec: "x10", emoji: "🧘‍♂️" }
            
        ]
    },
    perut: {
        judul: "Otot Perut  🔥",
        durasi: "⏱️ 26 Menit",
        jumlah: "🔥 5 Latihan",
        totalText: "5 Gerakan",
        items: [
            { nama: "Loncat Bintang", spec: "00:30", emoji: "🤸‍♂️" },
            { nama: "crunch perut", spec: "x20", emoji: "🧘‍♂️" },
            { nama: "puntir rusia ", spec: "x20", emoji: "💪🏻" },
            { nama: "sit up", spec: "x25", emoji: "💪" },
            { nama: "Loncat Bintang", spec: "00:50", emoji: "🤸‍♂️" }
        ]
    },
    lengan: {
        judul: "Otot Lengan  💪",
        durasi: "⏱️ 18 Menit",
        jumlah: "🔥 4 Latihan",
        totalText: "4 Gerakan",
        items: [
            { nama: "push up.", spec: "x36", emoji: "💪🏻" },
            { nama: "Chair Dips", spec: "x15", emoji: "🪑" },
            { nama: "Diamond Push Up", spec: "x20", emoji: "💎" },
            { nama: "Self-Resisted Bicep Curl", spec: "00:60", emoji: "🥊" }
        ]
    },
    kaki: {
        judul: "Otot Kaki  🦵",
        durasi: "⏱️ 20 Menit",
        jumlah: "🔥 5 Latihan",
        totalText: "5 Gerakan",
        items: [
            { nama: "Loncat samping ", spec: "00:30", emoji: "🤸‍♂️" },
            { nama: "squad", spec: "x24", emoji: "🚶‍♂️" },
            { nama: "Calf Raises", spec: "x25", emoji: "🦶" },
            { nama: "Terjang mundur ", spec: "x24", emoji: "🧘‍♂️" },
            { nama: "Jump Squats", spec: "x30", emoji: "🏃‍♂️" }
        ]
    }
};

// Ambil parameter kategori dari URL
const urlParams = new URLSearchParams(window.location.search);
const kategoriDipilih = urlParams.get('kategori') || 'perut';

function renderPage() {
    const data = dataLatihan[kategoriDipilih] || dataLatihan['perut'];

    document.getElementById('workoutTitle').innerText = data.judul;
    document.getElementById('workoutTime').innerText = data.durasi;
    document.getElementById('workoutCount').innerText = data.jumlah;
    document.getElementById('exerciseTotalText').innerText = data.totalText;

    const container = document.getElementById('exerciseContainer');
    container.innerHTML = '';

    data.items.forEach(item => {
        const cardHTML = `
            <div class="exercise-card" onclick="window.location.href='timer.html?nama=${encodeURIComponent(item.nama)}&spec=${encodeURIComponent(item.spec)}'" style="cursor: pointer;">
                <div class="exercise-left">
                    <span class="drag-icon">☰</span>
                    <div class="exercise-img-box">
                        <span style="font-size: 26px;">${item.emoji}</span>
                    </div>
                    <div class="exercise-info">
                        <h3>${item.nama}</h3>
                        <p class="exercise-spec">${item.spec}</p>
                    </div>
                </div>
                <span class="swap-icon">⇆</span>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

document.addEventListener('DOMContentLoaded', renderPage);