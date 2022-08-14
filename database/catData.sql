CREATE TABLE IF NOT EXISTS catData (
    "type" text NOT NULL,
    title text NOT NULL,
    position integer NOT NULL
);
INSERT INTO catData ("type",title,position) VALUES ('bank-draft','Bank Draft', 0);
INSERT INTO catData ("type",title,position) VALUES ('bill-of-lading','Bill of Lading', 1);
INSERT INTO catData ("type",title,position) VALUES ('invoice','Invoice', 2);
INSERT INTO catData ("type",title,position) VALUES ('bank-draft-2','Bank Draft 2', 3);
INSERT INTO catData ("type",title,position) VALUES ('bill-of-lading-2','Bill of Lading 2', 4);