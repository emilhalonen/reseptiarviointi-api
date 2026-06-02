USE reseptiarviointi;

DROP PROCEDURE IF EXISTS hae_reseptin_arvioinnit;
DROP PROCEDURE IF EXISTS hae_reseptin_keskiarvo;

DELIMITER //

-- Returns all reviews for one recipe.
CREATE PROCEDURE hae_reseptin_arvioinnit(IN p_resepti_id INT)
BEGIN
    SELECT
        r.nimi AS resepti,
        k.nimi AS kayttaja,
        a.tahdet,
        a.kommentti,
        a.arviointipaiva
    FROM arviointi a
    JOIN kayttaja k
        ON a.kayttaja_id = k.kayttaja_id
    JOIN resepti r
        ON a.resepti_id = r.resepti_id
    WHERE r.resepti_id = p_resepti_id
    ORDER BY a.arviointipaiva DESC;
END //

-- Returns the review count and average star rating for one recipe.
CREATE PROCEDURE hae_reseptin_keskiarvo(IN p_resepti_id INT)
BEGIN
    SELECT
        r.nimi AS resepti,
        COUNT(a.arviointi_id) AS arviointien_maara,
        ROUND(AVG(a.tahdet), 2) AS keskiarvo
    FROM resepti r
    LEFT JOIN arviointi a
        ON r.resepti_id = a.resepti_id
    WHERE r.resepti_id = p_resepti_id
    GROUP BY r.resepti_id, r.nimi;
END //

DELIMITER ;
