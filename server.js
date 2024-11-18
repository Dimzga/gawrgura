const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');
const app = express();
const port = 3000;

app.use(express.static('public'));

// Endpoint untuk mengunduh video TikTok
app.get('/download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL TikTok tidak boleh kosong.');
    }

    // Validasi URL TikTok
    const regex = /^(https:\/\/(?:www\.)?tiktok\.com\/.*)$/;
    if (!regex.test(url)) {
        return res.status(400).send('URL tidak valid. Harap masukkan URL TikTok yang benar.');
    }

    try {
        // Kirim request ke API TikWM
        const response = await axios.get(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`, { responseType: 'stream' });

        // Mendapatkan URL video dari response API TikWM
        const videoUrl = response.data.video_url;

        // Mendownload video langsung dari URL
        https.get(videoUrl, (videoResponse) => {
            res.setHeader('Content-Disposition', 'attachment; filename=video.mp4');
            res.setHeader('Content-Type', 'video/mp4');
            videoResponse.pipe(res); // Menyalurkan data video ke response
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Terjadi kesalahan saat mengunduh video.');
    }
});

// Menyajikan halaman HTML (index) dari folder 'public'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
