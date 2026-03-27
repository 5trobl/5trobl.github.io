var windowWidth;
var maxWidth = 1280;
var minWidth = 800;
var scrollbarWidth=24;

var testtemp = 'null';

function handleScroll()
{
   document.getElementById("dlrOverall").style.height = document.body.clientHeight + document.body.scrollTop ;
 }
  

function getWindowWidth() {
  //try {
  if(document.body) windowWidth = document.body.offsetWidth; // IE
  if(window.innerWidth) windowWidth = window.innerWidth; // NN
  //if(window.innerHeight) document.getElementById("helpImage").style.height=window.innerHeight; // NN
	
	window.status=windowWidth;  
	
  if(windowWidth > maxWidth) windowWidth = maxWidth;
  if(windowWidth < minWidth) windowWidth = minWidth;
  
  windowWidth-=scrollbarWidth;
 //}
  //catch(e) {alert('test');}
}

getWindowWidth();

function sizeWindow() {
  getWindowWidth();
  try {
        document.getElementById("dlrHeader").style.width=windowWidth;
		document.getElementById("dlrSiteservice").style.width=windowWidth;
		document.getElementById("dlrBreadcrumb").style.width=windowWidth;
		document.getElementById("dlrContent").style.width=windowWidth;
		document.getElementById("dlrOverall").style.width=windowWidth;
		setBottom();
		document.getElementById("ImageBox").style.width=windowWidth-390;
	}
	catch(e) {}
}

function doOnLoad() {
  sizeWindow();
  //setBottom(); 
  var ua = navigator.userAgent.toLowerCase();
  var netscapebrowser = (ua.indexOf("mozilla")!=-1 && ua.indexOf("compatible")==-1 && ua.indexOf("opera")==-1);
  if (netscapebrowser == true)
  {
   window.scrollTo(0,4000);
   setTimeout("scrollBy(0,-4000)",1);
   //window.scrollTo(0,document.getElementById("totalHeight").offsetHeight*10);
   //setTimeout("scrollBy(0,-document.getElementById('totalHeight').offsetHeight)*10",1);
  }
  handleScroll(); 
  var newsize = readCookie('clientSize');
  fs(newsize);
}


function refresh()
{
    setBottom();
    var ua = navigator.userAgent.toLowerCase();
  	var netscapebrowser = (ua.indexOf("mozilla")!=-1 && ua.indexOf("compatible")==-1 && ua.indexOf("opera")==-1);
	if (netscapebrowser == true)
	{
	 if (ua.indexOf("firefox") != -1)
     {
     /*var inhalt = document.getElementsByTagName("html")[0].innerHTML;
	 document.close();
	 document.open("text/html","replace");
	 document.write("<html>");
	 document.write(inhalt);
	 document.stop();
	 document.write("</html>");
	 document.close();*/
	 if (location.href.indexOf("desktopdefault.aspx") > -1)
		location.href = location.href + '/r/';
	 else
	   location.href = location.href + '/desktopdefault.aspx/r/';
	 }
	 else
		if (location.href.indexOf("desktopdefault.aspx") > -1)
		    location.href = location.href + '/r/';
	    else
	        location.href = location.href + '/desktopdefault.aspx/r/';
	}
}


function fs(step) {

	var css = document.body.style;
	var size = parseInt(css.fontSize) || 84;
	if(step > 1) {
	 var newsize = step;
	} else {
	  var newsize =  (size + (step * 10)) ;
	  if (newsize < 60) { newsize = 60};
	  if (newsize > 140) { newsize = 140};
	}
	css.fontSize = newsize + '%'
	createCookie('clientSize',newsize,365);
	window.status='font size: ' + css.fontSize;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}



function setBottom()
{
var contentHeight = document.getElementById("ctl00_contentpane").offsetHeight;

if (document.getElementById("ctl00_leftpane").offsetHeight > contentHeight) 
	contentHeight = document.getElementById("ctl00_leftpane").offsetHeight;
 if (document.getElementById("ctl00_rightpane").offsetHeight > contentHeight) 
	contentHeight = document.getElementById("ctl00_rightpane").offsetHeight;

 var totalHeight = contentHeight + document.getElementById("dlrHeader").offsetHeight +  document.getElementById("dlrSiteservice").offsetHeight + document.getElementById("dlrBreadcrumb").offsetHeight + 53;
if (totalHeight < document.body.clientHeight - 25)
	totalHeight = document.body.clientHeight -25;
if (totalHeight < document.body.clientHeight + document.body.scrollTop)
 {
   	window.scrollTo(0,document.getElementById("dlrContent").offsetHeight);
    setTimeout("scrollBy(0,-document.getElementById('dlrContent').offsetHeight)",1);
  }
 document.getElementById("dlrBottom").style.top=totalHeight;
 document.getElementById("dlrBottom").style.left='0px';
 document.getElementById("dlrBottom").style.width=windowWidth;
 document.getElementById("dlrBottom").style.zIndex=1000;
}


window.onresize = sizeWindow;
window.onscroll = handleScroll;
getWindowWidth();


