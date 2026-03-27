var adminOpenWindowWidth=900;
var adminOpenWindowHeight=750;




function keyhandler(sender) {

		if (window.event.keyCode == 13) {
				//senderName = document.getElementById(sender).name;
				document.getElementById(sender).focus();
				//__doPostBack(senderName,'');
        }		
}

function keyhandler2(sname, e) {
    //LS 18.08.2011 e wird nun als parameter mit übergeben
    //damit können wir die anderen KeyDowns der Browser handeln
   if (window.event) {
        if (window.event.keyCode == 13) {
            __doPostBack(sname, '');
            event.returnValue = false;
        }
    }
    else {
        if (e.which == 13) {
            __doPostBack(sname, '');
            return false;
        }
    }
			
}
function keyhandler3(e) {
    //LS 18.08.2011 e wird nun als parameter mit übergeben
    //damit können wir die anderen KeyDowns der Browser handeln
    if (window.event) {
        if (window.event.keyCode == 13) {
            window.event.keyCode = 0;
            return false;
        }
    }
    else {
        if (e.which == 13) {
            e.which = 0;
            return false;
        }
    }
}
	
function opencontentwin(url,target,params) {
	var newwin = window.open(url,target,params);
	newwin.focus();
}

function openCxxlWindow(url, target) {
    var cxxlwin = window.open(url, target, "width=" + adminOpenWindowWidth + "px,height=" + adminOpenWindowHeight + "px");
    cxxlwin.focus();
}

function OpenModuleTemplate(baseurl,tbid,target) {
  var moduleTemplate = window.open(baseurl + "contentxxl/admin/themeboxmanager/admin/editthemebox.aspx?tbid="+tbid+"&targetid="+target+"","","width=" + adminOpenWindowWidth + "px,height="+adminOpenWindowHeight+"px");
  moduleTemplate.focus();
}


function OpenModuleSettings(moduleid) {
   var ModuleWnd = window.open(baseurl + "contentxxl/admin/modulemanager/content/ModuleManagerContentFrame.aspx?mid=" + moduleid +"","","height=" + adminOpenWindowHeight + "px,width=" + adminOpenWindowWidth + "px,status=off,menu=off,toolbar=off");
   ModuleWnd.focus();
}


function openOEM(mid, mdefid, itemid, lang, target)
{
	var params = "height=650,width=900,status=off,menu=off,toolbar=off,resizable=yes";
	var url = baseurl + "contentxxl/admin/objecteditmanager/objecteditmanager.aspx?";
	url +=  "mid="+ mid;
	url += "&itemid=" + itemid;
	url += "&mdefid=" + mdefid; 
	url += "&lang=" + lang;
	opencontentwin(url, target, params);								
}

function selectObject(mdefid)
{
	var params = "center:yes;dialogWidth:900px;dialogHeight:650px;status:no;resizible:yes" ;
	var url = baseurl + "contentxxl/admin/ObjectBrowser/ObjectBrowser.aspx?";
	if (mdefid==null)
		mdefid = 0;
	url += "&selmdefid=" + mdefid; 
	url += "&selector=1";
	return window.showModalDialog(url,"sel_obj",params);
}

function selectObjectNoModal(mdefid) {

    var pWidth = adminOpenWindowWidth;
    var pHeight = adminOpenWindowHeight;
    var params = "width=" + pWidth + "px,height=" + pHeight + "px,status=0;";
	
	var url = baseurl + "contentxxl/admin/ObjectBrowser/ObjectBrowser.aspx?";
	if (mdefid==null)
		mdefid = 0;
	url += "&selmdefid=" + mdefid; 
	url += "&selector=1";
	var win = window.open(url,"sel_obj",params);
	win.moveTo((screen.width / 2) - (pWidth / 2),(screen.height / 2) - (pHeight / 2));
	win.focus();
}
//Funktion für neuen Editor um selectetemplateframe.aspx noModal Aufzurufen
function openWindowNoModal(tid,objekturl) {

    var pWidth = "400px";
    var pHeight = "200px";
    var params = "width=" + pWidth + "px,height=" + pHeight + "px,status=0;";

    var url = baseurl + objekturl;
    url += "&tid=" + tid;
    var win = window.open(url, "sel_templ", params);
    win.moveTo((screen.width / 2) - (pWidth / 2), (screen.height / 2) - (pHeight / 2));
    win.focus();
}

function selectObjectNoModalWithBackReference(mdefid,BackReference)
{
    var pWidth = adminOpenWindowWidth;
    var pHeight = adminOpenWindowHeight;
	var params = "width="+pWidth+"px,height="+pHeight+"px,status=0;" ;
	var url = baseurl + "contentxxl/admin/ObjectBrowser/ObjectBrowser.aspx?";
	if (mdefid==null)
		mdefid = 0;
	url += "&selmdefid=" + mdefid; 
	url += "&mid=-1";
	url += "&selector=1";
	url += "&backreference="+BackReference;
	var win = window.open(url,"sel_obj",params);
	win.moveTo((screen.width / 2) - (pWidth / 2),(screen.height / 2) - (pHeight / 2));
	win.focus();
}

