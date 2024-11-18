const axios = require('axios');

module.exports = async (req, res) => {
    const { videoUrl, format } = req.query;
    
    if (!videoUrl) {
        return res.status(400).send('URL video tidak ditemukan.');
    }

    try {
        // Membuat URL untuk API TikWM
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}&hd=1`;
        
        // Mengambil data dari API TikWM
        const response = await axios.get(apiUrl);
        
        if (!response.data || !response.data.download) {
            return res.status(404).send('Video tidak ditemukan atau terjadi kesalahan.');
        }

        // Mendapatkan URL unduhan dari response API TikWM
        const downloadUrl = response.data.download;

        // Tentukan header sesuai format yang dipilih (mp4 atau mp3)
        if (format === 'mp3') {
            res.setHeader('Content-Disposition', 'attachment; filename="TikTokAudio.mp3"');
            res.setHeader('Content-Type', 'audio/mpeg');
        } else {
            res.setHeader('Content-Disposition', 'attachment; filename="TikTokVideo.mp4"');
            res.setHeader('Content-Type', 'video/mp4');
        }

        // Mengunduh file dari URL yang diperoleh
        const videoStream = await axios.get(downloadUrl, { responseType: 'stream' });
        videoStream.data.pipe(res); // Mengalirkan file ke browser pengguna
    } catch (err) {
        console.error(err);
        res.status(500).send('Gagal mengunduh video.');
    }
};
