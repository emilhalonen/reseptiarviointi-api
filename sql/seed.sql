USE reseptiarviointi;

INSERT INTO kayttaja (nimi, sahkoposti) VALUES
('Anna Kokki', 'anna@example.com'),
('Matti Maistaja', 'matti@example.com'),
('Liisa Leipuri', 'liisa@example.com');

INSERT INTO resepti
(nimi, kategoria, valmistusaika_min, ainesosat, valmistusohje)
VALUES
(
    'Kasvispasta',
    'Pääruoka',
    25,
    'Pasta, kesäkurpitsa, tomaatti, sipuli ja valkosipuli',
    'Keitä pasta. Paista pilkotut kasvikset. Yhdistä ja tarjoile.'
),
(
    'Mustikkapiirakka',
    'Jälkiruoka',
    45,
    'Mustikat, vehnäjauho, voi, sokeri ja kananmuna',
    'Valmista taikina, lisää mustikat ja paista uunissa.'
),
(
    'Banaanimuffinit',
    'Leivonnainen',
    35,
    'Banaani, vehnäjauho, sokeri, kananmuna ja leivinjauhe',
    'Sekoita ainekset, jaa vuokiin ja paista.'
),
(
    'Lohikeitto',
    'Pääruoka',
    40,
    'Lohi, peruna, porkkana, kerma ja tilli',
    'Keitä kasvikset, lisää lohi ja kerma. Viimeistele tillillä.'
);

INSERT INTO arviointi
(kayttaja_id, resepti_id, tahdet, kommentti, arviointipaiva)
VALUES
(1, 1, 5, 'Helppo ja todella hyvä resepti.', '2026-05-25'),
(1, 2, 4, 'Maukas piirakka.', '2026-05-25'),
(2, 1, 4, 'Hyvä arkiruoka.', '2026-05-25'),
(2, 4, 5, 'Täydellinen keitto.', '2026-05-25'),
(3, 3, 5, 'Onnistui hyvin.', '2026-05-25');
