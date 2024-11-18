async function downloadVideo() {
    const url = document.getElementById('tiktok-url').value;
    if (!url) {
        alert('Please enter a valid TikTok URL.');
        return;
    }

    try {
        // Mengirim request ke backend untuk mendapatkan URL video
        const response = await fetch(`/api/download?url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (result.url) {
            document.getElementById('result').innerHTML = `
                <p>${result.message}</p>
                <a href="${result.url}" target="_blank">Click here to download the video</a>
            `;
        } else {
            document.getElementById('result').innerHTML = 'Error: No download URL found.';
        }
    } catch (error) {
        document.getElementById('result').innerHTML = 'Error occurred, please try again.';
    }
}
