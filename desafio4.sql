SELECT
    users.user_name AS "usuario",
	IF(
        MAX(historico.reproduction_historic)
        LIKE "2021%", "Usuário ativo", "Usuário inativo"
        ) AS "condicao_usuario"
FROM
    SpotifyClone.historic AS historico
INNER JOIN
    SpotifyClone.users AS users USING (user_id)
GROUP BY users.user_name
ORDER BY users.user_name;
