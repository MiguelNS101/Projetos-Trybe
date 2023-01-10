SELECT
    COUNT(historic.song_id) AS "quantidade_musicas_no_historico"
FROM
    SpotifyClone.historic AS historic
INNER JOIN
    SpotifyClone.users AS user USING (user_id)
WHERE user.user_name = "Bill";
