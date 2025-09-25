document.addEventListener('DOMContentLoaded', () => {

    // --- GANTI DENGAN DATA ANDA ---
    const semesterLabels = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    const ipsData = [3.43, 3.47, 3.64, 4.00]; // Ganti dengan nilai IPS Anda per semester
    const ipkData = [3.43, 3.45, 3.52, 3.63]; // Ganti dengan nilai IPK Anda di akhir setiap semester
    // --------------------------------

    const chartOptions = {
    scales: {
        y: {
            beginAtZero: true,
            max: 4.0,
            grid: {
                borderDash: [5, 5],
                color: 'rgba(255, 255, 255, 0.1)'
            }
        },
        x: { // <-- TAMBAHAN UNTUK SUMBU X
            grid: {
                display: false // Sembunyikan garis vertikal agar lebih bersih
            }
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

    // Konfigurasi Grafik IPS (Kiri)
    const ipsCtx = document.getElementById('ipsChart').getContext('2d');
    const ipsChart = new Chart(ipsCtx, {
        type: 'bar',
        data: {
            labels: semesterLabels,
            datasets: [{
                label: 'IPS',
                data: ipsData,
                backgroundColor: 'rgba(255, 184, 0, 0.6)', // Warna aksen Anda dengan transparansi
                borderColor: 'rgba(255, 184, 0, 1)',
                borderWidth: 1
            }]
        },
        options: chartOptions
    });

    // Konfigurasi Grafik IPK (Kanan)
    const ipkCtx = document.getElementById('ipkChart').getContext('2d');
    const ipkChart = new Chart(ipkCtx, {
        type: 'bar',
        data: {
            labels: semesterLabels,
            datasets: [{
                label: 'IPK',
                data: ipkData,
                backgroundColor: 'rgba(60, 56, 92, 0.6)', // Warna border Anda dengan transparansi
                borderColor: 'rgba(60, 56, 92, 1)',
                borderWidth: 1
            }]
        },
        options: chartOptions
    });

});