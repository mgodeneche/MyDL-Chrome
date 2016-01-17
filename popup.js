// If this extension is installed on a stable-channel chrome, where the
// downloads API is not available, do not use the downloads API, and link to the
// beta channel.
var bkg = chrome.extension.getBackgroundPage();
if (chrome.downloads) {
    bkg.console.log("Chrome Download Test :")
    // Start searching ASAP, don't wait for onload.
    DownloadManager.loadItems();

    chrome.downloads.onCreated.addListener(function (item) {
        bkg.console.log("Test Chrome DOwnload OK")
    });

    chrome.downloads.onChanged.addListener(function (delta) {
        var item = DownloadManager.getItem(delta.id);
        if (item) {
            item.onChanged(delta);
        }
    });

    DownloadManager.loadItems = function () {
        // Request up to kShowNewMax + 1, but only display kShowNewMax; the +1 is a
        // probe to see if there are any older downloads.
        // TODO(benjhayden) When https://codereview.chromium.org/16924017/ is
        // released, set minimum_chrome_version and remove this try/catch.
        try {
            chrome.downloads.search({
                    orderBy: ['-startTime'],
                    limit: kShowNewMax + 1
                },
                function (results) {
                    DownloadManager.loadItems.items = results;
                    DownloadManager.loadItems.onLoaded();
                });
        } catch (exc) {
            chrome.downloads.search({
                    orderBy: '-startTime',
                    limit: kShowNewMax + 1
                },
                function (results) {
                    DownloadManager.loadItems.items = results;
                    DownloadManager.loadItems.onLoaded();
                });
        }
    };
}
function formatDateTime(date) {
  var now = new Date();
  var zpad_mins = ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  if (date.getYear() != now.getYear()) {
    return '' + (1900 + date.getYear());
  } else if ((date.getMonth() != now.getMonth()) || (date.getDate() != now.getDate())) {
    return date.getDate() + ' ' + chrome.i18n.getMessage('month' + date.getMonth() + 'abbr');
  } else if (date.getHours() == 12) {
    return '12' + zpad_mins + 'pm';
  } else if (date.getHours() > 12) {
    return (date.getHours() - 12) + zpad_mins + 'pm';
  }
    return date.getHours() + zpad_mins + 'am';
  }


