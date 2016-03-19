$(function()
{
    $("#form").submit(function(event)
    {
        var enviaForm = true;
        var campos = ["nombre", "correo", "username", "password", "confirmar_password"];
        for(var i = 0; i < campos.length; i++)
        {
            if($("#" + campos[i]).val().length === 0)
            {
                sweetAlert("Completar campos", "Por favor completa el campo " + campos[i], "error");
                enviaForm = false;
                break;
            }
            if($("#" + campos[i]).val().length >= 50)
            {
                sweetAlert("Campo no valido", "El " + campos[i] + " que ingreso es demasiado largo.", "error");
                enviaForm = false;
                break;
            }
            if($("#" + campos[i]).val().length <= 2)
            {
                sweetAlert("Campo no valido", "El " + campos[i] + " que ingreso no es valido", "error");
                enviaForm = false;
                break;
            }
        }
        if(enviaForm)
        {
            if(!($("#" + campos[3]).val() === $("#" + campos[4]).val()))
            {
                sweetAlert("Contraseña no valida", "Las contraseñas no coinciden", "error");
                enviaForm = false;
            }
            if(!validaPassword($("#password").val()))
            {
                sweetAlert("Contraseña no valida", "La contraseña debe tener minimo 6 caracteres y al menos un numero y una letra", "error");
                enviaForm = false;
            }
            //Validar que el e-mail sea válido...
            if(!validaEmail($("#correo").val()))
            {
                sweetAlert("Correo inválido", "El correo "+($("#correo").val())+", no es válido", "error");
                enviaForm = false;
            }
        }
        return enviaForm;
    });
    
    var validaEmail = function(email)
	{
		var emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
        return emailReg.test(email);
	};
    var validaPassword = function(password){
        var passwordReg = /(?=^.{6,}$)((?=.*\d))(?=.*[A-Za-z]).*/;
        return passwordReg.test(password);
    }
});
