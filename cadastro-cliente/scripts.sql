CREATE TABLE CLIENTE (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    NOME VARCHAR(100),
    MORADA VARCHAR(255)
);

CREATE TABLE `CONTA` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CLIENTE_iD` int NOT NULL,
  `SALDO` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CLIENTE_id_IDX` (`CLIENTE_iD`),
  CONSTRAINT `FK_CLIENTE` FOREIGN KEY (`CLIENTE_iD`) REFERENCES `cliente` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;