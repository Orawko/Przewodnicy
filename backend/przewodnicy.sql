-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Cities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Cities` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Cities` (
  `IDCity` INT NOT NULL AUTO_INCREMENT COMMENT 'City name',
  `IDImage` INT NULL DEFAULT 0,
  `Name` VARCHAR(255) NOT NULL,
  `Description` TEXT NOT NULL,
  PRIMARY KEY (`IDCity`))
ENGINE = InnoDB;

CREATE INDEX `Name` ON `mydb`.`Cities` (`IDCity` ASC) VISIBLE;

CREATE UNIQUE INDEX `IDCity_UNIQUE` ON `mydb`.`Cities` (`IDCity` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Guides`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Guides` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Guides` (
  `IDGuide` BIGINT NOT NULL AUTO_INCREMENT COMMENT 'Unique guide ID, integer',
  `IDImage` INT NULL DEFAULT 0 COMMENT 'Guide  profile picture',
  `Name` VARCHAR(255) NOT NULL COMMENT 'Guide name',
  `Surname` VARCHAR(255) NOT NULL COMMENT 'Guide surname',
  `Age` INT NOT NULL COMMENT 'Guide Age  Int  [16 - 120]',
  `Email` VARCHAR(255) NOT NULL COMMENT 'Guide email, String',
  `PhoneNumber` INT NOT NULL COMMENT 'Guide phone number',
  `Description` TEXT NULL COMMENT 'Guide description, multiline string',
  `Password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`IDGuide`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `Email_UNIQUE` ON `mydb`.`Guides` (`Email` ASC) VISIBLE;

CREATE UNIQUE INDEX `PhoneNumber_UNIQUE` ON `mydb`.`Guides` (`PhoneNumber` ASC) VISIBLE;

CREATE UNIQUE INDEX `GuideID_UNIQUE` ON `mydb`.`Guides` (`IDGuide` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Dates`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Dates` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Dates` (
  `IDDate` INT NOT NULL AUTO_INCREMENT,
  `IDGuide` BIGINT NOT NULL COMMENT 'GuideID',
  `Date` DATETIME NOT NULL COMMENT 'Date of the meeting\n',
  `Duration` INT NOT NULL,
  PRIMARY KEY (`IDDate`, `IDGuide`),
  CONSTRAINT `fk_Appointments_Guides1`
    FOREIGN KEY (`IDGuide`)
    REFERENCES `mydb`.`Guides` (`IDGuide`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_Appointments_Guides1_idx` ON `mydb`.`Dates` (`IDGuide` ASC) VISIBLE;

CREATE UNIQUE INDEX `IDDate_UNIQUE` ON `mydb`.`Dates` (`IDDate` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Users` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Users` (
  `IDUser` BIGINT NOT NULL AUTO_INCREMENT,
  `IDImage` INT NULL,
  `Name` VARCHAR(255) NOT NULL,
  `Surname` VARCHAR(255) NOT NULL,
  `Age` INT NULL COMMENT 'User Age Int [1 - 120]',
  `Email` VARCHAR(255) NOT NULL,
  `PhoneNumber` INT NULL,
  `Password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`IDUser`))
ENGINE = InnoDB;

CREATE UNIQUE INDEX `Email_UNIQUE` ON `mydb`.`Users` (`Email` ASC) VISIBLE;

CREATE UNIQUE INDEX `PhoneNumber_UNIQUE` ON `mydb`.`Users` (`PhoneNumber` ASC) VISIBLE;

CREATE UNIQUE INDEX `IDUser_UNIQUE` ON `mydb`.`Users` (`IDUser` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`Opinions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`Opinions` ;

CREATE TABLE IF NOT EXISTS `mydb`.`Opinions` (
  `IDOpinion` INT NOT NULL AUTO_INCREMENT,
  `IDGuide` BIGINT NOT NULL,
  `IDUser` BIGINT NOT NULL,
  `Date` DATETIME NOT NULL,
  `Contents` TEXT NOT NULL,
  PRIMARY KEY (`IDOpinion`, `IDGuide`, `IDUser`),
  CONSTRAINT `fk_Opinion_Guides1`
    FOREIGN KEY (`IDGuide`)
    REFERENCES `mydb`.`Guides` (`IDGuide`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Opinion_Users1`
    FOREIGN KEY (`IDUser`)
    REFERENCES `mydb`.`Users` (`IDUser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `fk_Opinion_Guides1_idx` ON `mydb`.`Opinions` (`IDGuide` ASC) VISIBLE;

CREATE UNIQUE INDEX `IDOpinion_UNIQUE` ON `mydb`.`Opinions` (`IDOpinion` ASC) VISIBLE;

CREATE INDEX `fk_Opinion_Users1_idx` ON `mydb`.`Opinions` (`IDUser` ASC) VISIBLE;


-- -----------------------------------------------------
-- Table `mydb`.`GuideInCity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`GuideInCity` ;

CREATE TABLE IF NOT EXISTS `mydb`.`GuideInCity` (
  `IDGuideInCity` INT NOT NULL AUTO_INCREMENT COMMENT 'City name',
  `IDGuide` BIGINT NOT NULL COMMENT 'Description about the city, multi line String',
  `IDCity` INT NOT NULL COMMENT 'Number of guides in particular City, Integer >= 0',
  PRIMARY KEY (`IDGuideInCity`, `IDCity`, `IDGuide`),
  CONSTRAINT `fk_Guide in City_Cities1`
    FOREIGN KEY (`IDCity`)
    REFERENCES `mydb`.`Cities` (`IDCity`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Guide in City_Guides1`
    FOREIGN KEY (`IDGuide`)
    REFERENCES `mydb`.`Guides` (`IDGuide`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE INDEX `Name` ON `mydb`.`GuideInCity` (`IDGuideInCity` ASC) VISIBLE;

CREATE UNIQUE INDEX `Name_UNIQUE` ON `mydb`.`GuideInCity` (`IDGuideInCity` ASC) VISIBLE;

CREATE INDEX `fk_Guide in City_Cities1_idx` ON `mydb`.`GuideInCity` (`IDCity` ASC) VISIBLE;

CREATE INDEX `fk_Guide in City_Guides1_idx` ON `mydb`.`GuideInCity` (`IDGuide` ASC) VISIBLE;


-- -----------------------------------------------------
-- Data for table `mydb`.`Cities`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 1, 'Kraków', 'Kraków jest jednym z najstarszych miast Polski, z wieloma wartościowymi obiektami architektonicznymi. Działa w nim wiele instytucji i placówek kulturalnych gromadzących bezcenne zabytki.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 2, 'Zakopane', 'Największa miejscowość w bezpośrednim otoczeniu Tatr, duży ośrodek sportów zimowych, potocznie nazywany zimową stolicą Polski. W jego granicach administracyjnych znajduje się znaczna część Tatrzańskiego Parku Narodowego.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 11, 'Warszawa', 'Stolica Polski i województwa mazowieckiego, największe miasto kraju, położone w jego środkowo-wschodniej części.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 3, 'Kielce', 'Kielce położone są w Górach Świętokrzyskich. W obrębie miasta ulokowane są pasma Kadzielniańskie i Dymińskie. Kielce przecina niewielka rzeka Silnica, będąca prawostronnym dopływem Bobrzy. Na terenie miasta znajduje się szereg rezerwatów przyrody ożywionej i nieożywionej.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 4, 'Gdańsk', 'Centrum kulturalne, naukowe i gospodarcze północnej Polski, ośrodek gospodarki morskiej z dużym portem handlowym.Jest to miasto o ponad tysiącletniej historii, którego tożsamość na przestrzeni wieków kształtowała się pod wpływem różnych kultur.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 88, 'Gniezno', 'Według legendarnego wywodu nazwa miasta pochodzi od polskiego słowa „gniazdo” oraz „gnieździć się” i związana jest z legendą powstania państwa polskiego.Największym zabytkiem jest Katedra Gnieźnieńska wraz z Wzgórzem Lecha. W katedrze znajdują się Drzwi Gnieźnieńskie przedstawiające życiorys św. Wojciecha, Srebrny Relikwiarz tego świętego oraz dwa portale gotyckie. ');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 5, 'Katowice', 'Jeden z głównych ośrodków Górnośląskiego Okręgu Przemysłowego i największe pod względem ludności miasto konurbacji górnośląskiej. Najstarsza, istniejąca do dziś budowla w Katowicach to drewniany kościółek św. Michała Archanioła z XVI w. w Brynowie. Oprócz niego w mieście znajduje się kilkadziesiąt budowli mieszkalnych z XIX i początku XX wieku.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 6, 'Bielsko-Biała', 'Miasto na prawach powiatu w południowej Polsce, w województwie śląskim, na Pogórzu Śląskim, u stóp Beskidu Małego i Beskidu Śląskiego, nad rzeką Białą. W rejonie Bielska-Białej znajduje się bardzo gęsta sieć górskich szlaków turystycznych. Prowadzą one na wszystkie szczyty w mieście i okolicach. Łącznie jest ich 16, a ich długość wynosi 81 km.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 7, 'Mielno', 'Położone nad Morzem Bałtyckim i jeziorem Jamno, na Wybrzeżu Słowińskim. Miasto z dwoma letnimi kąpieliskami morskimi i przystanią rybacką na osiedlu Unieście.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 9, 'Białystok', 'Wśród miast wojewódzkich Polski, Białystok jest drugim miastem pod względem gęstości zaludnienia i dziesiątym pod względem liczby ludności. Część z zabytków została oznakowana na pięciu turystycznych szlakach tematycznych utworzonych w mieście.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 10, 'Wrocław', 'Miasto posiada wiele punktów widokowych zlokalizowanych na zabytkach, są to m.in.: wieża północna Katedry św. Jana Chrzciciela, wieża Bazyliki św. Elżbiety, Wieża matematyczna Uniwersytetu Wrocławskiego, Mostek Czarownic między wieżami Katedry polskokatolickiej św. Marii Magdaleny. ');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 12, 'Poznań', 'W mieście zobaczyć można liczne zabytkowe kościoły, secesyjne kamienice, pomniki, a także monumentalne budowle dawnej Dzielnicy Cesarskiej wzniesione wokół Parku Wieniawskiego – m.in. Zamek Cesarski, Aula i Collegium Minus UAM oraz opera.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 13, 'Lublin', 'Lublin jest największym ośrodkiem naukowo-kulturalnym po wschodniej stronie Wisły, co przekłada się na liczne imprezy kulturalne organizowane przez społeczność studencką, a także władze samorządowe.');
INSERT INTO `mydb`.`Cities` (`IDCity`, `IDImage`, `Name`, `Description`) VALUES (DEFAULT, 14, 'Szczecin', 'Stolica Pomorza Zachodniego jest jednym z najważniejszych polskich ośrodków kultury. Do najważniejszych instytucji kultury należą Muzeum Narodowe w Szczecinie, Zamek Książąt Pomorskich, Książnica Pomorska i Filharmonia im. Mieczysława Karłowicza.');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Guides`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 1, 'Jan', 'Nowak', 40, 'jan@o2.pl', 123543123, 'Przewodnik Tatrzański I klasy zrzeszony w Stowarzyszeniu Wysokogórskich Przewodników Tatrzańskich.  Ratownik TOPR, Instruktor Wspinaczki Skałkowej, Instruktor Narciarstwa PZN, Taternik – członek Klubu Wysokogórskiego w Zakopanem.', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 2, 'Marek', 'Kowal', 23, 'merk.ad@interia.pl', 432345654, 'Absolwent Etnologii i Antropologii Kultury Uniwersytetu Jagiellońskiego oraz Studiów Regionu Morza Bałtyckiego Uniwersytetu w Turku.\nOd wielu lat związany z Krakowem, posiada uprawnienia licencjonowanego przewodnika miejskiego po Krakowie, przewodnika Ojcowskiego Parku Narodowego i pilota wycieczek.', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 3, 'Kamila', 'Kowalska', 23, 'kamil.a@o2.pl', 123123123, 'Jeśli chcą Państwo poznać Trójmiasto oraz okolicę w ciekawy i niekonwencjonalny sposób, to zapraszam do skorzystania z moich usług, dzięki czemu z pewnością długo nie zapomną Państwo pobytu nad morzem', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 4, 'Kamila', 'Nowak', 35, 'kaminow@gmail.com', 123123532, 'Zapraszamy na wysokogórską przygodę. Wycieczki na najwyższe i najpiękniejsze szczyty Tatrzańskie w towarzystwie Przewodnika Tatrzańskiego / Międzynarodowego Przewodnika Wysokogórskiego IVBV.', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 5, 'Andrzej', 'Bukowski', 33, 'abuk@gmail.com', 111789999, 'Od lat oprowadzam turystów po górach, robię to z wielką pasją!', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 6, 'Tomasz', 'Galica', 19, 'gralica@gmail.com', 333444767, 'Chyba każdy powinien kiedyś wybrać się na wycieczkę po tatrach, poczuć świeże powietrze, zobaczyć wspaniałe krajobrazy i poznać tajemnicze miejsca.', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 7, 'Maria', 'Polan', 55, 'mapolan@onet.pl', 112343585, 'Przewodnictwo to moja pasja. Oprowadzam zarówno osoby indywidalne jak i grupy. Mile widziane wycieczki z dziećmi. Oferuję pełen pakiet usług.', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 8, 'Jan', 'Gąsienica', 22, 'janogo@o2.pl', 444333666, 'Student Wydziału Historii Uniwersytetu Jagiellońskiego, licencjonowany przewodnik miejski. Krakowianin z dziada pradziada. Od najmłodszych lat pasjonowało go poznawanie tajemnic rodzinnego miasta.', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 9, 'Mariusz', 'Piła', 23, 'mariu.pi@gmail.com', 607547347, 'Zapraszam na wspaniałe wycieczki zarówno latem jak i zimą!', 'admin');
INSERT INTO `mydb`.`Guides` (`IDGuide`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Description`, `Password`) VALUES (DEFAULT, 10, 'Anna', 'Zając', 36, 'annazaa@o2.pl', 675345274, 'Jestem przewodnikiem z pasją, od lat oprowadzam ludzi po najładniejszych zakątkach naszego miasta. Zapraszam do skorzystania z mojej oferty!', 'admin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Dates`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 1, '2019-06-20 12:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 2, '2019-06-20 12:00:00', 60);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 3, '2019-06-20 12:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 3, '2019-06-19 10:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 2, '2019-06-19 10:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 7, '2019-06-21 12:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 9, '2019-06-23 12:00:00', 180);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 2, '2019-06-24 10:00:00', 60);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 2, '2019-06-24 08:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 3, '2019-06-25 07:00:00', 60);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 5, '2019-06-25 08:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 5, '2019-06-26 10:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 8, '2019-06-26 10:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 4, '2019-06-27 08:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 4, '2019-06-28 10:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 6, '2019-06-24 08:00:00', 180);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 1, '2019-06-25 07:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 6, '2019-06-25 08:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 7, '2019-06-20 12:00:00', 120);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 8, '2019-06-19 10:00:00', 90);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 10, '2019-06-24 08:00:00', 180);
INSERT INTO `mydb`.`Dates` (`IDDate`, `IDGuide`, `Date`, `Duration`) VALUES (DEFAULT, 10, '2019-06-25 07:00:00', 120);

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Users`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Jan', 'Nowak', 16, 'jadno@o2.pl', NULL, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 2, 'Katarzyna', 'Tatar', 23, 'jadta@o2.pl', 123128792, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Tomasz', 'Kowalski', 22, 'kowal@gmail.com', 111222555, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Maciek', 'Pawlik', 45, 'pawlik@gmial.com', NULL, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Kamila', 'Barna', 32, 'kamimi@onet.com', NULL, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Andrzej', 'Maciej', 26, 'andrze@gmail.com', NULL, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 3, 'Jakub', 'Kosa', 30, 'jakuoko@gmai.com', NULL, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Mateusz', 'Lasek', 44, 'kateu@gmail.com', 578376467, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 7, 'Marek', 'Topola', 35, 'matu@o2.pl', 123444555, 'admin');
INSERT INTO `mydb`.`Users` (`IDUser`, `IDImage`, `Name`, `Surname`, `Age`, `Email`, `PhoneNumber`, `Password`) VALUES (DEFAULT, 0, 'Kalina', 'Osa', 22, 'kalikao@gmail.com', NULL, 'admin');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Opinions`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 1, 1, '2018-12-19', 'dobry przedwonik polecam');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 4, 2, '2018-12-12', 'polecam!');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 6, 3, '2018-12-13', 'Przewodnik z dużą wiedzą , godny polecenia');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 2, 3, '2018-12-14', 'Wycieczka naprawdę się udałą, dzieci ani trochę nie się nudziły!');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 2, 4, '2018-12-14', 'Wcześniej zwiedziałem miasta samemu, ale odkąd robię to z przewodnikiem jest zdecydowanie lepiej');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 3, 7, '2018-12-22', 'Mimo złej pogody, udało nam się zwiedzić naprawdę wiele ciekawych miejsc.\nMimo złej pogody, udało nam się zwiedzić naprawdę wiele ciekawych miejsc.');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 7, 8, '2018-12-04', 'Przewodnik bardzo kompetentny, z wieloletnią praktyką.');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 5, 3, '2019-05-05', 'Super wycieczka!');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 8, 4, '2019-06-01', 'Polecam, bardzo udane zwiedzanie!');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 9, 6, '2019-06-02', 'Super!');
INSERT INTO `mydb`.`Opinions` (`IDOpinion`, `IDGuide`, `IDUser`, `Date`, `Contents`) VALUES (DEFAULT, 10, 3, '2019-06_03', 'Bardzo fajny przewodnik:)');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`GuideInCity`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 2, 1);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 5, 2);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 3, 5);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 1, 2);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 4, 5);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 3, 6);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 6, 2);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 8, 1);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 7, 7);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 4, 2);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 5, 4);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 9, 3);
INSERT INTO `mydb`.`GuideInCity` (`IDGuideInCity`, `IDGuide`, `IDCity`) VALUES (DEFAULT, 10, 8);

COMMIT;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
