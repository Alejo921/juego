var debug = "";
var n1=readCookie('n1'), n2=readCookie('n2'), n3=readCookie('n3'), n4=readCookie('n4'), n5=readCookie('n5');
window.onload = function()
{
	datos = [n1*20, n2*20, n3*20, n4*20, n5*20];
	canvas = nom_div('canvas'); 
	var c = canvas.getContext('2d'); 
	c.fillStyle = "white"; 
	c.fillRect(0,0,500,500);
	convenciones();
	responsive: true;
	var graficaDatos = function()
	{
		var posX = 0;
		var posY = 30;
		var alto = 0;
		c.clearRect (0,0,500,500);
		for(var i = 0; i < datos.length; i++)
		{   
		    /*
		    var grad = c.createLinearGradient(0,0,200,0); 
		    grad.addColorStop(0,"white");
		    grad.addColorStop(0.5, "red");
    		grad.addColorStop(1, "black"); 
		    */
		    if(i == 0)
		    	c.fillStyle = "#2D4E81";
		    if(i == 1)
		    	c.fillStyle = "#889634";
		    if(i == 2)
		    	c.fillStyle = "#3EA22A";
		    if(i == 3)
		    	c.fillStyle = "#7E0015";
		    if(i == 4)
		    	c.fillStyle = "#7B0051";

		    //c.fillStyle = grad; 
		    alto = datos[i];
		    posX = 40 + i * 95;
		    posY = 390 - alto * 3.5;
		    //c.fillRect(posX, posY, 50, alto*5);
		    c.fillRect(posX, posY, 60, alto * 3.5); 
		}
		convenciones();
	}
	function convenciones()
	{	
		//Adicionar convenciones...
		c.fillStyle = "white"; 
		c.lineWidth = 2.0; 
		c.beginPath(); 
		c.moveTo(30,10); 
		c.lineTo(30,390); ///linea de eje x
		c.lineTo(490,390); ///linea de eje x
		c.stroke();
		//adicionar los valores...
		c.fillStyle = "white"; 
		for(var i=0; i<11; i++) 
		{ 
		    c.fillText((10-i)*10 + "", 4, i*35+40); //numeros verticales i* altura +posicion
		    c.beginPath(); 
		    c.moveTo(25,i*35+40); //puntos de lineas 
		    c.lineTo(30,i*35+40); ///nhsxnhdxd
		    c.stroke(); 
		}  
		//valores en la base...
		var meses = ["nivel 1","nivel 2","nivel 3","nivel 4","nivel 5"]; 
		//draw horiz text 
		//for(var i=0; i<5; i++)
		for(var i in meses)
		{ 
		    c.fillText(meses[i], 55+ i*95, 410); 
		}
	}
	graficaDatos();
	function nom_div(div)
	{
		return document.getElementById(div);
	}
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