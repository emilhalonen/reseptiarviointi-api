const pool = require('../config/database');

const getAllUsers = async () => {
    const [rows] = await pool.query(`
        SELECT
            kayttaja_id AS userId,
            nimi AS name,
            sahkoposti AS email,
            luotu_pvm AS createdAt
        FROM kayttaja
        ORDER BY kayttaja_id ASC
    `);

    return rows;
};

const getUserById = async (userId) => {
    const [rows] = await pool.query(`
        SELECT
            kayttaja_id AS userId,
            nimi AS name,
            sahkoposti AS email,
            luotu_pvm AS createdAt
        FROM kayttaja
        WHERE kayttaja_id = ?
    `, [userId]);

    return rows[0];
};

const createUser = async (user) => {
    const [result] = await pool.query(`
        INSERT INTO kayttaja
            (nimi, sahkoposti)
        VALUES (?, ?)
    `, [
        user.name,
        user.email
    ]);

    return getUserById(result.insertId);
};

const updateUser = async (userId, user) => {
    const [result] = await pool.query(`
        UPDATE kayttaja
        SET
            nimi = ?,
            sahkoposti = ?
        WHERE kayttaja_id = ?
    `, [
        user.name,
        user.email,
        userId
    ]);

    if (result.affectedRows === 0) {
        return null;
    }

    return getUserById(userId);
};

const deleteUser = async (userId) => {
    const [result] = await pool.query(`
        DELETE FROM kayttaja
        WHERE kayttaja_id = ?
    `, [userId]);

    return result.affectedRows > 0;
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
};
