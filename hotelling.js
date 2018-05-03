var NORMAL = [10.9,11,11.1,11.3,11.4,11.6,11.8,12,12.2,12.4,12.7,13,13.3,13.6,13.9,14.3,14.7,15.1,15.5,16,16.5,17,17.5,18,18.6,19.1,19.7,20.3,20.9,21.5,22.1,22.7,23.3,23.9,24.5,25.1,25.6,26.1,26.7,27.1,27.6,28,28.4,28.8,29.1,29.3,29.6,29.7,29.8,29.9,29.9,29.9,29.8,29.7,29.6,29.3,29.1,28.8,28.4,28,27.6,27.1,26.7,26.1,25.6,25.1,24.5,23.9,23.3,22.7,22.1,21.5,20.9,20.3,19.7,19.1,18.6,18,17.5,17,16.5,16,15.5,15.1,14.7,14.3,13.9,13.6,13.3,13,12.7,12.4,12.2,12,11.8,11.6,11.4,11.3,11.1,11,10.9];
function change(){
    $("#our-stand").css("left",$("input").val()/100*88.125+5.9325+"%");
    $("#their-stand").css("left",maxhotelling($("input").val())/100*88.125+5.9325+"%");
    displayhotelling($("input").val(),maxhotelling($("input").val()));
}

$(window).resize(function(){
    centerHeader();
});

$(document).ready(function(){
    centerHeader();
    drawBalls();
});

function centerHeader(){
    $("header").css("top",($(window).height()-$("header").height()-10)/2+"px");
}

function hotelling(yours,opponent) {
    var score = 0;
    for (var i = 0; i < 101; i++) {
        if (Math.abs(yours - i) < Math.abs(opponent - i)) {
            score++;
        }else if(Math.abs(yours - i) == Math.abs(opponent - i)){
            score+=.5;
        }
    }
    return score;
}

function maxhotelling(opponent){
    var max = [0,0];
    for(var i=0; i<101; i++){
        if((hotelling(i,opponent)>max[1]) && (Math.abs(i-opponent)>=5)){
            max=[i,hotelling(i,opponent)];
        }
    }
    return max[0];
}

function drawBalls(){
    for(var i=0; i<101; i++){
        $("header").append("<nav class='ball' id='"+i+"'></nav>");
    }
    for(var i=0; i<101; i++){
        $("#"+i+"").css("left",i/100*88.125+5.9325+"%");
        $("#"+i+"").css("height",((NORMAL[i]-10)*2+5)+"px");
    }
}

function displayhotelling(yours, opponent){
    for(var i=0; i<101; i++){
        if (Math.abs(yours - i) < Math.abs(opponent - i)) {
            $("#"+i+"").removeClass().addClass("ball red");
        }else if(Math.abs(yours - i) == Math.abs(opponent - i)){
            $("#"+i+"").removeClass().addClass("ball tie");
        }else{
            $("#"+i+"").removeClass().addClass("ball green");
        }
    }
}

