// 1. Logika saat Form Login Biasa disubmit
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil email untuk dijadikan nama sapaan di dashboard
        const emailInput = document.getElementById('email').value;
        const defaultName = emailInput ? emailInput.split('@')[0] : 'Azriel';
        
        // Format huruf kapital di awal nama
        const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);

        // Simpan ke localStorage
        localStorage.setItem('userName', formattedName);
        
        alert('Login Berhasil! Selamat datang kembali, ' + formattedName + ' 💪');
        window.location.href = 'dashboard.html';
    });
}

// 2. Logika saat tombol "Continue with Google" diklik
const googleLoginBtn = document.getElementById('googleLogin');
if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', function() {
        // Simpan nama sapaan untuk simulasi login Google
        localStorage.setItem('userName', 'Azriel (Google)');
        
        alert('Login dengan Google Berhasil! 🎉');
        window.location.href = 'dashboard.html';
    });
}