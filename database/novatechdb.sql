-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 11, 2023 at 08:54 AM
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
(25, 'Technolgy - Electronic Deliverables', 'TeX to Word conversion', 'TIAT', 'Word creation from Tex file', 'All Customers', 'Using the author supplied TeX file with minimal structuring this tool converts the .tex file into .doc format with all the equat');

-- --------------------------------------------------------

--
-- Table structure for table `tblpositions`
--

CREATE TABLE `tblpositions` (
  `id` int(11) NOT NULL,
  `Position` varchar(1000) NOT NULL,
  `Experience` varchar(1000) NOT NULL,
  `PositionCount` varchar(1000) NOT NULL,
  `SkillSets` varchar(1000) DEFAULT NULL,
  `Budget` varchar(1000) DEFAULT NULL,
  `ReplacementAditional` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblpositions`
--

INSERT INTO `tblpositions` (`id`, `Position`, `Experience`, `PositionCount`, `SkillSets`, `Budget`, `ReplacementAditional`) VALUES
(2, 'Software Engineer', '4 to 6 Years', '1', '.Net MVC,.Net Core,C#, MsSQL, HTML5,CSS3,Javascript,JQuery,Typescript,Angular', '10 LPA', 'Sesame'),
(3, 'Software Engineer', '4 to 6 Years', '2', 'Php, ReactJs/NodeJs,My-SQL, HTML5, CSS3', '7 LPA', 'EditGenie'),
(4, 'Associate Software Engineer', '3 to 5 Years', '1', 'Php, ReactJs/NodeJs,My-SQL, HTML5, CSS3', '4 LPA', 'EditGenie++'),
(5, 'Associate Software Engineer (ML Engineer)', '1 to 2 Years', '1', 'Python &amp; AI (NLP Models, Tensorflow, Pytorch)', '6 LPA', 'Grammr'),
(6, 'Technical Lead', '10 Years', '1', 'C#.Net, MS SQL, XML', '16 LPA', 'SMART'),
(7, 'Busniess Analyst - Sr', '4 to 6 Years', '2', 'Agile, communication, leadership, data analysis, good listening skills, Business structure understanding, Creating user Story, Documentation and presentation, Process Modeling, Being able to run meetings with stakeholders, Define reporting and alerting requirements, Decision-making, Negotiation Skills, Critical Thinking, Problem-solving', '6 LPA', 'Business Analysis'),
(8, 'Busniess Analyst - Jr', 'Fresher', '2', 'Good communication and interpersonal skills, good visualizer and listening skills, understanding of the Business Objective', '2.4 LPA', 'Business Analysis');

-- --------------------------------------------------------

--
-- Table structure for table `tblprojects`
--

CREATE TABLE `tblprojects` (
  `id` int(11) NOT NULL,
  `SkillSets` varchar(1000) NOT NULL,
  `SrEngineers` varchar(1000) DEFAULT NULL,
  `Intermediates` varchar(1000) DEFAULT NULL,
  `JrEngineers` varchar(1000) DEFAULT NULL,
  `SubTeam` varchar(1000) DEFAULT NULL,
  `Team` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblprojects`
--

INSERT INTO `tblprojects` (`id`, `SkillSets`, `SrEngineers`, `Intermediates`, `JrEngineers`, `SubTeam`, `Team`) VALUES
(1, '&quot; 3B2 Advanced level, XML, XSLT, TeX, Perlscript, Javascript InDesign Advanced level, InDesign Javascript, VB.Net, XML&quot;', 'Vijay S', 'Sivakumar E', '', 'Template development Team (3B2)', 'Production Support'),
(2, 'LaTeX, Font configuration, bst file update, XML, MathML, Tex4ht, Perl, XSLT', 'Saminathan S', '', '', 'Template development Team (Latex)', 'Production Support'),
(3, 'Perl,XSLT,DOTNET,XML,HTML,MATHML,Latex', 'Chaitra Kamath', 'Harikumar', '', 'XML Conversion Team', 'Production Support'),
(4, 'VBA, VB.NET, C#.NET, SQL, MathType', 'SURESH S', 'DURGADASA P', '', 'Editorial Tool Development', 'Production Support'),
(5, ' VB.NET, MVC,C#, MsSQL, AWS Services, Network Automate, XML', 'Rajasekar S', 'Annapandian', '', 'SMART', 'Production Support'),
(6, 'C#.Net, MS-SQL, HTML/CSS, Javascript/JQuery, Java', 'Ram Mahesh Kumar K', 'Harini', 'Anisha', 'EditGenie', 'Product Development');

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
(22, '3B2', 'Customer', 'APP(3B2): Version 9,10,11', 'Typesetting software', 'Purchased', 'www.ptc.com'),
(23, '3B2', 'Customer', 'Adobe Acrobat', 'PDF creation, Editing', 'Purchased', 'www.adobe.com'),
(24, '3B2', 'Internal', 'MS office', 'Word, Excel', 'Purchased', ''),
(25, '3B2', 'Internal', 'fop', 'xslfo', 'Free', 'https://www.apache.org/dyn/closer.cgi?filename=/xmlgraphics/fop/binaries/fop-2.8-bin.zip&amp;action=download'),
(26, '3B2', 'Internal', 'saxon-HE', 'xsl transformation', 'Free', 'https://www.saxonica.com/download/java.xml'),
(27, '3B2', 'Internal', 'Babelmap', 'Unicode character map', 'Free', 'https://www.babelstone.co.uk/Software/BabelMap.html'),
(28, '3B2', 'Internal', 'Babelpad', 'Unicode character pad', 'Free', 'https://www.babelstone.co.uk/Software/BabelMap.html'),
(29, '3B2', 'Internal', 'MathML Weaver', 'Mathml viewer', 'Free for non-commercial purposes', 'https://formulator-mathml-editor.soft112.com/'),
(30, '3B2', 'Internal', 'latexeqeditor', 'Latex viewer', 'Free', 'https://latex-equation-editor-for-windows.soft112.com/'),
(31, '3B2', 'Internal', 'mathjax', 'Mathml conversion', 'Free', ''),
(32, '3B2', 'Internal', 'FontCreator 5.5', 'Font editior', 'Purchased', 'https://www.high-logic.com/');

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
(5, 'bsrinivasan@novatechset.com', '$2y$10$2hAwSlYaRzlpdddVnJLkI.bEnb0eBKtrt.lFWKBXlHALr3tU0/eFa', '2023-08-08 08:39:40'),
(6, 'john@gmail.com', '$2y$10$EG2VSvbjVgWq8q0CRg7N1eS15dfwvTi88dz1JU4Kn/H.AeohQGUdS', '2023-08-09 08:13:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mastertools`
--
ALTER TABLE `mastertools`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblpositions`
--
ALTER TABLE `tblpositions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblprojects`
--
ALTER TABLE `tblprojects`
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
-- AUTO_INCREMENT for table `tblpositions`
--
ALTER TABLE `tblpositions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tblprojects`
--
ALTER TABLE `tblprojects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `thirdparty`
--
ALTER TABLE `thirdparty`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
