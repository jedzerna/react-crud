-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 03, 2023 at 06:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `novatechdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `mastertools`
--

CREATE TABLE `mastertools` (
  `id` bigint(20) NOT NULL,
  `department` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `toolname` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `productname` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `activities` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `publishers` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `description` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mastertools`
--

INSERT INTO `mastertools` (`id`, `department`, `toolname`, `productname`, `activities`, `publishers`, `description`) VALUES
(6, '\r\nTechnolgy - Electronic Deliverables', 'XML to Epub', 'TIAT', 'XML file toEpub format', 'All Customers', 'XML file will be converted to Epub format in automatic way'),
(20, 'Technolgy - Electronic Deliverables', 'PubMed conversion', 'TIAT', 'Pubmed Validation', 'All Customers', 'XML file will be converted to PubMed specific format and an auto validation will happen against PMC style checker tool'),
(21, 'Technolgy - Electronic Deliverables', 'AMO PDF creation', 'TIAT', 'PDF Creation tool', 'All Customers', 'We have a tool to create the PDF from word to add DOI, watermark, copyright, etc. in an automated way in the PDF'),
(22, 'Technolgy - Electronic Deliverables', 'Equation to image', 'TIAT', 'All Customers', 'Image Creation tool', 'TeX/Latex to image will be created using this tool'),
(23, 'Technolgy - Electronic Deliverables', 'Cloud based LaTeX composition tool', 'Cloud based Automation', 'PDF Creation tool', 'All Customers', 'For OSA publisher, we have installed LaTeX software on AWS cloud and created watch folder concept for generating PDF. Customer w'),
(25, 'Technolgy - Electronic Deliverables', 'TeX to Word conversion', 'TIAT', 'Word creation from Tex file', 'All Customers', 'Using the author supplied TeX file with minimal structuring this tool converts the .tex file into .doc format with all the equat');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`) VALUES
(1, 'jedzerna4@gmail.com', '$2y$10$r0WoUtyD0qi31yYcPUtfveysG/HQKAk7aNsaZ.F0EGVZQc2hWsFXa', '2023-08-01 05:45:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mastertools`
--
ALTER TABLE `mastertools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mastertools`
--
ALTER TABLE `mastertools`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
