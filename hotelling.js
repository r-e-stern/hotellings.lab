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
                console.log("to 3");
            }else{
                $("#third-stand").remove();
                $("input").attr("onchange","change()");
                $(".ball").removeClass().addClass("ball tie");
                console.log("to 2");
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
            score[0]++;
        }else if(dist[1]<dist[0] && dist[1]<dist[2]){
            score[1]++;
        }else if(dist[2]<dist[1] && dist[2]<dist[0]){
            score[2]++;
        }else if(dist[0]==dist[1] && dist[2]>dist[0]){
            score[0]+=.5;
            score[1]+=.5;
        }else if(dist[0]==dist[2] && dist[1]>dist[0]){
            score[0]+=.5;
            score[2]+=.5;
        }else if(dist[2]==dist[1] && dist[0]>dist[2]){
            score[1]+=.5;
            score[2]+=.5;
        }else{
            score[0]+=.33;
            score[1]+=.33;
            score[2]+=.33;
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

