/*
*   Definitions des variables
*/
var adminURI = 'mongodb://admin:admin@ds035750.mongolab.com:35750/mydl';
var chromiumURI ='mongodb://chromeExt:chromium@ds035750.mongolab.com:35750/mydl';
var testURI = "https://api.mongolab.com/api/1/databases/tp_secu/collections/adminDirectory";
var mydlURI = "https://api.mongolab.com/api/1/databases/mydl/collections/";
var userCol = "users";
var currdlCol = "currentdl"
var serverUrl = "http://localhost:8080";


/*
*   Ajout des évenements
*/
document.getElementById("log").addEventListener("click",login, false);
document.getElementById("reg").addEventListener("click",signup,false);
document.getElementById("fpw").addEventListener("click",resetPassword,false);

/*
* Tests
* TODO: CLean This
*/
function testDL(){
  chrome.downloads.download({
    url: "http://nbstatic.s3.amazonaws.com/img/flags-iso/flat/32/fr.png",
    filename: 'download.zip',
    saveAs: true},
     function(downloadId){
       if (typeof downloadId !== "undefined"){ // If 'downloadId' is undefined, then there is an error - so making sure it is not so before proceeding.
         console.log('Download initiated, id is: '+downloadId);
    }
  });
}
chrome.downloads.onCreated.addListener(function (e) {
  //FAIRE UNE PUTAIN DE POST REQUEST. MERDE.
  console.log("New Download created. Id:"+e.id+", URL: "+e.url+", fileSize:"+e.fileSize);
});

/*
* Definitions d'objets métiers
*/
var User = function(login,password,email){};
    User.prototype;
    User.prototype.login = 'login';
    User.prototype.password = 'password';
    User.prototype.email = 'email';
  
/*
* Fonctions 
* TODO: CT and split the functions (technical/ functionnal)
*/
function login(){
//envoyer une request GET sur les infos données
 console.log("Coucou");
  var login = document.getElementById('mail');
  var password = document.getElementById('pass');
  user = new User(login,pass,'');
  myJson = JSON.stringify(user);
  console.log(myJson);
  postRequest(myJson,readResponse,"auth");
 }

function resetPassword(){
  console.log("Ton password va être reset connard");
}

function checkLogin(){

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

function postRequest(jsonData,callback,param){
  console.log("Ok on est dans le post");
  var xhr = getXMLHttpRequest();
  xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
            console.log(xhr);    
        }
    };

  xhr.open("POST",serverUrl+'?'+param, true);
  var myJSONString = JSON.stringify(jsonData);
  var myEscapedJSONString = myJSONString.escapeSpecialChars();
  xhr.send(myEscapedJSONString);
  console.log(xhr);
  xhr.setRequestHeader("application/json");

  
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
  console.log(sData);
  var jsonData = JSON.parse(sData);
  console.log(jsonData);
}

function conn(){
  getRequest(readData);
}

function signup(){
  var User = function(login,password,email){};
    User.prototype;
    User.prototype.login = 'login';
    User.prototype.password = 'password';
    User.prototype.email = 'email';
  user = new User('vlogin','vpassword','vemail');
  console.log(User);
  console.log(user);
  console.log(User.prototype);
  myJson = JSON.stringify(user);
  postRequest(myJson,readResponse);
}


