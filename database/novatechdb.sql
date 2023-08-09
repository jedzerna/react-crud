-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2023 at 10:07 AM
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
(23, 'Technolgy - Electronic Deliverables', 'Cloud based LaTeX composition tool', 'Cloud based Automation', 'PDF Creation tool', 'All Customers', 'For OSA publisher, we have installed LaTeX software on AWS cloud and created watch folder concept for generating PDF. Customer w'),
(25, 'Technolgy - Electronic Deliverables', 'TeX to Word conversion', 'TIAT', 'Word creation from Tex file', 'All Customers', 'Using the author supplied TeX file with minimal structuring this tool converts the .tex file into .doc format with all the equat'),
(41, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]');

-- --------------------------------------------------------

--
-- Table structure for table `thirdparty`
--

CREATE TABLE `thirdparty` (
  `id` int(11) NOT NULL,
  `Team` varchar(1000) NOT NULL,
  `Purpose` varchar(1000) NOT NULL,
  `SoftwareName` varchar(1000) NOT NULL,
  `Details` varchar(1000) NOT NULL,
  `License` varchar(1000) NOT NULL,
  `site` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thirdparty`
--

INSERT INTO `thirdparty` (`id`, `Team`, `Purpose`, `SoftwareName`, `Details`, `License`, `site`) VALUES
(1, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(2, '[value-2]', 'Jed', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(3, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(4, '3B2', 'Customer', 'Adobe Acrobat', 'PDF creation, Editing', 'Purchased', 'www.adobe.com'),
(5, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(6, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(7, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(8, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(9, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(10, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(11, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(12, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(13, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(14, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(15, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(16, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(17, '[value-2]', '[value-3]', '[value-4]', '[value-5]', '[value-6]', '[value-7]'),
(18, 'q', 'w', 'e', 'r', 't', 'y'),
(19, '3B2', 'Internal', 'MS office', 'Word, Excel', 'Purchased', 'Purchased');

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
(1, 'jedzerna4@gmail.com', '$2y$10$r0WoUtyD0qi31yYcPUtfveysG/HQKAk7aNsaZ.F0EGVZQc2hWsFXa', '2023-08-01 05:45:07'),
(2, 'lagodaisyann123@gmail.com', '$2y$10$fmrR.smaitA9i0kagv2q4OuhLL29l0ZG6663M3R7V5mUKBFlO990a', '2023-08-07 04:08:52'),
(3, 'annlagz@gmail.com', '$2y$10$o99e9EhbKz8NnMKB0pPRQur0jxl8yXlDLbhyk76pyrTN9tc9UD0QW', '2023-08-07 04:10:28'),
(4, 'lagodaisyann08@gmail.com', '$2y$10$38g..D4yWNW3hfW7WoUNje.USteEqe8rBkjcZ/0iXZBvoVJpKhHLW', '2023-08-08 08:24:53'),
(5, 'bsrinivasan@novatechset.com', '$2y$10$2hAwSlYaRzlpdddVnJLkI.bEnb0eBKtrt.lFWKBXlHALr3tU0/eFa', '2023-08-08 08:39:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mastertools`
--
ALTER TABLE `mastertools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `thirdparty`
--
ALTER TABLE `thirdparty`
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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `thirdparty`
--
ALTER TABLE `thirdparty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
