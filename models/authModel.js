const pool = require('../config/database');

const createAuthUser = async (authUser) => {
    const [result] = await pool.query(`
        INSERT INTO \`user\`
            (kayttaja_id, kayttajatunnus, salasana_hash)
        VALUES (?, ?, ?)
    `, [
        authUser.kayttajaId,
        authUser.username,
        authUser.passwordHash
    ]);

    return {
        userId: result.insertId,
        kayttajaId: authUser.kayttajaId,
        username: authUser.username
    };
};

const getAuthUserByUsername = async (username) => {
    const [rows] = await pool.query(`
        SELECT
            user_id AS userId,
            kayttaja_id AS kayttajaId,
            kayttajatunnus AS username,
            salasana_hash AS passwordHash
        FROM \`user\`
        WHERE kayttajatunnus = ?
    `, [username]);

    return rows[0];
};

module.exports = {
    createAuthUser,
    getAuthUserByUsername
};
