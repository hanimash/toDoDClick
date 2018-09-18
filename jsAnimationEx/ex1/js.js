var myClock = document.getElementById('clock');
var stopClockBtn=document.getElementById("stopClockBtn");
var editLink=document.getElementById("editLink");
var user=document.getElementById("user");
var days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var timeText="";
var color1="";
var color2="";
function towDigits(n){
    return (n > 9) && (n < 100) ? "" + n: "0" + n;
}
function threeDigits(nu){
    var n=nu;
    if(n < 10){
        n="00" + n;
    }else if(n<100){
        n="0"+n;
    }else{
        n=""+n
    }
    return n;
}
var changeNumbers = function(){
    var time = new Date();
    var d=days[time.getDay()];
    var h=towDigits(time.getHours()<12?time.getHours():time.getHours()-12);
    h=time.getHours()==12?12:h;
    var m=towDigits(time.getMinutes()),
    s=towDigits(59-time.getSeconds()),
    ex=time.getHours()<12?"Am":"Pm";
    timeText = h+":"+m+"."+s;
    color1 = "#"+h+m+s;
    color2 ="#"+s+m+h;
    myClock.innerHTML=d+" - "+h+":"+m+"<span>."+s+" "+ex+"</span>";
    document.body.style.background= getPrefixeValue()+"linear-gradient("+color1+","+color2+")";
}
function getPrefixeValue(){
    var prefixes = ['-o-', '-ms-', '-moz-', '-webkit-'];
    var prefixeValue='';
    var testElement=document.createElement("div")
    for(var i=0;i<prefixes.length;i++){
        testElement.style.background=prefixes[i]+'linear-gradient(#111111,#333333)';
        if(testElement.style.background){
            prefixeValue=prefixes[i];
        }
    }
    testElement=null;
    delete testElement;
    return prefixeValue;
}
var startTime=setInterval(changeNumbers, 1000);


function addToList(ulId,text){
    var ul=document.getElementById(ulId);
    var li=document.createElement("li");
    li.appendChild(document.createTextNode(text));
    li.style.background=colorText;
    ul.appendChild(li);
}
var getUser;
function init(){
if(!localStorage.user){
    getUser=prompt("write your Name:");
    if(getUser!=""){
        localStorage.setItem("user",getUser);
       
    }
}else{
    getUser=localStorage.user;
}
user.innerHTML="";
user.appendChild(document.createTextNode("Hello "+getUser+"  "));
}
init();
editLink.addEventListener("click",function(){
    localStorage.clear();
    init();
})

