
/*
* Function wich send a notification for the start of the download
*/
function downloadStarted(){
}
/*
* Function wich send a notification for the completion of the download
*/
function downloadFinished(){
}
/*
* Function wich return the progress of a download
*/
function downloadProgress(fileName){
	return progressionOf(fileName)
}

function listDownloads(){
	chrome.downloads.search()
}
/////////////////////////////////////////////
