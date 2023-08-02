-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2023 at 11:32 AM
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
(6, '\r\nTechnolgy - Electronic Deliverables', 'XML to Epub', 'TIAT', 'XML file toEpub format', 'Frontiers', 'XML file will be converted to Epub format in automatic way'),
(7, 'Technolgy - SMART', 'Preview Automation', 'Smart', 'Creation of Online Packages', 'CUP/TandF/IWAP/AIP/SAGE', 'An automatic creation of online package, validation and uploads for article based delivery'),
(8, 'Technolgy - SMART\r\n', 'Issue Automation', 'Smart', 'Creation of Online Packages', 'TandF', 'An automatic creation of online package, validation and uploads for issue based delivery'),
(20, 'Technolgy - Electronic Deliverables', 'PubMed conversion', 'TIAT', 'All Customers', 'Pubmed Validation', 'XML file will be converted to PubMed specific format and an auto validation will happen against PMC style checker tool'),
(21, 'Technolgy - Electronic Deliverables', 'AMO PDF creation', 'TIAT', 'TandF', 'PDF Creation tool', 'We have a tool to create the PDF from word to add DOI, watermark, copyright, etc. in an automated way in the PDF'),
(22, 'Technolgy - Electronic Deliverables', 'Equation to image', 'TIAT', 'All Customers', 'Image Creation tool', 'TeX/Latex to image will be created using this tool'),
(23, 'Technolgy - Electronic Deliverables', 'Cloud based LaTeX composition tool', 'Cloud based Automation', 'OSA', 'PDF Creation tool', 'For OSA publisher, we have installed LaTeX software on AWS cloud and created watch folder concept for generating PDF. Customer w'),
(24, 'Technolgy - Latex', 'LaTeX Issue Automation', 'Smart', 'TandF', 'PDF Creation tool', 'Once the CATS xml was booked in, the respective xml files will be moved into the issue folder along with the figures and style f'),
(25, 'Technolgy - Electronic Deliverables', 'TeX to Word conversion', 'TIAT', 'All Customers', 'Word creation from Tex file', 'Using the author supplied TeX file with minimal structuring this tool converts the .tex file into .doc format with all the equat');

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
