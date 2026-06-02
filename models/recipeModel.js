const pool = require('../config/database');

const getAllRecipes = async () => {
    const [rows] = await pool.query(`
        SELECT
            resepti_id AS recipeId,
            nimi AS name,
            kategoria AS category,
            valmistusaika_min AS preparationTimeMinutes,
            ainesosat AS ingredients,
            valmistusohje AS instructions,
            luotu_pvm AS createdAt
        FROM resepti
        ORDER BY resepti_id ASC
    `);

    return rows;
};

const getRecipeById = async (recipeId) => {
    const [rows] = await pool.query(`
        SELECT
            resepti_id AS recipeId,
            nimi AS name,
            kategoria AS category,
            valmistusaika_min AS preparationTimeMinutes,
            ainesosat AS ingredients,
            valmistusohje AS instructions,
            luotu_pvm AS createdAt
        FROM resepti
        WHERE resepti_id = ?
    `, [recipeId]);

    return rows[0];
};

const createRecipe = async (recipe) => {
    const [result] = await pool.query(`
        INSERT INTO resepti
            (nimi, kategoria, valmistusaika_min, ainesosat, valmistusohje)
        VALUES (?, ?, ?, ?, ?)
    `, [
        recipe.name,
        recipe.category,
        recipe.preparationTimeMinutes,
        recipe.ingredients,
        recipe.instructions
    ]);

    return getRecipeById(result.insertId);
};

const updateRecipe = async (recipeId, recipe) => {
    const [result] = await pool.query(`
        UPDATE resepti
        SET
            nimi = ?,
            kategoria = ?,
            valmistusaika_min = ?,
            ainesosat = ?,
            valmistusohje = ?
        WHERE resepti_id = ?
    `, [
        recipe.name,
        recipe.category,
        recipe.preparationTimeMinutes,
        recipe.ingredients,
        recipe.instructions,
        recipeId
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return getRecipeById(recipeId);
};

const deleteRecipe = async (recipeId) => {
    const [result] = await pool.query(`
        DELETE FROM resepti
        WHERE resepti_id = ?
    `, [recipeId]);

    return result.affectedRows > 0;
};

const getRecipeReviews = async (recipeId) => {
    const [result] = await pool.query('CALL hae_reseptin_arvioinnit(?)', [recipeId]);
    const rows = result[0] || [];

    return rows.map((row) => ({
        recipe: row.resepti,
        user: row.kayttaja,
        stars: row.tahdet,
        comment: row.kommentti,
        reviewDate: row.arviointipaiva
    }));
};

const getRecipeAverageRating = async (recipeId) => {
    const [result] = await pool.query('CALL hae_reseptin_keskiarvo(?)', [recipeId]);
    const rows = result[0] || [];

    return rows.map((row) => ({
        recipe: row.resepti,
        reviewCount: row.arviointien_maara,
        averageRating: row.keskiarvo
    }));
};

module.exports = {
    getAllRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeReviews,
    getRecipeAverageRating
};