/********************start-stop Clock***********************/
var stopClockBox=document.getElementById("stopClockBox");
var headBox=document.getElementById("headBox");
var closeClockBoxLink=document.getElementById("closeClockBoxLink");
var startStopBtn=document.getElementById("startStopBtn");
var resetBtn=document.getElementById("resetBtn");
var hText=document.getElementById("h");
var mText=document.getElementById("m");
var sText=document.getElementById("s");
var msText=document.getElementById("ms");
stopClockBtn.addEventListener("click",function(){
    stopClockBox.style.display="block";
});
closeClockBoxLink.addEventListener("click",function(e){
    e.target.parentNode.parentNode.style.display="none";
    clearInterval(t);
    hText.innerHTML="00";
    mText.innerHTML="00";
    sText.innerHTML="00";
    msText.innerHTML="00";
    startStopBtn.innerHTML="start";

});
function startClock(){

    var h1=Number(hText.innerHTML);
    var m1=Number(mText.innerHTML);
    var s1=Number(sText.innerHTML);
    var ms1=Number(msText.innerHTML);
    if(ms1<100){
        ms1++
        if(ms1==100){
            ms1=0;
            s1++;
            if(s1==60){
                s1=0
                m1++;
                if(m1==60){
                    m1=0;
                    h1++;
                }
            }
        }
    }else{
        ms1=0;
    }

    hText.innerHTML=towDigits(h1);
    mText.innerHTML=towDigits(m1);
    sText.innerHTML=towDigits(s1);
    msText.innerHTML=towDigits(ms1);
}
var t;
startStopBtn.addEventListener("click",function(e){
    switch(e.target.innerHTML){
        case "start":
            t=setInterval(startClock,10);
            e.target.innerHTML="stop";
            console.log(t);

        break;
        case "stop":
            clearInterval(t);
            e.target.innerHTML="start";
            console.log(t);
        break;
    }

});
resetBtn.addEventListener("click",function(){
    clearInterval(t);
    hText.innerHTML="00";
    mText.innerHTML="00";
    sText.innerHTML="00";
    msText.innerHTML="00";
    startStopBtn.innerHTML="start";
});
dragElement(stopClockBox,headBox);
function dragElement(elmnt,head) {
    var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
    if (head) {
      head.onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      x2 = e.clientX;
      y2 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      x1 = x2 - e.clientX;
      y1 = y2 - e.clientY;
      x2 = e.clientX;
      y2 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - y1) + "px";
      elmnt.style.left = (elmnt.offsetLeft - x1) + "px";
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
  var calcBox=document.getElementById("calcBox");
  var headCalcBox=document.getElementById("headCalcBox");
  var calcBtn=document.getElementById("calcBtn");
  var closecalcBoxLink=document.getElementById("closecalcBoxLink");
  calcBtn.addEventListener("click",function(){
    calcBox.style.display="block";
  });
  closecalcBoxLink.addEventListener("click",function(e){
    e.target.parentNode.parentNode.style.display="none";
  });
  dragElement(calcBox,headCalcBox);
  var numBtns=document.getElementsByClassName("num");
  var viewer=document.getElementById("viewer");
  var viewerText=viewer.innerHTML;
  var newInput=false;
  console.log(numBtns[0]);
  for(var i=0,l=numBtns.length;i<l;i++){
      numBtns[i].addEventListener("click",function(e){
        var char=e.target.innerHTML;
        if(viewerText.length<10){
            if(newInput){
                viewerText="0";
                resetArrayFrom(parts,0);
            }
            switch(char){
                case ".":
                    if(noCharAtText(".",viewerText)){
                        viewerText+="."
                    }
                    break;
                case "0":
                    if(viewerText!="0"){
                        viewerText+="0"
                    }
                    break;
                default:
                    if(viewerText=="0"){
                        viewerText=char;
                    }else{
                        viewerText+=char;

                    }
            }
            viewer.innerHTML=viewerText;
        }else{
            inputError(viewer);
        }
        
      });
  }

  function inputError(obj){
    var orig = obj.style.color;
    obj.style.color = '#f00';
    setTimeout(function(){
         obj.style.color = orig;
    }, 100);
 }
 function noCharAtText(char,text){
    for(var i=0;i<text.length;i++){
        if(text.charAt(i)==char){
            return false;
        }
    }
    return true;
 }

 var ops=document.getElementsByClassName("ops");
 for(var i=0,l=ops.length;i<l;i++){
     ops[i].addEventListener("click",function(e){
         calc(e.target.innerHTML);
     })
 }
 var parts=[];
 function calc(o){
    if(o!="="){
        if(isOps(parts[parts.length-1])){
            parts[parts.length-1]=o;
        }else{
            parts.push(viewerText);
            parts.push(filterOps(o));
            viewerText="0";
            viewer.innerHTML="0";
        }
    }else{
        if(isOps(parts[parts.length-1])){
            parts.push(viewerText);
            viewerText="0";
            console.log(parts);
            console.log(arrToString(parts));
            parts[0]=eval(arrToString(parts));
            viewer.innerHTML=parts[0];
            resetArrayFrom(parts,1);
        }
        else{
            parts[parts.length-1]=viewerText;
        }

    }
 }
 function arrToString(arr){
     var str="";
     for(var i=0,l=arr.length;i<l;i++){
        str+=arr[i];
     }
     return str;
 }
 function filterOps(ops){
     if(ops=="MOD"){return "%"}
     if(ops=="%"){return "*0.01"}
     return ops;
    }
function isOps(ops){
    if(ops=="+" || ops=="-" || ops=="*" || ops=="/" || ops=="%" || ops=="*0.01"){
        return true;
    }else{return false;}
}
function resetArrayFrom(arr,n){
    for(var i=n,l=arr.length;i<l;i++){
        arr.pop();
    }
    console.log("reset Arr");
    console.log(arr);
    return arr;
}
var clearBtn=document.getElementById("clear");
var allClear=document.getElementById("allClear");
clearBtn.addEventListener("click",function(){
    if(isOps(parts[parts.length-1]) && parts.length>=2){
        parts.pop();
        parts.pop();
    }else if(parts.length>=1){
             parts.pop()
    }
    viewerText="0";
    newInput=false;
    if(parts.length==1){
        viewer.innerHTML=parts[0];
    }else{
        viewer.innerHTML=viewerText;
       
    }
})
allClear.addEventListener("click",function(){
    viewerText="0";
    viewer.innerHTML=viewerText;
    resetArrayFrom(parts,0);
    newInput=false;
});