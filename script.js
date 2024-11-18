document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    let videoUrl = document.getElementById('videoUrl').value;
    let format = document.getElementById('format').value;

    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'Memproses...';

    // Ganti URL API di bawah dengan URL API pihak ketiga yang mendukung TikTok downloader
    const apiUrl = `https://api.tiktokdownloader.io/download?url=${encodeURIComponent(videoUrl)}&format=${format}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            resultDiv.innerHTML = `<a href="${data.downloadUrl}" target="_blank">Klik di sini untuk mengunduh video</a>`;
        } else {
            resultDiv.innerHTML = 'Terjadi kesalahan. Coba lagi.';
        }
    })
    .catch(error => {
        resultDiv.innerHTML = 'Terjadi kesalahan. Coba lagi.';
    });
});
