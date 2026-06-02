CREATE DATABASE IF NOT EXISTS reseptiarviointi
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE reseptiarviointi;

-- Stores users who can review recipes.
CREATE TABLE IF NOT EXISTS kayttaja (
    kayttaja_id INT AUTO_INCREMENT PRIMARY KEY,
    nimi VARCHAR(100) NOT NULL,
    sahkoposti VARCHAR(150) NOT NULL UNIQUE,
    luotu_pvm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Stores recipes that users can review.
CREATE TABLE IF NOT EXISTS resepti (
    resepti_id INT AUTO_INCREMENT PRIMARY KEY,
    nimi VARCHAR(150) NOT NULL,
    kategoria VARCHAR(50) NOT NULL,
    valmistusaika_min INT NOT NULL,
    ainesosat TEXT NOT NULL,
    valmistusohje TEXT NOT NULL,
    luotu_pvm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_resepti_valmistusaika
        CHECK (valmistusaika_min > 0)
);

-- Stores one recipe review given by one user.
CREATE TABLE IF NOT EXISTS arviointi (
    arviointi_id INT AUTO_INCREMENT PRIMARY KEY,
    kayttaja_id INT NOT NULL,
    resepti_id INT NOT NULL,
    tahdet TINYINT NOT NULL,
    kommentti TEXT,
    arviointipaiva DATE NOT NULL,
    CONSTRAINT chk_arviointi_tahdet
        CHECK (tahdet BETWEEN 1 AND 5),
    CONSTRAINT uq_arviointi_kayttaja_resepti
        UNIQUE (kayttaja_id, resepti_id),
    CONSTRAINT fk_arviointi_kayttaja
        FOREIGN KEY (kayttaja_id)
        REFERENCES kayttaja(kayttaja_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_arviointi_resepti
        FOREIGN KEY (resepti_id)
        REFERENCES resepti(resepti_id)
        ON DELETE CASCADE
);
