var NORMAL = [4.32,4.68,5.05,5.45,5.87,6.32,6.78,7.27,7.78,8.32,8.87,9.45,10.05,10.67,11.32,11.98,12.66
    ,13.35,14.07,14.79,15.53,16.29,17.05,17.81,18.58,19.36,20.13,20.9,21.67,22.43,23.18,23.91,24.63,
    25.33,26,26.66,27.28,27.88,28.44,28.97,29.46,29.91,30.32,30.69,31.01,31.28,31.51,31.69,31.81,31.89,
    31.92,31.89,31.81,31.69,31.51,31.28,31.01,30.69,30.32,29.91,29.46,28.97,28.44,27.88,27.28,26.66,26,
    25.33,24.63,23.91,23.18,22.43,21.67,20.9,20.13,19.36,18.58,17.81,17.05,16.29,15.53,14.79,14.07,13.35,
    12.66,11.98,11.32,10.67,10.05,9.45,8.87,8.32,7.78,7.27,6.78,6.32,5.87,5.45,5.05,4.68,4.32];

function change(){
    $("#our-stand").css("left",$("input").val()/100*88.125+5.9325+"%");
    $("#their-stand").css("left",maxhotelling($("input").val())/100*88.125+5.9325+"%");
    displayhotelling($("input").val(),maxhotelling($("input").val()));
}

function changeThree(){
    $("#our-stand").css("left",$("input").val()/100*88.125+5.9325+"%");
    $("#their-stand").css("left",hotellingOnetoTwo($("input").val())/100*88.125+5.9325+"%");
    $("#third-stand").css("left",hotellingOnetoThree($("input").val())/100*88.125+5.9325+"%");
    colorThreeBalls($("input").val(),hotellingOnetoTwo($("input").val()),hotellingOnetoThree($("input").val()));
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
        $("header").append("<nav class='ball tie' id='"+i+"'></nav>");
    }
    for(var i=0; i<101; i++){
        $("#"+i+"").css("left",i/100*88.125+5.9325+"%");
    }
}

function ballsTo(n){
    if(n==3){
        for(var i=0; i<101; i++){
            $("#"+i+"").css("height",NORMAL[i]+"px");
        }
    }else{
        $(".ball").css("height","10px");
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

function hotellingThree(a,b,c){
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

function hotellingTwotoThree(a,b){
    var max = [0,0];
    for(var i=0; i<101; i++){
        if(hotellingThree(a,b,i)[2]>max[1] && (Math.abs(i-a)>=5) && (Math.abs(i-b)>=5)){
            max = [i,hotellingThree(a,b,i)[2]];
        }
    }
    return max[0];
}

function hotellingOnetoTwo(a){
    var max = [0,0];
    for(var i=0; i<101; i++){
        if(hotellingThree(a,i,hotellingTwotoThree(a,i))[1]>max[1] && (Math.abs(i-a)>=5)){
            max = [i,hotellingThree(a,i,hotellingTwotoThree(a,i))[1]];
        }
    }
    return max[0];
}

function hotellingOnetoThree(a){
    return hotellingTwotoThree(a,hotellingOnetoTwo(a));
}

function colorThreeBalls(a,b,c){
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

