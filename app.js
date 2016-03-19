var express 		= 	require("express"),
	app				= 	express(),
	puerto 			= 	process.env.PORT || 3000,
	db   			= 	require('./modulos/database'),
	cons 			=	require("consolidate"),
	rutas			=	require('./modulos/rutas'),
	bodyParser  	=   require('body-parser'),
    passport 		= 	require('passport'),
    LocalStrategy 	= 	require('passport-local').Strategy,
    cookieParser 	= 	require('cookie-parser'),
    session 		= 	require('express-session'),
    bcrypt 			= 	require('bcrypt-nodejs');
	db.conectaDatabase();
	//Para el manejo de autenticación...
	passport.use(new LocalStrategy(function(username, password, done)
	{
		var sql = "select clave, usuario from users WHERE usuario = '" + (username) + "'";
		db.queryMysql(sql, function(err, response)
		{
			if (err || response.length === 0 || !bcrypt.compareSync(password, response[0].clave))
			{
				return done(null, false, {message: 'Usuario o contraseña no válido', usuario : username});
			}
			return done(null, response);
		});
	}));

	passport.serializeUser(function(user, done)
	{
	    done(null, user[0].usuario);
	});

	passport.deserializeUser(function(username, done)
	{
		var sql = "select idusuario, nombre from users WHERE usuario = '" + (username) + "'";
		db.queryMysql(sql, function(err, response)
		{
			if(response)
			{
				done(null, response);
			}
		});
	});


	app.engine("html", cons.swig); 
	app.set("view engine", "html");
	app.set("views", __dirname + "/vistas");
	
	app.use(express.static('public'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(cookieParser());
	app.use(session({
						secret: '$2a$10$GsvafBLCODG.gUNlB987fORJjTiwjiKs42MjAIqTMB3lour44n39K',
						cookie: { maxAge: 3600000 },
						resave: true,
						saveUninitialized: true
					}));
	//app.use(session({secret: '$2a$10$GsvafBLCODG.gUNlB987fORJjTiwjiKs42MjAIqTMB3lour44n39K'}));
	app.use(passport.initialize());
	app.use(passport.session());

	app.get("/", function(req, res)
	{
		if(req.isAuthenticated())
		{
			res.render("menu", {
				titulo 	:  	"JUEGO DE NIÑOS"
			});
		}
		else{
			res.render("login", {
				titulo 	:  	"JUEGO DE NIÑOS"
			});
		}
	});

	//Mostrar la página de autenticación...
	app.get("/login", rutas.login);
	//Para realizar el proceso de autenticación...
	app.post('/login', rutas.loginPost);
	//Para cerrar la sesión..
	app.get("/logout", rutas.logout);
	//Para mostrar la vista de registro..
	app.get("/registro", rutas.registro);
	//Para guardar el usuario...
	app.post("/registro", rutas.registroPost);

	app.post("/nuevoPuntaje", rutas.nuevoPuntaje);

	app.post("/getPuntos", rutas.getPuntos);
	
	app.get('/getQuestions', rutas.getQuestions);

	app.get('/diagnostico', rutas.diagnostico);

	app.post('/isValid', rutas.isValid);

	app.post('/variable', rutas.variable);

	app.get('/juego', rutas.juego);

	app.get('/resultados', rutas.resultados);

	app.get('/menu', rutas.menu);

	app.get("*", rutas.notFound404);

	var server = app.listen(puerto, function(err) {

	   if(err) throw err;

	   var message = 'Servidor corriendo en @ http://localhost:' + server.address().port;
		console.log(message);
	});
