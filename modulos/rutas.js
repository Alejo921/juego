 var bcrypt          = 	require('bcrypt-nodejs'),
 	 passport 	    = 	require('passport'),
 	 date 			= 	new Date(),
     fechaActual 	= 	(date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(),
     hora           =   (date.getHours());
     db   		    = 	require('./database'),
     db.conectaDatabase();


var login = function(req, res)
{
	if(req.isAuthenticated())
	{
		user = req.user;
		res.render("menu", {

			titulo 	:  	"JUEGO DE NIÑOS",
            usuario	:	 user[0].nombre
		});

	}
	else{
		res.render("login", {
			titulo 	:  	"JUEGO DE NIÑOS"
		});
	}
};

var loginPost = function (req, res, next)
{
	if(req.isAuthenticated())
	{
		user = req.user;
		res.render("menu", {

			titulo 	:  	"JUEGO DE NIÑOS",
            usuario	:	 user[0].nombre
		});
	}
	else{
		passport.authenticate('local', {
		successRedirect: '/menu',
		failureRedirect: '/login'},
		function(err, user, info)
		{
			if(err)
			{
				return res.render('login', {titulo: 'JUEGO DE NIÑOS', error: err.message, usuario : info.usuario});
			}
			if(!user)
			{
				return res.render('login', {titulo: 'JUEGO DE NIÑOS', error: info.message, usuario : info.usuario});
			}
			return req.logIn(user, function(err)
			{
				if(err)
				{
					return res.render('login', {titulo: 'JUEGO DE NIÑOS', error: err.message, usuario : info.usuario});
				}
				else
				{
					user = req.user;
					return res.redirect('/menu');
				}
			});
		})(req, res, next);
	}
};

var logout = function(req, res)
{
	if(req.isAuthenticated())
	{
		req.logout();
    }
	res.redirect('/login');
}

var registro =  function(req, res)
{
	if(req.isAuthenticated())
	{
		user = req.user;
		res.render("menu", {

			titulo 	:  	"JUEGO DE NIÑOS",
            usuario	:	 user[0].nombre
		});
	}
	else{
		res.render("registro", {
			titulo 	:  	"JUEGO DE NIÑOS",
			data 	:	[]
		});
	}
};

var registroPost = function(req, res, next)
{
    //Buscar si el nombre de usuario o correo ya existen...
	var data = req.body;
	var sql = "select count(*) as numero from users " +
			   "where usuario = '"+(data.username)+"' or " +
			   		  "email = '"+(data.correo)+"'";
	db.queryMysql(sql, function(err, response)
	{
		if(response[0].numero !== 0)
		{
			res.render('registro', {
									titulo: 'JUEGO DE NIÑOS',
									error: 'Nombre de usuario o correo ya existe',
									data : [data.nombre, data.correo, data.username]
								});
		}
		else
		{
            var password = bcrypt.hashSync(data.password);
			sql = "INSERT INTO users (nombre, usuario, clave, email, fecha) " +
					  "VALUES ('" + data.nombre + "', '" + data.username + "', " +
					  		   "'" + password + "', '"+data.correo+"', '" + fechaActual + "')";
			db.queryMysql(sql, function(err, response)
			{
				if (err || response.affectedRows === 0)
				{
					res.render('registro');
				}
				loginPost(req, res, next);
			});
		}
	});
};

var nuevoPuntaje = function(req, res, next)
{
	sql = "INSERT INTO `trivia`.`puntuacion` (`puntos`, `usuario`, `fecha`) VALUES ("+ req.body.puntos +", '"+req.body.usuario+"', NOW());";
	db.queryMysql(sql, function(err, response)
	{
		if (err || response.affectedRows === 0)
		{
			res.render('login');
		}
	});
};


var getPuntos =  function(req, res)
{
	if(req.isAuthenticated())
	{
		db.queryMysql("SELECT `puntos`, `fecha` FROM `puntuacion` WHERE `usuario` = '" +req.body.usuario+"';", function(err,data){
			
			if (err) throw err;
			res.json(data);
		});
	}
	else
		res.redirect('/login');		
};
var getQuestions =  function(req, res)
{
	if(req.isAuthenticated())
	{
		db.queryMysql("SELECT numpregunta,nivel,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas ORDER BY nivel, rand();", function(err,data){
			
			if (err) throw err;
			res.json(data);
		});
	}
	else
		res.redirect('/login');		
};

var diagnostico =  function(req, res)
{
	if(req.isAuthenticated())
	{
		db.queryMysql("(SELECT numpregunta,nivel,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas where nivel=1 ORDER BY rand() limit 2) union all (SELECT numpregunta,nivel,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas where nivel=2 ORDER BY rand() limit 2) union all (SELECT numpregunta,nivel,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas where nivel=3 ORDER BY rand() limit 2) union all (SELECT numpregunta,nivel,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas where nivel=4 ORDER BY rand() limit 2) union all (SELECT numpregunta,nivel,pregunta,opcion1,opcion2,opcion3,opcion4 FROM preguntas where nivel=5 ORDER BY rand() limit 2)", function(err,data){
				
				if (err) throw err;
				res.json(data);
			});
	}
	else
		res.redirect('/login');	
		
};

var isValid =  function(req, res)
{
	if(req.isAuthenticated())
	{
		db.queryMysql("SELECT correcta FROM preguntas WHERE numpregunta = " + req.body.numPregunta , function(err,data){
		
		if (err) throw err;
		
		res.json({
			
						respuestaCorrecta : data[0].correcta,
						correcto	:       data[0].correcta === req.body.respuesta ? true : false
			});
		});
	}
	else
		res.redirect('/login');	

};
var variable =  function(req, res)
{
	if(req.isAuthenticated())
	{
		res.json({
				usuario : req.user
		});
	}
	else
		res.redirect('/login');	

	console.log(req.user);

};
var variable2 =  function(req, res)
{
	console.log(req.nombre);

};


var juego = function(req, res)
{
	if(req.isAuthenticated())
	{
		res.render("juego");
	}
	else
		res.redirect('/login');	
};

var menu = function(req, res)
{
	if(req.isAuthenticated())
	{
		user = req.user;
		res.render("menu", {

			titulo 	:  	"JUEGO DE NIÑOS",
            usuario	:	 user[0].nombre
		});
	}
	else
		res.redirect('/login');	
};
var resultados = function(req, res)
{
	if(req.isAuthenticated())
	{
		res.render("resultados");
	}
	else
		res.redirect('/login');	
};

var notFound404 = function(req, res)
{
	
	res.status(404).send("Página no encontrada :( en el momento");
};

module.exports.login = login;
module.exports.loginPost = loginPost;
module.exports.logout = logout;
module.exports.registro = registro;
module.exports.registroPost = registroPost;
module.exports.nuevoPuntaje = nuevoPuntaje;
module.exports.getPuntos = getPuntos;
module.exports.getQuestions = getQuestions;
module.exports.diagnostico = diagnostico;
module.exports.isValid = isValid;
module.exports.variable = variable;
module.exports.variable2 = variable2;
module.exports.juego = juego;
module.exports.menu = menu;
module.exports.resultados = resultados;
module.exports.notFound404 = notFound404;

