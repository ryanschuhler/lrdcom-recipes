var sizes = [
    { width: 320, height: 640 },
    { width: 375, height: 667 },
    { width: 768, height: 1024 },
    { width: 320, height: 568 },
    { width: 414, height: 736 },
    { width: 375, height: 667 },
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
    { width: 1600, height: 900 },
    { width: 1440, height: 900 },
    { width: 1280, height: 1024 }
];

var sizes = [
    { width: 320, height: 568 },
    { width: 768, height: 1024 },
    { width: 1920, height: 1080 }
];



var system = require('system');
var args = system.args;

if (args.length === 1) {
  console.log('Try to pass some arguments when invoking this script!');
} else {
  args.forEach(function(arg, i) {
    console.log(i + ': ' + arg);
  });
}



var url = "http://www.liferay.com/solutionsforum-de";
var url = "http://localhost:3000";
var url = "http://www.liferay.com/web/events2016/italy";
var pageName = "italy";


var url = args[2];
var pageName = args[1];


var desktopSafari="User-Agent	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 (KHTML, like Gecko) Version/9.1.2 Safari/601.7.7";

function savePage(size, filename) {
    var page = require('webpage').create();
  //  page.settings.userAgent = desktopSafari;
    page.onConsoleMessage = function (msg) {
    console.log(msg);
}

    page.onResourceError = function (resourceError) {
        console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
        console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
    };


    page.viewportSize = { width: size.width, height: size.height };
    page.open(url, function start(status) {
        console.log("opening url for viewport size: " + size.width + " x" + size.height);


        setTimeout(function () {


            var htmlClasses = page.evaluate(function() {
                    return document.querySelector("html").getAttribute("class");
            });
            console.log("HTML Classes: " + htmlClasses);
            page.render(filename);
            console.log("rendering url for viewport size: " + size.width + " x" + size.height);
        }, 20000);

    });
}

for (var i = 0; i < sizes.length; i++) {
    var value = sizes[i];
    //console.log(value.width);

    savePage(value, "test/" + pageName + "-" + value.width + "x" + value.height + ".png");
}

