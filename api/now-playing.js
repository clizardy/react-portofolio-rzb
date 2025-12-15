import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID:cb6234c185d94285a8ce4de3c58f4b99,
  SPOTIFY_CLIENT_SECRET:9fb4d4d6332a4625b85c6f6291bd8cc5,
  SPOTIFY_REFRESH_TOKEN:AQBrLokmTzdPQtcrQ0o53Buv3sAg1suQXIyYigfF2Hyt8ZuCZcxAfhNbz74cbq08N2L3NiZ1Dj5Zw1pQ-6uPUi3x4Daov9_TpsXDXhjCxIPzRlszsMpX4H38lWz_F6MN98I,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`; // Endpoint baru
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export default async function handler(req, res) {
  const { access_token } = await getAccessToken();

  // 1. Cek lagu yang sedang diputar
  const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  // Jika ada lagu yang sedang main (Status 200 dan isi tidak kosong)
  if (nowPlayingResponse.status === 200) {
    const song = await nowPlayingResponse.json();
    
    // Kadang Spotify balikin 200 tapi item null (iklan/podcast error)
    if (song.item) {
        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists.map((_artist) => _artist.name).join(', ');
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0].url;
        const songUrl = song.item.external_urls.spotify;

        res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
        return res.status(200).json({
            album,
            albumImageUrl,
            artist,
            isPlaying,
            songUrl,
            title,
        });
    }
  }

  // 2. Jika OFFLINE, ambil dari Recently Played
  const recentlyPlayedResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (recentlyPlayedResponse.status === 200) {
      const data = await recentlyPlayedResponse.json();
      if (data.items && data.items.length > 0) {
          const track = data.items[0].track;
          const title = track.name;
          const artist = track.artists.map((_artist) => _artist.name).join(', ');
          const album = track.album.name;
          const albumImageUrl = track.album.images[0].url;
          const songUrl = track.external_urls.spotify;

          res.setHeader('Cache-Control', 'public, s-maxage=180, stale-while-revalidate=90');
          return res.status(200).json({
              album,
              albumImageUrl,
              artist,
              isPlaying: false, // Tandai sebagai offline
              songUrl,
              title,
          });
      }
  }

  // 3. Jika benar-benar kosong (baru buat akun/error)
  return res.status(200).json({ isPlaying: false });
}