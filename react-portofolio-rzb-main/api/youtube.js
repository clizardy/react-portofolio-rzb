// api/youtube.js
const { YOUTUBE_API_KEY, YOUTUBE_PLAYLIST_ID } = process.env;

const YOUTUBE_ENDPOINT = `https://www.googleapis.com/youtube/v3/playlistItems`;

export default async function handler(req, res) {
  try {
    // Request ke YouTube untuk ambil 1 video teratas dari playlist
    const response = await fetch(
      `${YOUTUBE_ENDPOINT}?part=snippet&playlistId=${YOUTUBE_PLAYLIST_ID}&maxResults=1&key=${YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(200).json({ isPlaying: false });
    }

    // Ambil data video pertama
    const item = data.items[0].snippet;
    const title = item.title;
    const artist = item.videoOwnerChannelTitle; // Nama Channel
    
    // Ambil thumbnail resolusi tertinggi yang tersedia
    const thumbnail = item.thumbnails.maxres?.url || item.thumbnails.high?.url || item.thumbnails.medium?.url;
    
    // Link ke video tersebut
    const videoUrl = `https://www.youtube.com/watch?v=${item.resourceId.videoId}`;

    // Cache biar hemat kuota API Google (penting karena ada limit harian)
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=1800'
    );

    return res.status(200).json({
      title,
      artist,
      thumbnail,
      videoUrl,
      isPlaying: true, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching YouTube data' });
  }
}