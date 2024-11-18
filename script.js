document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let videoUrl = document.getElementById('videoUrl').value;
    let format = document.getElementById('format').value;

    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Memproses...';

    // Ganti URL API di bawah dengan TikWM API
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}?hd=1`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.data && data.data.play) {
            resultDiv.innerHTML = `<a href="${data.data.play}" target="_blank">Klik di sini untuk mengunduh video</a>`;
        } else {
            resultDiv.innerHTML = 'Terjadi kesalahan. Coba lagi.';
        }
    })
    .catch(error => {
        resultDiv.innerHTML = 'Terjadi kesalahan. Coba lagi.';
    });
});

