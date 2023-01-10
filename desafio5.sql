SELECT
    song.song_name AS "cancao",
	COUNT(historico.reproduction_historic) AS "reproducoes"
FROM
    SpotifyClone.historic AS historico
INNER JOIN
    SpotifyClone.songs AS song USING (song_id)
GROUP BY song.song_name
ORDER BY reproducoes DESC, song.song_name
LIMIT 2;
