const range101 = [...Array(101).keys()];
const NORMAL = range101.map(x => 5+1200*Math.exp(Math.pow(x-50,2)/-500)/Math.sqrt(Math.PI*500));

let toleft = n => n/100*88.125+5.9325+"%";

let change = n => {
    let v = $("input").val();
    $("#our-stand").css("left",toleft(v));
    $("#their-stand").css("left",toleft(n==2 ? maxh2(v) : h1to2(v)));
    if(n==3){$("#third-stand").css("left",toleft(h1to3(v)));} 
    n==2 ? col2balls(v,maxh2(v)) : col3balls(v,h1to2(v),h1to3(v));
}

$(document).ready(function(){
    centerHeader();
    drawBalls();
    $("i").click(function(){
        if(!$(this).hasClass("selected")){
            let clicked = !$(this).is("i:first-of-type") ? 3 : 2;
            clicked == 3 ? $("header").append("<div id='third-stand'><span>ICE-CREAM!</span></div>") : $("#third-stand").remove();
            $("input").attr("onchange","change("+clicked+")");
            $(".ball").removeClass().addClass("ball tie");
            ballsTo(clicked);
            $("i").toggleClass("selected");
        }
    });
    $(window).resize(centerHeader);
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

let col2balls = (y, o) => range101.forEach((c,i) => {
    $("#"+i+"").removeClass().addClass("ball "+((Math.abs(y-i)<Math.abs(o-i)) ? "red" : (Math.abs(y-i)==Math.abs(o-i)) ? "tie" : "green"));
});

let h3 = (a,b,c) => {
    let score = [0,0,0];
    range101.forEach((curr, i) => {
        let dist = [Math.abs(a-i),Math.abs(b-i),Math.abs(c-i)]
        let min = Math.min(...dist);
        let mins = [0,1,2].filter(x => dist[x]==min);
        mins.forEach(x => {score[x]+=NORMAL[i]/(mins.length);});
    });
    return score;
};

let h2to3 = (a,b) => range101
    .reduce((ack, crr) => h3(a,b,crr)[2]>ack[1] && (Math.abs(crr-a)>=5) && (Math.abs(crr-b)>=5) 
        ? [crr,h3(a,b,crr)[2]] : ack, [0,0])[0];

let h1to2 = a => range101
    .reduce((ack,crr) => h3(a,crr,h2to3(a,crr))[1]>ack[1] && (Math.abs(crr-a)>=5) 
        ? [crr,h3(a,crr,h2to3(a,crr))[1]] : ack, [0,0])[0];

let h1to3 = (a) => h2to3(a,h1to2(a));

let col3balls = (a,b,c) => range101
    .forEach((cur,i) => {$("#"+i+"").removeClass().addClass("ball "+pos3col(a,b,c,i));});

let pos3col = (a,b,c,i) => (Math.abs(a-i)<Math.abs(b-i) && Math.abs(a-i)<Math.abs(c-i)) ? "red" :
    (Math.abs(b-i)<Math.abs(a-i) && Math.abs(b-i)<Math.abs(c-i)) ? "green" :
    (Math.abs(c-i)<Math.abs(b-i) && Math.abs(c-i)<Math.abs(a-i)) ? "blue" : "tie";