-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 12, 2021 at 04:23 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngo_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

DROP TABLE IF EXISTS `about`;
CREATE TABLE IF NOT EXISTS `about` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`id`, `title`, `subtitle`, `description`, `image`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(2, 'We Are Working On Ngo service', 'Magnam dolores commodi suscipit eius consequatur', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n\r\n\r\n\r\n', 'mxfnQxHP6BcsyDnuW6MrYMrAscKQ2ZE7.jpg', 1, '2021-04-01 19:27:30', 1, '2021-04-06 19:04:13', 2);

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `tags` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 = active & 0 = block',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `description`, `image`, `tags`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(1, 'Aut occaecati', '<h2>WYSIWYG Editor</h2>\r\n\r\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis in urna bibendum turpis pretium fringilla. Aenean neque velit, porta eget mattis ac, imperdiet quis nisi. Donec non dui et tortor vulputate luctus. Praesent consequat rhoncus velit, ut molestie arcu venenatis sodales.</p>\r\n\r\n<h3>Lacinia</h3>\r\n\r\n<ul>\r\n	<li>Suspendisse tincidunt urna ut velit ullamcorper fermentum.</li>\r\n	<li>Nullam mattis sodales lacus, in gravida sem auctor at.</li>\r\n	<li>Praesent non lacinia mi.</li>\r\n	<li>Mauris a ante neque.</li>\r\n	<li>Aenean ut magna lobortis nunc feugiat sagittis.</li>\r\n</ul>\r\n\r\n<h3>Pellentesque adipiscing</h3>\r\n', 'rp4oEQcghpROitlIiaO2Q8aEV4RVbfQg.jpg', 'hjghjh,cvnbcg,fghfggh', 1, '2021-03-31 18:30:22', 1, '2021-04-07 16:27:07', 2),
(2, 'Beatae veritatis', 'Expedita veritatis consequuntur nihil tempore laudantium vitae denat pacta', 'qIG1ecK5hrOCBUMZbWqLjgSchrE7AH2D.jpg', 'vbmbnm', 1, '2021-03-31 18:53:17', 1, '2021-04-06 12:17:33', 1),
(3, 'Harum esse qui', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt', 'cKnvbPWhKwOBKfblFcou9WNd66dnlMnc.jpg', 'vbnbnm', 1, '2021-04-06 10:00:17', 1, '2021-04-06 12:17:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `mobile`, `subject`, `message`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(4, 'Jitendra suthar', 'sutharjitu121@gmail.com', '', 'xjhgfdf', 'bvdghjmvbc', '2021-04-01 11:21:52', 1, '2021-04-01 11:21:52', 1),
(5, 'Jitu Suthar', 'sutharjitu121@gmail.com', '', 'jhvggftydc', 'wertyuiopkjhgfds cvbnmm', '2021-04-06 14:32:44', 1, '2021-04-06 14:32:44', NULL),
(6, 'Jitendra suthar', 'sutharjitu121@gmail.com', '', 'dg', 'dfgdfgdfgd', '2021-04-08 16:48:04', 0, '2021-04-08 16:48:04', 0),
(7, 'Jitu suthar', 'sutharjitu121@gmail.com', '', 'dgdgt', 'dfdfg', '2021-04-10 10:33:08', 0, '2021-04-10 10:33:08', 0),
(8, 'Jitu suthar', 'sutharjitu121@gmail.com', '', 'dgdgt', 'dfdfg', '2021-04-10 10:33:08', 0, '2021-04-10 10:33:08', 0),
(11, 'dfsdf', 'sdgs@gmail.com', '', 'gh', 'sdfgdfsg', '2021-05-11 16:49:03', 2, '2021-05-11 16:49:03', 2),
(10, 'sfsd', 'werw@gm.com', '', 'rege', 'dfg fgdg', '2021-05-10 14:29:34', 0, '2021-05-10 14:29:34', 0),
(12, 'vxfg jik', 'dfgdf@gmail.com', '9876543210', 'sdfsd', 'dfghfh fthfh fghtyh', '2021-05-11 16:51:59', 2, '2021-05-11 16:51:59', 2),
(13, 'qqqqqq', 'qqq@qq.com', '0123456789', 'qasd', 'qsdazx', '2021-05-11 16:55:16', 0, '2021-05-11 16:55:16', 0),
(14, 'gfdg', 'dfgdfg@fghfhg.com', '21654878921', 'fvdfgv', 'dfsdf', '2021-05-11 17:02:46', 0, '2021-05-11 17:02:46', 0),
(15, 'ioio', 'ioio@uiiu.com', '0123654789', 'dsfsdf', 'sdfsdf', '2021-05-11 17:06:10', 0, '2021-05-11 17:06:10', 0),
(16, 'Jitu suthar', 'sutharjitu121@gmail.com', '09829684898', 'db', 'gfghf', '2021-05-11 17:10:01', 0, '2021-05-11 17:10:01', 0),
(17, 'sdfs', 'sutharjitu121@gmail.com', '09829684898', 'dfv', 'vbcb', '2021-05-11 17:13:51', 0, '2021-05-11 17:13:51', 0);

-- --------------------------------------------------------

--
-- Table structure for table `f_and_q`
--

DROP TABLE IF EXISTS `f_and_q`;
CREATE TABLE IF NOT EXISTS `f_and_q` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `f_and_q`
--

INSERT INTO `f_and_q` (`id`, `question`, `answer`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(2, 'what is your name ?', 'Jitendra', 1, '2021-04-02 12:31:50', 1, '2021-04-02 12:31:50', 1),
(3, 'Non consectetur a erat nam at lectus urna duis?', 'Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.', 1, '2021-04-06 08:04:39', 1, '2021-04-06 08:04:39', 1),
(4, 'Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?', 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. ', 1, '2021-04-06 08:05:14', 1, '2021-04-06 08:05:14', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

DROP TABLE IF EXISTS `gallery`;
CREATE TABLE IF NOT EXISTS `gallery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `category_id`, `name`, `image`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(1, 1, 'chrom', 'jxoJaVFmhgN8CbNJNnVJ0MTNGF3qrv5Y.jpg', 1, '2021-03-31 11:51:59', 1, '2021-04-10 10:39:49', 2),
(14, 3, 'application', 'QjLZdf5gi5puR8WDbidG3P14WdvuPYau.jpg', 1, '2021-04-06 10:05:27', 1, '2021-04-06 12:15:38', 1),
(8, 3, 'ngo2', 'epxai60HQOygj7EjxAhuDQvxvy6PThVQ.jpg', 1, '2021-04-06 07:32:23', 1, '2021-04-06 12:15:52', 1),
(15, 7, 'chrome', '6fYEb8UcZvWTpBfLpJmfGqqoBAh1tV32.jpg', 1, '2021-04-06 10:05:55', 1, '2021-04-06 12:16:24', 1),
(6, 3, 'child', 'J4TySceuekADqu1xewUq4Hz73oNDavOS.jpg', 1, '2021-03-31 17:05:13', 1, '2021-04-07 18:39:34', 2),
(9, 7, 'ngo3', 'sQDIjEASAIGcNOhSAJiraj3kakXfGS73.jpg', 1, '2021-04-06 07:32:41', 1, '2021-04-06 12:16:37', 1),
(10, 1, 'ngo4', 'DsZV5Q2gam0vNAtqHdFmaMMEO3oB4HEm.jpg', 1, '2021-04-06 07:33:06', 1, '2021-04-06 12:15:29', 1),
(11, 3, 'ngo5', '9WyWbv6w9c9QUwvU15Lh5yAtPoPtYGuZ.jpg', 0, '2021-04-06 07:33:22', 1, '2021-05-10 12:25:03', 2),
(12, 7, 'ngo6', 'FyMzOlNI4dcdQpAb7UOXplnEPT9X0N7v.jpg', 1, '2021-04-06 07:33:34', 1, '2021-04-06 12:16:46', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gallery_category`
--

DROP TABLE IF EXISTS `gallery_category`;
CREATE TABLE IF NOT EXISTS `gallery_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `is_show` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gallery_category`
--

INSERT INTO `gallery_category` (`id`, `name`, `status`, `is_show`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(1, 'App', 0, 1, '2021-03-30 18:10:33', 1, '2021-05-11 19:02:48', 2),
(7, 'card', 0, 1, '2021-03-30 18:46:42', 1, '2021-05-11 19:02:50', 2),
(3, 'web', 0, 1, '2021-03-31 16:25:01', 1, '2021-05-11 19:02:51', 2);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `name`, `position`, `description`, `image`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(3, 'Saul Goodman', 'Founder', 'Export tempor illum tamen malis malis eram quae irure esse labore quem cillum quid cillum eram malis quorum velit fore eram velit sunt aliqua noster fugiat irure amet legam anim culpa.', 'DQ34AWtgIs6TjogqiaIjjqveGMbaAUut.jpg', 1, '2021-03-31 18:53:58', 1, '2021-04-06 11:51:09', 1),
(2, 'Sara Wilsson', 'Designer', 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.', 'ZGu3iECxyS9KEb3Ep6qVoagHyB5NrB7h.jpg', 1, '2021-03-31 17:34:31', 1, '2021-04-06 11:49:17', 1),
(4, 'Jena Karlis', 'Store Owner', 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.', 'bj7W5KsRqXkyjK936XdQLi1THHz95Jna.jpg', 1, '2021-04-06 11:48:06', 1, '2021-05-11 18:59:08', 2),
(5, 'Pratik ', 'software engineer', 'consectetur adipiscing elit. Aliquam ullamcorper sapien non nisl facilisis bibendum in quis tellus. Duis', 'pyB6qgEwyvBAZzbAyDJtjArLu8Kc1gKy.png', 1, '2021-05-10 15:12:01', 1, '2021-05-10 15:12:01', 2),
(6, 'abc', 'writer', 'sdfsdf dfgfh fghfghjg ghjghj jdfjdf  kjhdfjgdf jghdfg', 'lYwEgoaMg7YAp2i4IAt4fsVpgE02XCbw.jpg', 1, '2021-05-10 15:12:35', 1, '2021-05-11 18:58:45', 2),
(7, 'alex host', 'donater', 'Enim nisi quem export duis labore cillum quae magna enim sint quorum nulla quem veniam duis minim tempor labore quem eram duis noster aute amet eram fore quis sint minim.', 'TuYtxY2igqlEGrstWWGjIkHVoXAEK57x.jfif', 1, '2021-05-11 18:59:53', 1, '2021-05-11 18:59:53', 2);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_name`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(1, 'Admin', 1, '2021-04-01 14:37:44', 1, '2021-04-01 14:37:44', 1),
(2, 'Member', 1, '2021-04-01 14:37:44', 1, '2021-04-01 14:37:44', 1);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `subtitle`, `image`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(1, 'Modi sit est on', 'Quis excepturi porro totam sint earum quo nulla perspiciatisQuis excepturi', 'pYoCrXWm4yqfz6rNJIs0sbxDaUUy1Dbq.jpg', 1, '2021-04-05 14:32:53', 1, '2021-04-06 18:48:14', 2),
(2, 'Unde praesentium sed', 'Voluptas vel esse repudiandae quo excepturi', '4zpGakgD8vH4qA87bSrBeZFjWHsw77M8.png', 0, '2021-04-05 17:02:44', 1, '2021-05-10 12:24:54', 2),
(3, 'Nostrum qui quasi', 'Ratione hic sapiente nostrum doloremque illum nulla praesentium id', 'YQhWXLCa3plldZ0CrlIWwyynYb27mmj8.jpg', 1, '2021-04-05 17:03:01', 1, '2021-04-06 11:44:06', 2),
(5, 'Pariatur explicabo vel', 'Velit veniam ipsa sit nihil blanditiis mollitia natus', 'VjgYeAL1z4pNlffVvb7TcxqUcCfuOnSs.png', 1, '2021-04-06 11:21:36', 2, '2021-04-06 11:45:41', 2);

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
CREATE TABLE IF NOT EXISTS `setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `company_title` varchar(255) NOT NULL,
  `company_logo` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `twitter` varchar(255) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `HeaderBg` varchar(255) NOT NULL,
  `FooterBg` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `company_name`, `company_title`, `company_logo`, `favicon`, `email`, `password`, `facebook`, `twitter`, `instagram`, `whatsapp`, `location`, `HeaderBg`, `FooterBg`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(1, 'Protect Dream', 'Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.', '6HuXkhJ3CvDovVSsA1wY9EMZ2Cca03Zm.png', 'GogNEPcQtBshPzhLbT7gIOUIgmbTnjyq.png', 'example@gmail.com', '123456789', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', '919988776655', 'Sirohi,Rajasthan', 'cEQNfHTShvdZ4I2XBNwEYU8ah1x29sDm.jpg', 'v41FqJ6mddJf3QW7Rs5P7SAgK4oHdECK.jpg', '2021-04-02 11:22:19', 0, '2021-05-11 15:21:57', 2);

-- --------------------------------------------------------

--
-- Table structure for table `subscribeemail`
--

DROP TABLE IF EXISTS `subscribeemail`;
CREATE TABLE IF NOT EXISTS `subscribeemail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscribeemail`
--

INSERT INTO `subscribeemail` (`id`, `email`, `created_on`, `created_by`) VALUES
(1, 'Prateeksuthar2hzar@gmail.com', '2021-04-06 15:42:50', 1),
(2, 'sutharjitu121@gmail.com', '2021-04-06 15:45:32', 1),
(4, 'sutharjitu121@gmail.commm', '2021-04-08 16:00:44', 1),
(5, 'sutharjitu121@gmail.comz', '2021-04-08 16:06:53', 1),
(6, 'Prateeksuthar2hzar@gmail.comggg', '2021-04-08 16:08:26', 1),
(7, 'xyz@gmail.com', '2021-05-11 16:21:40', 1),
(8, 'df@sdf.com', '2021-05-11 16:45:36', 1),
(9, 'ioio@gmail.com', '2021-05-11 17:14:17', 1),
(10, 'oioii@gmail.com', '2021-05-11 17:15:42', 1),
(11, 'yuarhab@gmail.com', '2021-05-11 17:18:47', 1);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `facebook_link` varchar(255) NOT NULL,
  `twitter` varchar(255) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `whatsapp` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1 = active & 0 = block',
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `position`, `description`, `image`, `facebook_link`, `twitter`, `instagram`, `whatsapp`, `status`, `created_on`, `created_by`, `modified_on`, `modified_by`) VALUES
(6, 'Dashrath Singh ', 'NSUI President', 'Animi est delectus alias quam repellendus nihil nobis dolor. Est sapiente occaecati et dolore. Omnis aut ut nesciunt explicabo qui. Eius nam deleniti ut omnis', 'hokKjRRzvVKcXnjBchK5uXT1mPdwHIxi.jpg', '', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', '3456789', 1, '2021-03-31 15:41:48', 1, '2021-04-06 11:52:20', 1),
(9, 'Sarah Jhonson', 'Manager', 'Aspernatur iste esse aliquam enim et corporis. Molestiae voluptatem aut eligendi quis aut. Libero vel amet voluptatem eos rerum non doloremque', 'sZZrs3J5Hfpff6gKTpS5A6vtAjBmkPgo.jpg', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', '1234567876541', 1, '2021-03-31 16:28:27', 1, '2021-04-06 11:53:08', 1),
(8, 'William Anderson', 'Chief Executive', 'Ut enim possimus nihil cupiditate beatae. Veniam facere quae non qui necessitatibus rerum eos vero. Maxime sit sunt quo dolor autem est qui quaerat', 'eVf5uO38D8IZ5LsD51JjQE0wQnq8TDAG.jpg', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', 'https://www.npmjs.com/package/node-input-validator', '24567890876543', 1, '2021-03-31 16:08:00', 1, '2021-04-06 11:54:42', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) NOT NULL,
  `Fname` varchar(255) NOT NULL,
  `Lname` varchar(255) NOT NULL,
  `EmailID` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `MobileNumber` varchar(255) NOT NULL,
  `AlternativetNo` varchar(255) DEFAULT NULL,
  `userprofile` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `LastLoggedIn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `RememberMe` int(1) NOT NULL DEFAULT '0',
  `IpAddress` varchar(255) DEFAULT NULL,
  `CreatedBy` int(11) NOT NULL,
  `CreatedOn` datetime NOT NULL,
  `ModifiedBy` int(11) NOT NULL,
  `ModifiedOn` datetime NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `RoleID`, `Fname`, `Lname`, `EmailID`, `password`, `MobileNumber`, `AlternativetNo`, `userprofile`, `reset_token`, `status`, `LastLoggedIn`, `RememberMe`, `IpAddress`, `CreatedBy`, `CreatedOn`, `ModifiedBy`, `ModifiedOn`) VALUES
(2, 1, 'jitu', 'suthar', 'sutharjitu121@gmail.com', '$2a$10$muCXr2e8mq9Z7uKwVYihreKY7TG3PzhWZnwrXZy9sbst0UmAHCAIC', '09829684898', '7865324513', 'IQjVuo9qr2klwkXc4wV7Ikfxgf1rXOi9.jpg', 'zsCGpgVAaHCbXSPBz68oc2zIPbAgb9BgUqNG0cEKC25Hm7M5CNbFgTEwSpKdiyiS6CCFa9', 1, '2021-04-01 16:38:13', 0, NULL, 1, '2021-04-01 16:38:13', 1, '2021-04-02 14:49:16'),
(3, 2, 'Jitendra', 'suthar', 'sutharjitu121555@gmail.com', NULL, '09829684898', '8765432', '9sP72LSzPY5gIRx9pafA5ZDI2zVjCQ5W.png', NULL, 1, '2021-04-01 16:45:32', 0, NULL, 1, '2021-04-01 16:45:33', 1, '2021-04-02 14:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
CREATE TABLE IF NOT EXISTS `video` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `video_link` varchar(255) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL DEFAULT '0',
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `video`
--

INSERT INTO `video` (`id`, `title`, `subtitle`, `description`, `image`, `video_link`, `created_on`, `created_by`, `modified_on`, `modified_by`, `status`) VALUES
(1, 'Ngo Work', 'We are Work On ngo', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit', 'about.jpg', 'https://www.youtube.com/watch?v=aorQMz7iVy0', '2021-04-05 15:01:36', 0, '2021-04-05 15:01:36', 0, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
