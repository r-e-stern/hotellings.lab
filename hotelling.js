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

