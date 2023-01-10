SELECT
    users.user_name AS "usuario",
	COUNT(CASE
        WHEN users.user_id = historico.user_id
        THEN song.song_name
    END) AS "qtde_musicas_ouvidas",
    ROUND(SUM(CASE
        WHEN users.user_id = historico.user_id
        THEN song.song_duration
    END) / 60,2) AS "total_minutos"
FROM
    SpotifyClone.historic AS historico
INNER JOIN
    SpotifyClone.songs AS song USING (song_id)
INNER JOIN
    SpotifyClone.users AS users  USING (user_id)
GROUP BY users.user_name
ORDER BY users.user_name;
