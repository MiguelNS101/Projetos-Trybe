SELECT
	artist.artist_name AS artista,
	albuns.album_name AS album
FROM 
    SpotifyClone.artists AS artist
INNER JOIN 
    SpotifyClone.albuns AS albuns USING (artist_id)
WHERE artist.artist_name = "Walter Phoenix"
ORDER BY albuns.album_name;