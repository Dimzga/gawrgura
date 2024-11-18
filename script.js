document.getElementById("downloadForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const videoUrl = document.getElementById("videoUrl").value;
    const format = document.getElementById("format").value;

    if (!videoUrl.includes("tiktok.com")) {
        alert("Masukkan URL TikTok yang valid.");
        return;
    }

    // Membuat URL untuk mengunduh video dari backend
    const downloadUrl = `/api/download?videoUrl=${encodeURIComponent(videoUrl)}&format=${format}`;

    const resultDiv = document.getElementById("result");
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadUrl;
    downloadLink.textContent = "Unduh Video";

    // Menampilkan link unduhan
    resultDiv.innerHTML = "";
    resultDiv.appendChild(downloadLink);

    // Mengklik link untuk memulai pengunduhan otomatis
    setTimeout(() => {
        downloadLink.click(); // Simulasi klik otomatis
    }, 1000);
});