//--- This two function inserted for flash-module
function enableActiveX (containerID)
{
	// No IE = no need to enable
    if (getInternetExplorerVersion() != -1)
    {
        // Get container
        var container = document.getElementById(containerID);
        // Get html in noscript 
        var html = container.innerHTML; 
        // Write html back to container
        container.innerHTML = html;
    }
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// Found at: 
// http://msdn.microsoft.com/workshop/author/dhtml/overview/browserdetection.asp
{
    var rv = -1; // Return value assumes failure
    if (navigator.appName == 'Microsoft Internet Explorer')
    {
        var ua = navigator.userAgent;
        var re  = new RegExp ("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec (ua) != null)
        {
        	rv = parseFloat (RegExp.$1);
        }
    }
    return rv;
}

//-----------------------------------------------------------------------------------
//--- for smartedit use this instead of innerHTML
//----------------------------------------------------------------------------------
    var output = '';
    var opentag = '<';
    var closetag = '>';
    function getHTMLContent(obj) {
        output = '';
        //-- only for test
        //-- w = window.open('','myoutput');
        getHTML(obj.childNodes);
        //--w.document.write(output);
        
        return output;
    }

    
    function getHTML(Nodes) {
        var i;
        for(i=0; i < Nodes.length;i++) {
            //alert(Nodes[i].nodeType + ' - ' + Nodes[i].nodeName);
            // Type 1 = Elementknoten
            if(Nodes[i].nodeType == 1) {
                 
                if(Nodes[i].nodeName.charAt(0) != '/' && Nodes[i].nodeName != '') {
           
                    output += opentag+Nodes[i].nodeName.toLowerCase();
                   
                    var x;
                    for(x=0; x < Nodes[i].attributes.length;x++) {
                      if((Nodes[i].attributes[x].nodeValue > '' || Nodes[i].attributes[x].nodeName.toLowerCase() == 'alt') && (Nodes[i].attributes[x].nodeName.toLowerCase() != 'contenteditable') && (Nodes[i].attributes[x].nodeName.toLowerCase() != 'start') && (Nodes[i].attributes[x].nodeName.toLowerCase() != 'loop')) {
                      
                        if(!(Nodes[i].nodeName.toLowerCase() == 'object' && Nodes[i].attributes[x].nodeName.toLowerCase() == 'alt')) {
                          output += ' '+Nodes[i].attributes[x].nodeName.toLowerCase()+'="'+Nodes[i].attributes[x].nodeValue+'"';
                        }
                      }
                    }
                    if(Nodes[i].style.cssText > '') {
                        output += ' style="'+ Nodes[i].style.cssText +'"'
                    }
                    if(Nodes[i].nodeName.toLowerCase() == 'img' || Nodes[i].nodeName.toLowerCase() == 'hr' || Nodes[i].nodeName.toLowerCase() == 'br' || Nodes[i].nodeName.toLowerCase() == 'input' || Nodes[i].nodeName.toLowerCase() == 'area') {
                        output += ' /'+closetag;
                    } else {
                        output += closetag;
                    }
                    if(Nodes[i].nodeName == 'SCRIPT') {
                     output += Nodes[i].innerHTML;
                    }
                    if(Nodes[i].nodeName.toLowerCase() == 'style') {
                     output += Nodes[i].innerHTML;
                    }
                }
            }
            // Type 3 = Textknoten
            if(Nodes[i].nodeType == 3) {
              output += ChangeToHTMLEntities(Nodes[i].nodeValue);
            }
            if(Nodes[i].hasChildNodes()) {
              getHTML(Nodes[i].childNodes);
            }
            // Type 1 = "wertlose" Textknoten schließen
            if(Nodes[i].nodeType == 1 && (!(Nodes[i].nodeName.toLowerCase() == 'img' || Nodes[i].nodeName.toLowerCase() == 'hr' || Nodes[i].nodeName.toLowerCase() == 'br' || Nodes[i].nodeName.toLowerCase() == 'input' || Nodes[i].nodeName.toLowerCase() == 'area' || Nodes[i].nodeName.toLowerCase().charAt(0) == '/'))) {
              output += opentag+'/'+Nodes[i].nodeName.toLowerCase()+closetag;
            }      
        }
   
   }

   
   function ChangeToHTMLEntities(input) {
     input = input.replace("&","&amp;");
     return input;
   }
   
   // for collapsing the answers (must be paragraph element)
   function collapseFAQ(ClassName) {
    var elems = document.getElementsByTagName("p");
    for(i = 0; i< elems.length;i++) {
      elems[i].setAttribute("id","col"+i);    
      if(elems[i].className == ClassName) {
       //for Firefox, Opera
       elems[i].setAttribute("onclick", "collapseAnswer(this.id)");
       //for IE
       elems[i].onclick = new Function("collapseAnswer(this.id)");
       elems[i+1].style.display = "none";
      }
    }
  }


  function collapseAnswer(obj) {
    var nextnumber = Number(obj.replace(/col/i,""));
    if(document.getElementById("col"+(nextnumber+1)).style.display == "none") {
      document.getElementById("col"+(nextnumber+1)).style.display = "block";
      document.getElementById("col"+(nextnumber)).className += " collapseactive"
    }
    else {
      document.getElementById("col"+(nextnumber+1)).style.display = "none";
      document.getElementById("col"+(nextnumber)).className = document.getElementById("col"+(nextnumber)).className.replace(/collapseactive/,"")
    }
  }

  function RefreshCaptcha() {
      CaptchaRefresh();
  }
  function CaptchaRefresh() {
   var captchaIndex = Math.round((Math.random() * 2000000) + 1);
   if(document.getElementById('xxl-captchacode').src.search(/\?/) > -1) {
     if(document.getElementById('xxl-captchacode').src.search(/r\=\d+/) > -1) {
         document.getElementById('xxl-captchacode').src = document.getElementById('xxl-captchacode').src.replace(/r\=\d+/, "r=" + captchaIndex);
     } else {
         document.getElementById('xxl-captchacode').src += "&r=0";
     }

   }
   else {
       document.getElementById('xxl-captchacode').src += "?r=0";
   }
   if (document.getElementById('xxl-captchacode').src.search(/cmi\=\d+/) == -1) {
       document.getElementById('xxl-captchacode').src += "&cmi=" + document.getElementsByName("captchamid")[0].value;
   }
    return;
}
 
// //LS 01.04.2011
// //Release 4.0 - Easyeditor

function ToggleVisible(node, word) {
    if (node.hasChildNodes) {
        var hi_cn;

        for (hi_cn = 0; hi_cn < node.childNodes.length; hi_cn++) {
            ToggleVisible(node.childNodes[hi_cn], word);
        }
    }

    try {
        var tmpStr = node.id;
        if ((tmpStr.endsWith('ShowVisibility')) && (node.getAttribute('value') == word)) {
        
            tmpStr = tmpStr.substring(0, node.id.lastIndexOf("_"));

            if (tmpStr.endsWith('categoryselect')) {

                if (document.getElementById(tmpStr + '_mybuttons').style.display == "none") {
                    document.getElementById(tmpStr + '_mybuttons').style.display = "";
                }
                else {
                    document.getElementById(tmpStr + '_mybuttons').style.display = "none";
                }
                if (document.getElementById(tmpStr + '_mycategoryselect').style.display == "none") {
                    document.getElementById(tmpStr + '_mycategoryselect').style.display = "";
                }
                else {
                    document.getElementById(tmpStr + '_mycategoryselect').style.display = "none";
                }

            }

            if (tmpStr.endsWith('objecttype')) {

                if (document.getElementById(tmpStr + '_ddlTypes').style.display == "none") {
                    document.getElementById(tmpStr + '_ddlTypes').style.display = "";
                }
                else {
                    document.getElementById(tmpStr + '_ddlTypes').style.display = "none";
                }

                if (document.getElementById(tmpStr + '_btncreatenew').style.display == "none") {
                    document.getElementById(tmpStr + '_btncreatenew').style.display = "";
                }
                else {
                    document.getElementById(tmpStr + '_btncreatenew').style.display = "none";
                }
                if (document.getElementById(tmpStr + '_btnedit').style.display == "none") {
                    document.getElementById(tmpStr + '_btnedit').style.display = "";
                }
                else {
                    document.getElementById(tmpStr + '_btnedit').style.display = "none";
                }
            }
        }
        if (node.getAttribute('GroupVisibility') != null) {
            if (node.getAttribute('GroupVisibility') == word) {
                if (node.style.display == "none") {
                    node.style.display = "";
                }
                else {
                    node.style.display = "none";
                }
            }

        }

    } catch (e) {

    }
}

function SwitchVisibility(word) {
    ToggleVisible(document.getElementsByTagName("body")[0], word);

    return false;
}
//LS 10.06.2011
//Calls the Webmethod of the Desktopdefault.aspx.vb
function GetSearchValues(word) {
    //word -> inserted value in the query_string Textbox (the word to search)
    //we search at the first word - like google do
    PageMethods.GetDropDownResults(word, onSucceeded, onFailed);
    return false;
}

function onSucceeded(result, userContext, methodName) {
   //LS 10.06.2011
   //We bind our new results new - so we get a new drop down list
   //dont use -> new autosuggest("textbox,result), won't run in livetime
   obj.bindArray(result);
   return false;
 
}
//LS 10.06.2011 
//Do nothing...
function onFailed(error, userContext, methodName) {
    return false;
}
//LS 16.09.2011
//testing phase
function loadjscssfile(filename, filetype, headOrBody) {


    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script');
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");

        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref != "undefined") {
        //just writes this to the DOM - not in the htmlsourcecode to see
        document.getElementsByTagName(headOrBody)[0].appendChild(fileref);
    }
        
}
