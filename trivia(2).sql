-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-01-2016 a las 20:23:41
-- Versión del servidor: 5.6.17
-- Versión de PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `trivia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE IF NOT EXISTS `preguntas` (
  `idpregunta` int(11) NOT NULL DEFAULT '0',
  `numpregunta` int(5) DEFAULT NULL,
  `nivel` int(11) NOT NULL,
  `pregunta` varchar(200) DEFAULT NULL,
  `opcion1` varchar(100) DEFAULT NULL,
  `opcion2` varchar(100) DEFAULT NULL,
  `opcion3` varchar(100) DEFAULT NULL,
  `opcion4` varchar(100) DEFAULT NULL,
  `correcta` int(5) DEFAULT NULL,
  PRIMARY KEY (`idpregunta`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`idpregunta`, `numpregunta`, `nivel`, `pregunta`, `opcion1`, `opcion2`, `opcion3`, `opcion4`, `correcta`) VALUES
(1, 1, 1, 'LA PELOTA', 'palabra-imagen/pelota.png', 'palabra-imagen/muñeco.png', 'palabra-imagen/moto.jpg', 'palabra-imagen/carro.jpg', 1),
(2, 2, 1, 'EL LAPIZ', 'palabra-imagen/libro.jpg', 'palabra-imagen/colores.jpg', 'palabra-imagen/tijeras.jpg', 'palabra-imagen/lapiz.png', 4),
(3, 3, 1, 'EL AZUL', 'palabra-imagen/rojo.jpg', 'palabra-imagen/amarillo.jpg', 'palabra-imagen/azul.jpg', 'palabra-imagen/verde.jpg', 3),
(4, 4, 1, 'EL PERRO', 'palabra-imagen/gato.jpg', 'palabra-imagen/perro.jpg', 'palabra-imagen/gallina.jpg', 'palabra-imagen/vaca.jpg', 2),
(5, 5, 1, 'EL LORO', 'palabra-imagen/loro.jpg', 'palabra-imagen/chupaflor.jpg', 'palabra-imagen/canario.jpg', 'palabra-imagen/mariposa.jpg', 1),
(6, 6, 2, 'numero-imagen/uno.png', 'numero-imagen/persona1.jpg', 'numero-imagen/persona5.jpg', 'numero-imagen/personas3.jpg', 'numero-imagen/personas7.jpg', 1),
(7, 7, 2, 'numero-imagen/cinco.png', 'numero-imagen/mano1.jpg', 'numero-imagen/mano2.jpg', 'numero-imagen/mano4.jpg', 'numero-imagen/mano5.jpg', 4),
(8, 8, 2, 'numero-imagen/siete.png', 'numero-imagen/cuatroma.png', 'numero-imagen/seisma.png', 'numero-imagen/sietema.png', 'numero-imagen/tresma.png', 3),
(9, 9, 2, 'numero-imagen/tres.png', 'numero-imagen/seism.png', 'numero-imagen/cincom.png', 'numero-imagen/unom.png', 'numero-imagen/tresm.png', 4),
(10, 10, 2, 'numero-imagen/dos.png', 'numero-imagen/carita5.png', 'numero-imagen/carita2.png', 'numero-imagen/carita4.png', 'numero-imagen/carita9.png', 2),
(11, 11, 3, 'imagen-numero/personas3.jpg', 'imagen-numero/cero.png', 'imagen-numero/tres.png', 'imagen-numero/diez.png', 'imagen-numero/dos.png', 2),
(12, 12, 3, 'imagen-numero/mano1.jpg', 'imagen-numero/uno.png', 'imagen-numero/siete.png', 'imagen-numero/dos.png', 'imagen-numero/seis.png', 1),
(13, 13, 3, 'imagen-numero/carita4.png', 'imagen-numero/cuatro.png', 'imagen-numero/cinco.png', 'imagen-numero/nueve.png', 'imagen-numero/ocho.png', 1),
(14, 14, 3, 'imagen-numero/seisma.png', 'imagen-numero/tres.png', 'imagen-numero/siete.png', 'imagen-numero/cero.png', 'imagen-numero/seis.png', 4),
(15, 15, 3, 'imagen-numero/cincom.png', 'imagen-numero/diez.png', 'imagen-numero/cuatro.png', 'imagen-numero/cinco.png', 'imagen-numero/uno.png', 3),
(16, 16, 4, 'imagen-sonido/gallina.png', 'imagen-sonido/gallina.mp3', 'imagen-sonido/paloma.mp3', 'imagen-sonido/pajaro.mp3', 'imagen-sonido/mosca.mp3', 1),
(17, 17, 4, 'imagen-sonido/elefante.png', 'imagen-sonido/leon.mp3', 'imagen-sonido/caballo.mp3', 'imagen-sonido/burro.mp3', 'imagen-sonido/elefante.mp3', 4),
(18, 18, 4, 'imagen-sonido/cabra.jpg', 'imagen-sonido/gato.mp3', 'imagen-sonido/cabra.mp3', 'imagen-sonido/perro.mp3', 'imagen-sonido/mico.mp3', 2),
(19, 19, 4, 'imagen-sonido/pato.jpg', 'imagen-sonido/vaca.mp3', 'imagen-sonido/marrano.mp3', 'imagen-sonido/pato.mp3', 'imagen-sonido/pollo.mp3', 3),
(20, 20, 4, 'imagen-sonido/serpiente.jpg', 'imagen-sonido/serpiente.mp3', 'imagen-sonido/leon.mp3', 'imagen-sonido/lobo.mp3', 'imagen-sonido/rana.mp3', 1),
(21, 21, 5, 'sonido-imagen/gallo.mp3', 'sonido-imagen/aguila.jpg', 'sonido-imagen/cangrejo.png', 'sonido-imagen/gallo.png', 'sonido-imagen/pajaro.jpg', 3),
(22, 22, 5, 'sonido-imagen/gato.mp3', 'sonido-imagen/pollo.png', 'sonido-imagen/ardilla.png', 'sonido-imagen/conejo.jpg', 'sonido-imagen/gato.jpg', 4),
(23, 23, 5, 'sonido-imagen/perro.mp3', 'sonido-imagen/leon.jpg', 'sonido-imagen/perro.jpg', 'sonido-imagen/buho.jpg', 'sonido-imagen/delfin.jpg', 2),
(24, 24, 5, 'sonido-imagen/vaca.mp3', 'sonido-imagen/estrella.png', 'sonido-imagen/mariquita.jpg', 'sonido-imagen/vaca.jpg', 'sonido-imagen/caballo.jpg', 3),
(25, 25, 5, 'sonido-imagen/rana.mp3', 'sonido-imagen/rino.jpg', 'sonido-imagen/rana.jpg', 'sonido-imagen/tigre.jpg', 'sonido-imagen/tortuga.jpg', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntuacion`
--

CREATE TABLE IF NOT EXISTS `puntuacion` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `puntos` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `puntuacion`
--

INSERT INTO `puntuacion` (`id`, `puntos`, `usuario`, `fecha`) VALUES
(1, 89, 'andres', '2016-01-16 10:16:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `idusuario` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT '',
  `usuario` varchar(100) DEFAULT NULL,
  `clave` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `fecha` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`idusuario`, `nombre`, `usuario`, `clave`, `email`, `fecha`) VALUES
(1, 'andres', 'andres', '$2a$10$O93JaIaF7WAI2Ag1AXeE0.Fqm0YjWzbhGTkce7Yn0qg4eWkTsfCaS', 'andres@lsdf.com', '1/16/2016');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
