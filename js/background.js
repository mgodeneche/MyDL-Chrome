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
	postRequest(myJson,"downloadAdd",readResponse);
});

function registerCall(){
	$("#main").hide();
	$("#register").show();
	$("#reset").hide();
	$("#registerBack").click(function(){
		mainCall();
		return false;
	});
	$("#reg").click(function(){
		signup();
		return false;
	});
  
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
				return false; 
			}
		});
	});
}

function resetCall(){
	$("#main").hide();
    $("#register").hide();
    $("#reset").show();
	$("#registerBack").click(function(){
		mainCall();
		return false;
	});
	$("#reg").click(function(){
		resetPassword();
		return false;
	});
    $(document).ready(function () {

		$('#resetForm').validate({
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
				return false; 
		    }
		});
    });
}

function mainCall(){
	
	$("#main").show();
    $("#register").hide();
    $("#reset").hide();
	$("#log").click(function(){
		login();
		return false;
	});
	$("#reg").click(function(){
		registerCall();
		return false;
	});
	$("#fpw").click(function(){
		resetCall();
		return false;
	});
  
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
				login();
				return false; 
			}
		});
	});
}

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
	var email = $('#loginForm #userMail').val();
	var password = $('#loginForm #userPassword').val();
	alert(email);
	alert(password);
	var user = new User(email,password);
	postRequest(JSON.stringify(user),"auth");
 }

function signup(){
	var email = $('#registerForm #userMail').val();
	var confirmEmail = $('#registerForm #confirmMail').val();
	var pass = $('#registerForm #userPassword').val();
	var passConfirm = $('#registerForm #confirmPassword').val();

	var user = new User('vlogin',pass,email);
	var myJson = JSON.stringify(user);
	postRequest(myJson,"register");
}

function resetPassword(){
	var email = $('#resetForm #userMail').val();
	var myJson = JSON.stringify(email);
	postRequest(myJson,"reset");
}

function getXMLHttpRequest() {
	var xhr = null;
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}else{
			xhr = new XMLHttpRequest(); 
		}
	}else{
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	return xhr;
}

function postRequest(jsonData,param){
	$.ajax({
		method : "POST",
		url : serverUrl+'/'+param,
		data : jsonData,
		success : function(response){
			alert(response);
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