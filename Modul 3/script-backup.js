document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form dari mengirim data secara default

        // Mendefinisikan array input yang akan divalidasi
        const inputs = [
            document.getElementById('name'), 
            document.getElementById('email'),
            document.getElementById('password'),
            document.getElementById('confirmPassword') // Menambahkan input konfirmasi kata sandi
        ];

        let isValid = true; // Flag untuk menandai validasi

        // Loop melalui setiap input untuk cek kekosongan dan validasi
        for (let input of inputs) {
            if (input.value.trim() === "") {
                input.style.borderColor = 'red'; // Ubah border jadi merah jika kosong
                isValid = false; // Update flag validasi
                // Tampilkan pesan kesalahan sesuai dengan input yang kosong
                input.nextElementSibling.textContent = 'Isian kolom tidak boleh kosong';
            } else {
                input.style.borderColor = ''; // Reset border jika input terisi
                // Reset pesan kesalahan jika input terisi
                input.nextElementSibling.textContent = '';
            }

            // Validasi panjang kata sandi
            if (input.id === 'password' && input.value.trim().length < 8) {
                input.style.borderColor = 'red'; // Ubah border jadi merah jika panjang kata sandi kurang dari 8 karakter
                isValid = false; // Update flag validasi
                // Tampilkan pesan kesalahan untuk panjang kata sandi
                input.nextElementSibling.textContent = 'Kata sandi harus memiliki minimal 8 karakter';
            }

            // Validasi konfirmasi kata sandi
            if (input.id === 'confirmPassword' && input.value !== document.getElementById('password').value) {
                input.style.borderColor = 'red'; // Ubah border jadi merah jika konfirmasi kata sandi tidak cocok
                isValid = false; // Update flag validasi
                // Tampilkan pesan kesalahan untuk konfirmasi kata sandi
                input.nextElementSibling.textContent = 'Konfirmasi kata sandi harus sama dengan kata sandi';
            }
        }

        if (isValid) {
            // Jika semua input terisi dan valid, form bisa di-submit atau melakukan aksi selanjutnya
            alert("Pendaftaran berhasil!");
            // this.submit(); // Aktifkan ini untuk submit form jika sudah valid
        }   
    });
});
