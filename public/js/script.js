$(function()
{
	var numPregunta = 0, //El indice del array de preguntas...   url
		contPregunta = 0, //El número de la pregunta, que se consultará al servicio...
		tiempo = 0, //Guardará el valor del setInterval
		cuentaTiempo = 0, //Contador del tiempo...
		preguntas = [], //Almacena las preguntas que provienen del servicio...
		seleccionado = false, //Indica si se ha seleccionado una respuesta...
		modo=readCookie('modo');//Indica si se jugara una partida normal o en modo diagnostico donde 1 es juego y 2 es diagnostico...
		correctas=0; //indica cuantas preguntas se respondieron bien para sacar la puntuacion
		n1=0; n2=0; n3=0; n4=0; n5=0;
	var usuario = readCookie('usuario')
	//Para los servicios que se consumirán...
    var nomServicios = [
							{
								servicio 	: 	"Trae todas las Preguntas",
								urlServicio	: 	"getQuestions",
								metodo		: 	"GET"
							},
							{
								servicio 	: 	"Trae Preguntas de la prueba diagnostico",
								urlServicio	: 	"diagnostico",
								metodo		: 	"GET"
							},
							{
								servicio 	: 	"Validar una respuesta",
								urlServicio	: 	"isValid",
								metodo		: 	"POST"
							},
							{
								servicio 	: 	"Ingresa el nuevo puntaje",
								urlServicio	: 	"nuevoPuntaje",
								metodo		: 	"POST"
							}
						];

	var audios = [
					{
						sonido 	: 	"presiona.mp3", 
						label	: 	"presiona"
					},
					{
						sonido 	: 	"error.mp3", 
						label	: 	"error"
					}, 
					{
						sonido 	: 	"tada.mp3", 
						label	: 	"tada"
					}
				];


	//Función que invoca los servicios del Backend... html
    var consumeServicios = function(tipo, val, callback)
	{
		var servicio = {
							url 	: nomServicios[tipo - 1].urlServicio,
							metodo	: nomServicios[tipo - 1].metodo,
							datos 	: tipo === 1 ? "" : JSON.stringify(val)
						};
		//Invocar el servicio...
		$.ajax(
		{
			url 		: servicio.url,
			type 		: servicio.metodo,
			data 		: servicio.datos,
			dataType 	: "json",
			contentType: "application/json; charset=utf-8"
		}).done(function(data)
		{
            callback(data);
		});
	};

	//Para cargar los audios del juego...
	for(var audio = 0; audio < audios.length; audio++)
	{
		createjs.Sound.registerSound("sounds/" + audios[audio].sonido, audios[audio].label);
	}
	console.log(modo);
	//Traer las preguntas...
	

	try{
		nom_div("play").addEventListener('click', function(event){         
			window.location="juego";
			writeCookie('modo', 1, 3);
			
		});
		nom_div("diag").addEventListener('click', function(event){
			window.location="juego";
			writeCookie('modo', 2, 3);
		});
		nom_div("ins").addEventListener('click', function(event){
				swal("INSTRUCCIONES", "Diviertete con este increible juego donde demostraras que sabes relacionar objetos, palabras, sonidos e imagenes, " +
					" en el centro de la pantalla aparecera el objeto que tienes que relacionar con una de las opciones de respuesta que se encuentran en las esquinas de tu pantalla, " +
					" si deseas saber en que nivel estas podras realizar la prueba diagnostico en la cual tendras que responder 10 preguntas conbinando de a 2 preguntas de cada nivel o si deseas jugar registrando tu puntuacion deberas reponder 25 preguntas y al final podras ver tu historial de partidas jugadas.  DIVIERTETE!!!")
		});
	}catch(Exception){
		consumeServicios(modo, "", function(data){
			$("#fade").hide();
			$("#loading").hide();
			preguntas = data;
			cargarPregunta();
		});

	}
	//Para cargar una pregunta del vector de preguntas...
	var cargarPregunta = function()
	{
		var miPregunta = preguntas[contPregunta];
		document.body.style.backgroundImage="url("+"img/fondo_" + miPregunta.nivel + ".jpg"+")";
		$("#titulo").html("Pregunta Nº " + (contPregunta + 1));
		if(miPregunta.nivel == 2 || miPregunta.nivel == 3 || miPregunta.nivel == 4)																						
			$("#pregunta").html("<img src='"+ "img/" + miPregunta.pregunta +"' alt='' style='width:90%; height:90%; margin-top: 4%;'>");
		else{
			if(miPregunta.nivel == 5)
				$("#pregunta").html("<audio controls style='width: 90%; height:50px; position:absolute; margin-left:-45%;'><source src='img/" + miPregunta.pregunta +"' type='audio/mpeg' width='10px'>Your browser does not support the audio element.</audio>")
			else
				$("#pregunta").html(miPregunta.pregunta) 
		}
		
		//Guardar el número de la pregunta que se está usando...
		numPregunta = miPregunta.numpregunta;
		//Para el tiempo...
		cuentaTiempo = 60;
		tiempo = setInterval(function(){
			cuentaTiempo--;
			$("#tiempo").html((cuentaTiempo <= 9 ? "0" + cuentaTiempo : cuentaTiempo) + "'");
			if(cuentaTiempo <= 0)
			{
				validaRespuesta(0);
			}
		}, 1000);
		//Para cargar las opciones de respuesta...
		for(var i = 1; i <= 4; i++)
		{
			if(miPregunta.nivel == 4){
				createjs.Sound.registerSound("img/" + miPregunta["opcion" + i], ("_"+ i));
				$("#sound_" + i).html("<img src='"+ "img/" + "chulito.jpg" +"' alt='' style='width:90%; height:90%; margin-top: 4%;'>")
				.click(function(event){
					//createjs.Sound.registerSound("sounds/" + audios[0].sonido, audios[0].label);
					//createjs.Sound.play("" + audios[0].label);
					
					//console.log(createjs.Sound.play("_" + i));
				}).hide() 
				  .delay(i * 100)
				  .fadeIn('slow')
				  .removeClass("correcto incorrecto");

				$("#sound_" + i).html("<audio controls style='width: 90%; position:absolute; margin-left:-45%;'><source src='img/" + miPregunta["opcion" + i] +"' type='audio/mpeg' width='10px'>Your browser does not support the audio element.</audio>")

				$("#opcion_" + i).html("<img src='"+ "img/" + "chulito.jpg" +"' alt='' style='width:90%; height:90%; margin-top: 4%;'>")
				.click(function(event){
				createjs.Sound.play("presiona");
				if(!seleccionado)
				{
					validaRespuesta(Number(this.id.split("_")[1]));
				}
				}).hide()
				  .delay(i * 100)
				  .fadeIn('slow')
				  .removeClass("correcto incorrecto");
			}
			else{
				try{
					document.getElementById("sound_" + i).style.display = "none";    
				}
				catch(Exception){}
				$("#opcion_" + i).html("<img src='"+ "img/" + miPregunta["opcion" + i] +"' alt='' style='width:90%; height:90%; margin-top: 4%;'>")
				.click(function(event){
					createjs.Sound.play("presiona");
					if(!seleccionado)
					{
						validaRespuesta(Number(this.id.split("_")[1]));
					}
				}).hide()
				  .delay(i * 100)
				  .fadeIn('slow')
				  .removeClass("correcto incorrecto");
		    }
		}
	};

	//Para validar la respuesta del usaurio...
	var validaRespuesta = function(respuesta)
	{
		$("#fade").show();
		$("#loading").show();
		seleccionado = true;
		//Se detiene el tiempo...
		$("#tiempo").html("60'");
		clearInterval(tiempo);
		//Servicio que validará si la respuesta es correcta o no...
		var validaRespuesta = {
									numPregunta : numPregunta,
									respuesta : respuesta
							  };
		consumeServicios(3, validaRespuesta, function(data)
		{
			$("#fade").hide();
			$("#loading").hide();
			//Guarda la respuesta correcta que viene del servicio..
			var respuestaCorrecta = data.respuestaCorrecta;
			if(data.correcto)
			{
				var miPregunta = preguntas[contPregunta];
				$("#opcion_" + respuesta).addClass('correcto');
				correctas++;
				if(miPregunta.nivel == 1) n1++;
				if(miPregunta.nivel == 2) n2++;
				if(miPregunta.nivel == 3) n3++;
				if(miPregunta.nivel == 4) n4++;
				if(miPregunta.nivel == 5) n5++;
			}
			else
			{
				$("#opcion_" + respuestaCorrecta).addClass('correcto');
				if(respuesta !== 0)
				{
					$("#opcion_" + respuesta).addClass('incorrecto');
				}
			}
			//Mostrar el mensaje de correcto o incorrecto...
			$("#mensaje").html("")
				 .css({color: data.correcto ? "#73BF43" : "#EB1C24"})
				 .hide('fast', function()
				 {
				 	if(data.correcto){
				 		_sound="tada";
				 		_title="Correcto!! :)";
						_imageUrl= "img/correcto.gif";
					}
					else{
						_sound="error";
				 		_title="Incorrecto :(";
						_imageUrl= "img/incorrecto.gif";
					}
			 		createjs.Sound.play(_sound);
					swal(
					{
						title:  _title,   
						text: "Presiona Aceptar para continuar",
						showCancelButton: false,   
						confirmButtonColor: "#DD6B55",  
						confirmButtonText: "Aceptar", 
						closeOnConfirm: false, 
						imageUrl	:   _imageUrl
					},
					function()
					{
						if(contPregunta < preguntas.length)
					 	{
					 		swal({title: "Cargando",   text: "Recargando página",   timer: 500,   showConfirmButton: false });
					 		cargarPregunta();
					 	}
					 	else
					 	{
					 		var mensaje="", location="";
					 		var datos = {
								puntos : ((n1*2)+(n2*3)+(n3*4)+(n4*5)+(n4*6)),
								usuario : usuario
						    };
							
					 		if(modo == 1){
					 			consumeServicios(4, datos, function(data){

								});
						 		writeCookie('n1', n1, 3); writeCookie('n2', n2, 3); writeCookie('n3', n3, 3); writeCookie('n4', n4, 3); writeCookie('n5', n5, 3);
								mensaje = "no hay mas preguntas respondiste " + correctas+ " preguntas correctas de un total de " + preguntas.length +"";
						 		location = "resultados";
					 		}
					 		else{
					 			mensaje = "has realizado tu prueba diagnostico con un porcentaje de acierto del " + (correctas/preguntas.length*100)+"%";
						 		location = "menu";
					 		}
					 		console.log(location);
					 		swal(
					 		{
					 			title: "Preguntas",
					 		    text: mensaje,
					 			showCancelButton: false,
					 			confirmButtonColor: "#DD6B55",
					 			confirmButtonText: "Aceptar",
					 			closeOnConfirm: false,
					 			type: "error",
					 		},
					 		function()
					 		{
					 			swal({title: "Cargando",   text: "Recargando página",   timer: 500,   showConfirmButton: false });
					 			window.location=location;
					 		});
					 	}
					}
				);
				seleccionado = false;
				contPregunta++;
			});
			
		});
	};
	function nom_div(div)
	{
		return document.getElementById(div);
	}

	function writeCookie(name,value,days) {
	    var date, expires;
	    if (days) {
	        date = new Date();
	        date.setTime(date.getTime()+(days*24*60*60*1000));
	        expires = "; expires=" + date.toGMTString();
	            }else{
	        expires = "";
	    }
	    document.cookie = name + "=" + value + expires + "; path=/";
	}

	function readCookie(name) {
	    var i, c, ca, nameEQ = name + "=";
	    ca = document.cookie.split(';');
	    for(i=0;i < ca.length;i++) {
	        c = ca[i];
	        while (c.charAt(0)==' ') {
	            c = c.substring(1,c.length);
	        }
	        if (c.indexOf(nameEQ) == 0) {
	            return c.substring(nameEQ.length,c.length);
	        }
	    }
	    return '';
	}
});

var validaEmail = function(email)
{
	var emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailReg.test(email);
};