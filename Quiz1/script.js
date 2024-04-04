$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();

        var jenis = $('#jenis').val();
        var minPrice = $('#minPrice').val();
        var maxPrice = $('#maxPrice').val();

        if (minPrice === '' || maxPrice === '') {
            alert('Error! Anda belum memasukkan harga yang dicari');
            return;
        }

        $.getJSON('flight.json', function(data) {
            var results = '<table><thead><tr><th>Maskapai</th><th>Tujuan</th></tr></thead><tbody>';
            var found = false;

            $.each(data.data, function(index, flight) {
                if (flight.Perjalanan) {
                    $.each(flight.Perjalanan, function(index, perjalanan) {
                        if ((perjalanan.Oneway >= minPrice && perjalanan.Oneway <= maxPrice && jenis === 'oneway') || 
                            (perjalanan.Return >= minPrice && perjalanan.Return <= maxPrice && jenis === 'return')) {
                            results += '<tr><td>' + perjalanan.Maskapai + '</td><td>' + flight.Tujuan + '</td></tr>';
                            found = true;
                        }
                    });
                }
            });

            results += '</tbody></table>';

            if (!found) {
                results = '<p>Tidak Ada Maskapai yang tersedia</p>';
            }

            $('#results').html(results);
        });
    });
});
