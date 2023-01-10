SELECT
    artist.artist_name AS "artista",
	albuns.album_name AS "album",
	COUNT(follow.user_id) AS "seguidores"
FROM
    SpotifyClone.artists AS artist
INNER JOIN
    SpotifyClone.albuns AS albuns USING (artist_id)
INNER JOIN
    SpotifyClone.following AS follow USING (artist_id)
GROUP BY artist.artist_name, albuns.album_name
ORDER BY seguidores DESC, artista, album;
