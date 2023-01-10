SELECT
	MIN(plan.plan_price) AS "faturamento_minimo",
	ROUND(MAX(plan.plan_price),2) AS "faturamento_maximo",
    ROUND(AVG(plan.plan_price),2) AS "faturamento_medio",
    ROUND(SUM(plan.plan_price),2) AS "faturamento_total"
FROM
    SpotifyClone.users AS user
INNER JOIN
    SpotifyClone.sign_plan AS plan USING(plan_id);
