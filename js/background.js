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



//mainCall();
chrome.downloads.onCreated.addListener(function (e) {
  console.log(e);
  //TODO: Construite un objet download correct et l'envoyer
  var myJson = JSON.stringify(e);
  postRequest(myJson,"downloadAdd",readResponse);
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

    $('#registerForm').validate({ // initialize the plugin
      errorElement: "div",
      rules: {
        userMail: {
          required: true,
          email : true
        },
        confirmMail: {
          required: true,
          equalTo : "#userMail"
        },
        userPassword:{
          required :true,
          min : 6
        },
        confirmPassword:{
          required :true,
          equalTo : '#userPassword'
        }
      },
      submitHandler: function (form) { // for demo
        alert('valid form submitted'); // for demo
        return false; // for demo
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
      submitHandler: function (form) { // for demo
        alert('valid form submitted'); // for demo
        return false; // for demo
      }
    });

  });
}
function mainCall(){
  document.getElementById("main").style.display = "block";
  document.getElementById("register").style.display = "none";
  document.getElementById("reset").style.display = "none";
  document.getElementById("log").addEventListener("click",login, false);
  document.getElementById("reg").addEventListener("click",registerCall,false);
  document.getElementById("fpw").addEventListener("click",resetCall,false);
  $(document).ready(function () {

    $('#loginForm').validate({ // initialize the plugin
      errorElement: "div",
      rules: {
        userMail: {
          required: true
          //email : true
        },
        userPassword:{
          required :true,
          min : 6
        },
      },
      submitHandler: function (form) { // for demo
        alert('valid form submitted'); // for demo
        return false; // for demo
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
/*
* Fonctions 
* TODO: CT and split the functions (technical/ functionnal)
*/
function login(){
//envoyer une request GET sur les infos données
  var email = document.getElementById('userMail').value;
  var password = document.getElementById('userPassword').value;
  var user = new User(email,password);
  var myJson = JSON.stringify(user);
  console.log('json='+myJson);
  postRequest(myJson,"auth",readResponse);
 }

function signup(){
  var email = document.getElementById('userMail').value;
  var confirmEmail = document.getElementById('confirmMail').value;
  var pass = document.getElementById('userPassword').value;
  var passConfirm = document.getElementById('confirmPassword').value;
  if(email!=confirmEmail){
    document.getElementById('confirmMail').setAttribute();
  }
  if(pass!=passConfirm){
    //erreur pass
  }

  var user = new User('vlogin',pass,email);
  console.log(User);
  console.log(user);
  var myJson = JSON.stringify(user);
  postRequest(myJson,"register",readResponse);
}

function resetPassword(){
  console.log("Ton password va être reset connard");
  var email = document.getElementById('userMail').value;
  var myJson = JSON.stringify(email);
  postRequest(myJson,"reset",readResponse);
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
    } else {
      xhr = new XMLHttpRequest(); 
    }
  } else {
    alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
    return null;
  }
  
  return xhr;
}


function getRequest(callback){
  var xhr = getXMLHttpRequest();
  xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);    
        }
    };
  serverUrl = serverUrl;
  xhr.open("GET",serverUrl, true);
  xhr.send(null);
}

function postRequest(jsonData,param,callback){
  console.log("Trying Post Request : "+serverUrl);
  var xhr = getXMLHttpRequest();
  xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr);    
        }
    };

  xhr.open("POST",serverUrl+'/'+param, true);
  //xhr.open("POST",serverUrl, true);
 
  var myEscapedJSONString = jsonData.escapeSpecialChars();
  xhr.setRequestHeader("Content-Type","application/json");
  xhr.send(myEscapedJSONString); 
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

function readData(sData) {
    var jsonData = JSON.parse(sData);
    console.log(jsonData);
    for(i = 0; i < jsonData.length; i++) {
       console.log(jsonData[i]);
    }

}
function readResponse(sData){
  JSON.parse(sData);
  console.log(sData.responseText);
}

function conn(){
  getRequest(readData);
}