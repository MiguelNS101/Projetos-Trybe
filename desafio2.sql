SELECT
    COUNT(song.song_name) AS "cancoes",
	COUNT(DISTINCT artist.artist_name) AS "artistas",
    COUNT(DISTINCT album.album_name) AS "albuns"
FROM 
    SpotifyClone.albuns AS album
INNER JOIN
    SpotifyClone.artists AS artist USING (artist_id)
INNER JOIN
    SpotifyClone.songs AS song USING (album_id);
