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
  //TO DO : Post request to push notif
  console.log("New Download created. Id:"+e.id+", URL: "+e.url+", fileSize:"+e.fileSize);
});
/*
*   Ajout des évenements
*/

function registerCall(){
	$("#main").hide();
	$("#register").show();
	$("#reset").hide();
	$("#registerBack").click(mainCall());
	$("#reg").click(signup());
}

function resetCall(){
	$("#main").hide();
	$("#register").hide();
	$("#reset").show();
	$("#resetBack").click(mainCall());
	$("#fpw").click(resetPassword());

}
function mainCall(){
	$("#main").show();
	$("#register").hide();
	$("#reset").hide();
	$("#log").click(login());
	$("#reg").click(registerCall());
	$("#fpw").click(resetCall());
}
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
		}else{
			console.log('Error in the download : An unexpected error occured');
		}
  });
}
/*
* Definitions d'objets métiers
*/
function User(email, password){
	this.email = email;
	this.password = password;
}
/*
* Fonctions 
* TODO: CT and split the functions (technical/ functionnal)
*/
function login(){
//envoyer une request GET sur les infos données
  var email = $('#userMail').val()
  var password = $('#userPassword').val();
  var user = new User(email,password);
  var myJson = JSON.stringify(user);
  console.log('json='+myJson);
  postRequest(myJson,readResponse,"auth");
 }

function signup(){
  var User = function(login,password,email){};
    User.prototype;
    User.prototype.login = 'login';
    User.prototype.password = 'password';
    User.prototype.email = 'email';
  user = new User('vlogin','vpassword','vemail');
  console.log(User);
  console.log(User.prototype);
  myJson = JSON.stringify(user);
  postRequest(myJson,readResponse);
}

function resetPassword(){
  console.log("Password will be reset");
  var email = document.getElementById('userMail').value;
  var myJson = JSON.stringify(email);
  postRequest(myJson,readResponse,"reset");
}

function postRequest(jsonData,callback,param){
	var myEscapedJSONString = jsonData.escapeSpecialChars();
	console.log("Trying Post Request : "+serverUrl);
	$.ajax({
		url:serverUrl+"/"+param,
		data:myEscapedJSONString,
		success:function(data){
			alert(data);
		},
		error:function(data){
			alert(data);
		}
	});
}
 
function escapeSpecialChars(jsonData) {
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
  //console.log(sData);
  var jsonData = JSON.parse(sData);
  console.log(sData.responseText);
}

function conn(){
  getRequest(readData);
}



