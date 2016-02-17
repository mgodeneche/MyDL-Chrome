/*
*   Definitions des variables
*/
var adminURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var chromiumURI ='mongodb://chromeExt:chromium@ds035750.mongolab.com:35750/mydl';
var testURI = "https://api.mongolab.com/api/1/databases/tp_secu/collections/adminDirectory";
var mydlURI = "https://api.mongolab.com/api/1/databases/mydl/collections/";
var userCol = "users";
var currdlCol = "currentdl"
var serverUrl = "http://localhost:8054";



mainCall();
chrome.downloads.onCreated.addListener(function (e) {
	console.log(e);
	var myJson = JSON.stringify(e);
  postRequest(myJson,"downloadAdd");
});

/*
*   Ajout des évenements
*/

function registerCall(){
  document.getElementById("main").style.display = "none";
  document.getElementById("register").style.display = "block";
  document.getElementById("reset").style.display = "none";
  document.getElementById("registerBack").addEventListener("click",mainCall,false);
  document.getElementById("reg").addEventListener("click",signup,false);
  
  $(document).ready(function () {
    $('#registerForm').validate({
      errorElement: "div",
      rules: {
        userMail: {
          required: true,
          email : true
        },
        confirmMail: {
          required: true,
          equalTo : "#registerForm #userMail"
        },
        userPassword:{
          required :true,
          minlength : 6
        },
        confirmPassword:{
          required :true,
          equalTo : "#registerForm #userPassword"
        }
      },
	   messages: {
                    userMail: {
						required: "Please enter correct email",
						email: "Please enter a valid email address"
					},
					confirmMail: {
						required: "Please enter correct email",
						equalTo : "Please enter same email adress"
					},
					userPassword:{
						required: "Please provide a password",
						minlength: "Your password must be at least 6 characters long"
					},
					confirmPassword:{
						required: "Please confirm your password",
						equalTo : 'Please enter same password'
					}
	   },
      submitHandler: function (form) { 
        signup();
      }
    });

  });
}

function resetCall(){
  document.getElementById("main").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("reset").style.display = "block";
  document.getElementById("resetBack").addEventListener("click",mainCall,false);
  document.getElementById("fpw").addEventListener("click",resetPassword,false);
  
  $(document).ready(function () {
    $('#resetForm').validate({ // initialize the plugin
      errorElement: "div",
      rules: {
        userMail: {
          required: true,
          email : true
        }

      },
	   messages: {
                    userMail: {
						required: "Please enter correct email",
						email: "Please enter a valid email address"
					}
	   },
      submitHandler: function (form) { 	  
        resetPassword();
      }
    });

  });
}
function mainCall(){
  document.getElementById("main").style.display = "block";
  document.getElementById("register").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("reg").addEventListener("click",registerCall,false);
  document.getElementById("fpw").addEventListener("click",resetCall,false);
  
  $(document).ready(function () {
    $('#loginForm').validate({
        errorElement: "div",
        rules: {
           userMail: {
           required: true,
           email : true
        },
        userPassword:{
           required :true,
           minlength : 6
        },
      },
	   messages: {
                    userMail: {
						required: "Please enter correct email",
						email: "Please enter a valid email address"
					},
                    userPassword: {
						required: "Please provide a password",
                        minlength: "Your password must be at least 6 characters long"
					}
                },
      submitHandler: function (form) { 
		if ($("#userMail").val() != "" && $("#userPassword").val() != "")
        login();
      }
    });

  });
}
/*

/*
* Definitions d'objets métiers
*/
function User(email, password){
	this.email = email;
	this.password = password;
}
function Download(owner,id,name,url,size){
  this.ownerEmail = owner;
  this.id = id;
  this.name = name;
  this.url = url;
  this.size = size;
}

function login(){
  console.log("authentication ...");
  var email = document.getElementById('userMail').value;
  var password = document.getElementById('userPassword').value;
  var user = new User(email,password);
  var myJson = JSON.stringify(user);
  postRequest(myJson,"auth");
 }

function signup(){
  console.log("register ...");
  var email = document.getElementById('userMail').value;
  var confirmEmail = document.getElementById('confirmMail').value;
  var pass = document.getElementById('userPassword').value;
  var passConfirm = document.getElementById('confirmPassword').value;

  var user = new User('vlogin',pass,email);
  console.log(User);
  console.log(user);
  var myJson = JSON.stringify(user);
  postRequest(myJson,"register");
}

function resetPassword(){
  console.log("Password reset ...");
  var email = document.getElementById('userMail').value;
  var myJson = JSON.stringify(email);
  postRequest(myJson,"reset");
}

function postRequest(jsonData,param){
  console.log("Trying Post Request : "+serverUrl);
  $.ajax({
	  method : "POST",
	  url : serverUrl+'/'+param,
	  data : jsonData,
	   success: function(data, textStatus, xhr) {
			switch(xhr.status){
				case 200 :
					document.getElementById("main").style.display = "none";
					document.getElementById("register").style.display = "none";
					document.getElementById("reset").style.display = "none";
					$("#authenticated").show();
				break;
				case 201 :
					document.getElementById("main").style.display = "none";
					document.getElementById("register").style.display = "none";
					document.getElementById("reset").style.display = "none";
					$("#registerDone").show();
				break;
				case 202 :
					document.getElementById("main").style.display = "none";
					document.getElementById("register").style.display = "none";
					document.getElementById("reset").style.display = "none";
					$("#activationDone").show();
				break;
			}
		},
		error: function(xhr, textStatus){
			switch(xhr.status){
				case 401 : 
					document.getElementById("errorLogin").style.display = "block";
					$("#loginForm #userMail").val("");
					$("#loginForm userPassword").val("");
				break;
				case 409 :
					document.getElementById("errorRegister").style.display = "block";
					$("#registerForm #userMail").val("");
					$("#registerForm #confirmMail").val("");
					$("#registerForm #userPassword").val("");
					$("#registerForm #confirmPassword").val("");
				break;
				case 403 :
					document.getElementById("errorReset").style.display = "block";
					$("#resetForm #userMail").val("");
			}
		}
  })
}
String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};