-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2020 at 06:18 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ristorante`
--
CREATE DATABASE IF NOT EXISTS `ristorante` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `ristorante`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `aggiornaIngredienti` (IN `idPiatto` INT)  NO SQL
BEGIN
  DECLARE done INT DEFAULT FALSE;
  DECLARE i, q INT;
  DECLARE qd, qm INT;
  DECLARE nd INT DEFAULT FALSE;
  DECLARE cur1 CURSOR FOR SELECT ingrediente, quantita from fattoda WHERE piatto = (idPiatto);
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cur1;

  read_loop: LOOP
    FETCH cur1 INTO i, q;
    IF done THEN
      LEAVE read_loop;
    END IF;
    UPDATE ingrediente SET quantitaDisponibile = quantitaDisponibile - q WHERE id = i;
    SELECT quantitaMinima, quantitaDisponibile INTO qm, qd FROM ingrediente WHERE id = (i);
    
    IF NOT nd THEN
    	IF qd < qm THEN
        	CALL piattoDisponibile(idPiatto);
            SET nd = true;
       	END IF;
    END IF;
  END LOOP;

  CLOSE cur1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `piattoDisponibile` (IN `idPiatto` INT)  NO SQL
UPDATE piatto
SET piatto.disponibile = false
WHERE piatto.id = (idPiatto)$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `contiene`
--

CREATE TABLE `contiene` (
  `ordine` int(11) NOT NULL,
  `piatto` int(11) NOT NULL,
  `quantitaOrdinata` int(11) NOT NULL DEFAULT 1,
  `quantitaAttuale` int(11) DEFAULT 1,
  `evaso` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contiene`
--

INSERT INTO `contiene` (`ordine`, `piatto`, `quantitaOrdinata`, `quantitaAttuale`, `evaso`) VALUES
(1, 1, 35, 10, 0),
(1, 2, 1, 0, 1),
(1, 4, 12, 10, 0),
(1, 5, 9, 8, 0),
(2, 1, 19, 8, 0),
(3, 1, 3, 0, 1);

--
-- Triggers `contiene`
--
DELIMITER $$
CREATE TRIGGER `allineaUpdate` AFTER UPDATE ON `contiene` FOR EACH ROW BEGIN
IF NEW.quantitaAttuale > OLD.quantitaAttuale THEN
	UPDATE piatto set piatto.ordiniAttivi = piatto.ordiniAttivi + 1 where piatto.id = NEW.piatto;
	CALL aggiornaIngredienti(NEW.piatto);
END IF;
IF NEW.quantitaAttuale < OLD.quantitaAttuale THEN
	UPDATE piatto set piatto.ordiniAttivi = piatto.ordiniAttivi - 1 where piatto.id = NEW.piatto;
END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `nuovoOrdine` AFTER INSERT ON `contiene` FOR EACH ROW BEGIN
    UPDATE piatto SET piatto.ordiniAttivi = piatto.ordiniAttivi + NEW.quantitaAttuale WHERE piatto.id = NEW.piatto;

    CALL aggiornaIngredienti(NEW.piatto);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `setEvaso` BEFORE UPDATE ON `contiene` FOR EACH ROW BEGIN
IF NEW.quantitaAttuale = 0 THEN 
	SET NEW.evaso = 1;
END IF;
IF NEW.quantitaOrdinata > OLD.quantitaOrdinata THEN 
	SET NEW.evaso = 0;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `fattoda`
--

