var NORMAL = [4.32,4.68,5.05,5.45,5.87,6.32,6.78,7.27,7.78,8.32,8.87,9.45,10.05,10.67,11.32,11.98,12.66
    ,13.35,14.07,14.79,15.53,16.29,17.05,17.81,18.58,19.36,20.13,20.9,21.67,22.43,23.18,23.91,24.63,
    25.33,26,26.66,27.28,27.88,28.44,28.97,29.46,29.91,30.32,30.69,31.01,31.28,31.51,31.69,31.81,31.89,
    31.92,31.89,31.81,31.69,31.51,31.28,31.01,30.69,30.32,29.91,29.46,28.97,28.44,27.88,27.28,26.66,26,
    25.33,24.63,23.91,23.18,22.43,21.67,20.9,20.13,19.36,18.58,17.81,17.05,16.29,15.53,14.79,14.07,13.35,
    12.66,11.98,11.32,10.67,10.05,9.45,8.87,8.32,7.78,7.27,6.78,6.32,5.87,5.45,5.05,4.68,4.32];

const range101 = [...Array(101).keys()];

function change(){
    $("#our-stand").css("left",$("input").val()/100*88.125+5.9325+"%");
    $("#their-stand").css("left",maxh2($("input").val())/100*88.125+5.9325+"%");
    disph($("input").val(),maxh2($("input").val()));
}

function changeThree(){
    $("#our-stand").css("left",$("input").val()/100*88.125+5.9325+"%");
    $("#their-stand").css("left",h1to2($("input").val())/100*88.125+5.9325+"%");
    $("#third-stand").css("left",h1to3($("input").val())/100*88.125+5.9325+"%");
    col3balls($("input").val(),h1to2($("input").val()),h1to3($("input").val()));
}

$(document).ready(function(){
    centerHeader();
    drawBalls();
    $("i").click(function(){
        if(!$(this).hasClass("selected")){
            if(!$(this).is("i:first-of-type")){
                $("header").append("<div id='third-stand'><span>ICE-CREAM!</span></div>");
                $("input").attr("onchange","changeThree()");
                $(".ball").removeClass().addClass("ball tie");
                ballsTo(3);
            }else{
                $("#third-stand").remove();
                $("input").attr("onchange","change()");
                $(".ball").removeClass().addClass("ball tie");
                ballsTo(2);
            }
            $("i").toggleClass("selected");
        }
    });
    $(window).resize(function(){
        centerHeader();
    });
});

let centerHeader = () => $("header").css("top",($(window).height()-$("header").height()-10)/2+"px");

let h2 = (y,o) => range101
    .reduce((ack,crr) => (Math.abs(y - crr) < Math.abs(o - crr)) 
        ? (ack+1) : (Math.abs(y - crr) == Math.abs(o - crr)) 
        ? (ack+0.5) : ack, 0);

let maxh2 = o => range101
    .reduce((ack, crr) => (h2(crr,o)>ack[1]) && (Math.abs(crr-o)>=5) 
        ? [crr,h2(crr,o)] : ack, [0,0])[0];

let drawBalls = () => range101.forEach((c,i) => {
        $("header").append("<nav class='ball tie' id='"+i+"'></nav>");
        $("#"+i+"").css("left",i/100*88.125+5.9325+"%");
    });

let ballsTo = n => n == 3 
    ? range101.forEach((c,i) => {$("#"+i+"").css("height",NORMAL[i]+"px");}) 
    : $(".ball").css("height","10px");

let disph = (y, o) => range101.forEach((c,i) => {
    $("#"+i+"").removeClass().addClass("ball " + ((Math.abs(y - i) < Math.abs(o - i)) ? "red" : (Math.abs(y - i) == Math.abs(o - i)) ? "tie" : "green"));
});

function h3(a,b,c){
    var score = [0,0,0];
    var dist = [0,0,0];
    for(var i=0; i<101; i++){
        dist[0]=Math.abs(a-i);
        dist[1]=Math.abs(b-i);
        dist[2]=Math.abs(c-i);
        if(dist[0]<dist[1] && dist[0]<dist[2]){
            score[0]+=NORMAL[i];
        }else if(dist[1]<dist[0] && dist[1]<dist[2]){
            score[1]+=NORMAL[i];
        }else if(dist[2]<dist[1] && dist[2]<dist[0]){
            score[2]+=NORMAL[i];
        }else if(dist[0]==dist[1] && dist[2]>dist[0]){
            score[0]+=NORMAL[i]/2;
            score[1]+=NORMAL[i]/2;
        }else if(dist[0]==dist[2] && dist[1]>dist[0]){
            score[0]+=NORMAL[i]/2;
            score[2]+=NORMAL[i]/2;
        }else if(dist[2]==dist[1] && dist[0]>dist[2]){
            score[1]+=NORMAL[i]/2;
            score[2]+=NORMAL[i]/2;
        }else{
            score[0]+=NORMAL[i]/3;
            score[1]+=NORMAL[i]/3;
            score[2]+=NORMAL[i]/3;
        }
    }
    return score;
}

let h2to3 = (a,b) => range101
    .reduce((ack, crr) => h3(a,b,crr)[2]>ack[1] && (Math.abs(crr-a)>=5) && (Math.abs(crr-b)>=5) 
        ? [crr,h3(a,b,crr)[2]] : ack, [0,0])[0];

let h1to2 = a => range101
    .reduce((ack,crr) => h3(a,crr,h2to3(a,crr))[1]>ack[1] && (Math.abs(crr-a)>=5) 
        ? [crr,h3(a,crr,h2to3(a,crr))[1]] : ack, [0,0])[0];

let h1to3 = (a) => h2to3(a,h1to2(a));

function col3balls(a,b,c){
    var dist = [0,0,0];
    for(var i=0; i<101; i++){
        dist[0]=Math.abs(a-i);
        dist[1]=Math.abs(b-i);
        dist[2]=Math.abs(c-i);
        if(dist[0]<dist[1] && dist[0]<dist[2]){
            $("#"+i+"").removeClass().addClass("ball red");
        }else if(dist[1]<dist[0] && dist[1]<dist[2]){
            $("#"+i+"").removeClass().addClass("ball green");
        }else if(dist[2]<dist[1] && dist[2]<dist[0]){
            $("#"+i+"").removeClass().addClass("ball blue");
        }else{
            $("#"+i+"").removeClass().addClass("ball tie");
        }
    }
}