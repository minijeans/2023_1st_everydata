function NoMultiChk(chk){
  var obj = document.getElementsByName("table-select_day");
   for(var i=0; i<obj.length; i++){
     if(obj[i] != chk){
       obj[i].checked = false;
     }
   }
}