CREATE TABLE `fattoda` (
  `piatto` int(11) NOT NULL,
  `ingrediente` int(11) NOT NULL,
  `quantita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `fattoda`
--

INSERT INTO `fattoda` (`piatto`, `ingrediente`, `quantita`) VALUES
(1, 1, 100),
(1, 2, 50),
(5, 3, 100);

-- --------------------------------------------------------

--
-- Table structure for table `ingrediente`
--

CREATE TABLE `ingrediente` (
  `id` int(11) NOT NULL,
  `nome` varchar(32) DEFAULT NULL,
  `note` varchar(64) DEFAULT NULL,
  `allergenico` tinyint(1) DEFAULT NULL,
  `quantitaMinima` int(11) DEFAULT NULL,
  `quantitaDisponibile` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ingrediente`
--

INSERT INTO `ingrediente` (`id`, `nome`, `note`, `allergenico`, `quantitaMinima`, `quantitaDisponibile`) VALUES
(1, 'Pasta', 'Barilla', 0, 1000, 1300),
(2, 'Passata di Pomodoro', 'Penny', 0, 500, 10150),
(3, 'Riso', 'Basmati', 0, 300, 400);

-- --------------------------------------------------------

--
-- Table structure for table `ordine`
--

CREATE TABLE `ordine` (
  `id` int(11) NOT NULL,
  `tavolo` int(11) NOT NULL,
  `evaso` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ordine`
--

INSERT INTO `ordine` (`id`, `tavolo`, `evaso`) VALUES
(1, 1, 0),
(2, 1, 0),
(3, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `piatto`
--

CREATE TABLE `piatto` (
  `id` int(11) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `costo` decimal(5,2) DEFAULT NULL,
  `tempoPreparazione` int(11) DEFAULT NULL,
  `ordiniAttivi` int(11) NOT NULL,
  `tipologia` varchar(64) NOT NULL,
  `disponibile` tinyint(1) NOT NULL,
  `img` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `piatto`
--

INSERT INTO `piatto` (`id`, `nome`, `costo`, `tempoPreparazione`, `ordiniAttivi`, `tipologia`, `disponibile`, `img`) VALUES
(1, 'Pasta al Pomodoro', '10.00', 600, -16, 'Primo', 1, '/imgsource/sp.jpg'),
(2, 'Bistecca', '15.00', 1200, 0, 'Carne', 1, ''),
(3, 'Sushi', '10.00', 300, 0, 'Pesce', 1, ''),
(4, 'Cotoletta', '5.00', 300, 10, 'Carne', 1, ''),
(5, 'Riso', '3.00', 600, 8, 'Primo', 0, ''),
(6, 'Zuppa di Miso', '3.00', 300, 0, 'Zuppa', 0, ''),
(7, 'Acqua', '1.50', 300, 0, 'Bibita', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `tavolo`
--

CREATE TABLE `tavolo` (
  `id` int(11) NOT NULL,
  `libero` tinyint(1) DEFAULT NULL,
  `capacita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contiene`
--
ALTER TABLE `contiene`
  ADD PRIMARY KEY (`ordine`,`piatto`),
  ADD KEY `piatto` (`piatto`);

--
-- Indexes for table `fattoda`
--
ALTER TABLE `fattoda`
  ADD PRIMARY KEY (`piatto`,`ingrediente`),
  ADD KEY `ingrediente` (`ingrediente`);

--
-- Indexes for table `ingrediente`
--
ALTER TABLE `ingrediente`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ordine`
--
ALTER TABLE `ordine`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `piatto`
--
ALTER TABLE `piatto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tavolo`
--
ALTER TABLE `tavolo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ingrediente`
--
ALTER TABLE `ingrediente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ordine`
--
ALTER TABLE `ordine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `piatto`
--
ALTER TABLE `piatto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contiene`
--
ALTER TABLE `contiene`
  ADD CONSTRAINT `contiene_ibfk_1` FOREIGN KEY (`ordine`) REFERENCES `ordine` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `contiene_ibfk_2` FOREIGN KEY (`piatto`) REFERENCES `piatto` (`id`);

--
-- Constraints for table `fattoda`
--
ALTER TABLE `fattoda`
  ADD CONSTRAINT `fattoda_ibfk_1` FOREIGN KEY (`piatto`) REFERENCES `piatto` (`id`),
  ADD CONSTRAINT `fattoda_ibfk_2` FOREIGN KEY (`ingrediente`) REFERENCES `ingrediente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
