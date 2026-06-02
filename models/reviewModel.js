const pool = require('../config/database');

const reviewSelectQuery = `
    SELECT
        a.arviointi_id AS reviewId,
        a.kayttaja_id AS userId,
        k.nimi AS userName,
        a.resepti_id AS recipeId,
        r.nimi AS recipeName,
        a.tahdet AS stars,
        a.kommentti AS comment,
        a.arviointipaiva AS reviewDate
    FROM arviointi a
    JOIN kayttaja k
        ON a.kayttaja_id = k.kayttaja_id
    JOIN resepti r
        ON a.resepti_id = r.resepti_id
`;

const getAllReviews = async () => {
    const [rows] = await pool.query(`
        ${reviewSelectQuery}
        ORDER BY a.arviointi_id ASC
    `);

    return rows;
};

const getReviewById = async (reviewId) => {
    const [rows] = await pool.query(`
        ${reviewSelectQuery}
        WHERE a.arviointi_id = ?
    `, [reviewId]);

    return rows[0];
};

const createReview = async (review) => {
    const [result] = await pool.query(`
        INSERT INTO arviointi
            (kayttaja_id, resepti_id, tahdet, kommentti, arviointipaiva)
        VALUES (?, ?, ?, ?, ?)
    `, [
        review.userId,
        review.recipeId,
        review.stars,
        review.comment,
        review.reviewDate
    ]);

    return getReviewById(result.insertId);
};

const updateReview = async (reviewId, review) => {
    const [result] = await pool.query(`
        UPDATE arviointi
        SET
            tahdet = ?,
            kommentti = ?,
            arviointipaiva = ?
        WHERE arviointi_id = ?
    `, [
        review.stars,
        review.comment,
        review.reviewDate,
        reviewId
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return getReviewById(reviewId);
};

const deleteReview = async (reviewId) => {
    const [result] = await pool.query(`
        DELETE FROM arviointi
        WHERE arviointi_id = ?
    `, [reviewId]);

    return result.affectedRows > 0;
};

module.exports = {
    getAllReviews,
    createReview,
    updateReview,
    deleteReview
};
