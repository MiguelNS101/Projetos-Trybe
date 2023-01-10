SELECT
	song.song_name AS "nome",
	COUNT(historic.user_id) AS "reproducoes"
FROM
    SpotifyClone.historic AS historic
INNER JOIN
    SpotifyClone.songs AS song USING(song_id)
INNER JOIN
    SpotifyClone.users AS user USING(user_id)

WHERE
    user.plan_id = 1
OR
    user.plan_id = 3

GROUP BY song.song_name
ORDER BY song.song_name;