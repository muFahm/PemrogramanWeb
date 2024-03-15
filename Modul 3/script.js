document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registrationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const inputs = [
            document.getElementById('name'), 
            document.getElementById('email'),
            document.getElementById('password'),
            document.getElementById('confirmPassword')
        ];

        let isValid = true;

        for (let input of inputs) {
            if (input.value.trim() === "") {
                input.style.borderColor = 'red';
                if (input.id === 'name') {
                    alert('Kolom nama tidak boleh kosong');
                } else if (input.id === 'email') {
                    alert('Kolom email tidak boleh kosong');
                } else {
                    alert('Isian kolom tidak boleh kosong');
                }
            }
            if (input.id === 'password' && input.value.trim().length < 8) {
                input.style.borderColor = 'red';
                alert('Kata sandi harus memiliki minimal 8 karakter');
                isValid = false;
                break;
            } else {
                input.style.borderColor = '';
            }

            if (input.id === 'confirmPassword' && input.value !== document.getElementById('password').value) {
                input.style.borderColor = 'red';
                alert('Konfirmasi kata sandi harus sama dengan kata sandi');
                isValid = false;
                break;
            } else {
                input.style.borderColor = '';
            }
        }

        if (isValid) {
            alert("Pendaftaran berhasil!");
        }   
    });
});
