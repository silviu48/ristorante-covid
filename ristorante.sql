-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2020 at 01:56 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `dispensa`
--

CREATE TABLE `dispensa` (
  `ingrediente` int(11) NOT NULL,
  `quantita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `fattoda`
--

CREATE TABLE `fattoda` (
  `piatto` int(11) NOT NULL,
  `ingrediente` int(11) NOT NULL,
  `quantita` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ingrediente`
--

CREATE TABLE `ingrediente` (
  `id` int(11) NOT NULL,
  `nome` varchar(32) DEFAULT NULL,
  `note` varchar(64) DEFAULT NULL,
  `allergenico` tinyint(1) DEFAULT NULL,
  `quantitaMinima` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `ordina`
--

CREATE TABLE `ordina` (
  `tavolo` int(11) NOT NULL,
  `piatto` int(11) NOT NULL,
  `evaso` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `ordina`
--
DELIMITER $$
CREATE TRIGGER `evasioneOrdine` AFTER UPDATE ON `ordina` FOR EACH ROW update statoOrdine
set nOrdini = nordini - 1,
	tempoAttesa = tempoAttesa - (SELECT tempo FROM Piatto WHERE id = NEW.piatto)
where NEW.piatto = piatto
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `nuovoOrdine` AFTER INSERT ON `ordina` FOR EACH ROW update statoOrdine
set nOrdini = nordini + 1,
	tempoAttesa = tempoAttesa + (SELECT tempo FROM Piatto WHERE id = NEW.piatto)
where NEW.piatto = piatto
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `piatto`
--

CREATE TABLE `piatto` (
  `id` int(11) NOT NULL,
  `costo` decimal(5,2) DEFAULT NULL,
  `tempoPreparazione` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `statoordine`
--

CREATE TABLE `statoordine` (
  `piatto` int(11) NOT NULL,
  `nOrdini` int(11) DEFAULT NULL,
  `tempoAttesa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Indexes for table `dispensa`
--
ALTER TABLE `dispensa`
  ADD PRIMARY KEY (`ingrediente`);

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
-- Indexes for table `ordina`
--
ALTER TABLE `ordina`
  ADD PRIMARY KEY (`tavolo`,`piatto`),
  ADD KEY `piatto` (`piatto`);

--
-- Indexes for table `piatto`
--
ALTER TABLE `piatto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `statoordine`
--
ALTER TABLE `statoordine`
  ADD PRIMARY KEY (`piatto`);

--
-- Indexes for table `tavolo`
--
ALTER TABLE `tavolo`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dispensa`
--
ALTER TABLE `dispensa`
  ADD CONSTRAINT `dispensa_ibfk_1` FOREIGN KEY (`ingrediente`) REFERENCES `ingrediente` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `fattoda`
--
ALTER TABLE `fattoda`
  ADD CONSTRAINT `fattoda_ibfk_1` FOREIGN KEY (`ingrediente`) REFERENCES `ingrediente` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fattoda_ibfk_2` FOREIGN KEY (`piatto`) REFERENCES `piatto` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ordina`
--
ALTER TABLE `ordina`
  ADD CONSTRAINT `ordina_ibfk_1` FOREIGN KEY (`tavolo`) REFERENCES `tavolo` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `ordina_ibfk_2` FOREIGN KEY (`piatto`) REFERENCES `piatto` (`id`);

--
-- Constraints for table `statoordine`
--
ALTER TABLE `statoordine`
  ADD CONSTRAINT `statoordine_ibfk_1` FOREIGN KEY (`piatto`) REFERENCES `piatto` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
