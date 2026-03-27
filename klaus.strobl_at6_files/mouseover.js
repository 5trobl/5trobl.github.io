function mmover(obj,theme,item,setclass,image) {
try {
  obj.className='bgcl'+theme+' '+setclass;
  document.getElementById('over'+item).className='bgcl'+theme+' '+setclass;
  document.getElementById('link'+item).style.color='#FFFFFF';
  document.getElementById('navimage'+item).src=image;
} catch(e) {}
}

function mmout(obj,theme,item,setclass,image) {
try {
  obj.className='bgc-menu '+setclass;
  document.getElementById('over'+item).className='bgc-menu '+setclass;
  document.getElementById('link'+item).style.color='#000000';
  document.getElementById('navimage'+item).src=image;
} catch(e) {}  
}