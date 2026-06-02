USE reseptiarviointi;

CREATE TABLE IF NOT EXISTS `user` (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    kayttaja_id INT NOT NULL UNIQUE,
    kayttajatunnus VARCHAR(50) NOT NULL UNIQUE,
    salasana_hash VARCHAR(255) NOT NULL,
    luotu_pvm TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_kayttaja
        FOREIGN KEY (kayttaja_id)
        REFERENCES kayttaja(kayttaja_id)
        ON DELETE CASCADE
);