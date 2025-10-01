
var dataset ='[{ "name":"coke","price":"1.99","calorie":"50","rating":"4.5","purchesed":"140"},{ "name":"steak","price":"20.00","calorie":"500","rating":"4.0","purchesed":"30"},{ "name":"chicken breast","price":"14.99","calorie":"600","rating":"4.7","purchesed":"29"},{ "name":"grilled aspargus","price":"5.99","calorie":"100","rating":"3.7","purchesed":"50"},{ "name":"burger","price":"10.99","calorie":"400","rating":"4.9","purchesed":"70"}]';

var jsonObj = JSON.parse(dataset);

var t1="name";
var t2="price";
var t3="calories";
var t4="rating";
var t5="purchesed";

var htmlstring="";
htmlstring+="<tr>"
    htmlstring+="<td style='padding-left: 130%; font-size: 30px;'>"+t1+"</td>";
    htmlstring+="<td style='padding-left: 120%; font-size: 30px;'>"+t2+"</td>";   
    htmlstring+="<td style='padding-left: 130%; font-size: 30px;'>"+t3+"</td>";    
    htmlstring+="<td style='padding-left: 140%; font-size: 30px;'>"+t4+"</td>";
    htmlstring+="<td style='padding-left: 150%; font-size: 30px;'>"+t5+"</td>";  
htmlstring+="</tr>"
//padding-left: 130%; font-size: 30px;background-color: red;

main();

function main(){
    console.log(jsonObj);
    console.log(jsonObj.length);
    console.log(JSON.stringify(jsonObj));

    displaytable();
}

function displaytable(){

    for(var i=0;i<jsonObj.length; i++){
        htmlstring+="<tr>"
            htmlstring+="<td td style='padding-left: 130%; font-size: 30px;'>"+jsonObj[i].name+"</td>"
            htmlstring+="<td td style='padding-left: 120%; font-size: 30px;'>"+jsonObj[i].price+"</td>"   
            htmlstring+="<td td style='padding-left: 130%; font-size: 30px;'>"+jsonObj[i].calorie+"</td>"    
            htmlstring+="<td td style='padding-left: 140%; font-size: 30px;'>"+jsonObj[i].rating+"</td>"
            htmlstring+="<td td style='padding-left: 150%; font-size: 30px;'>"+jsonObj[i].purchesed+"</td>"  
        htmlstring+="</tr>"
    }
    var tablebObj =document.getElementById("listTable");
    tablebObj.innerHTML= htmlstring;



}

function inputTable(b1,b2,b3,b4,b5){



    var inputdata={};
    inputdata.name=b1;
    inputdata.price=b2;
    inputdata.calorie=b3;
    inputdata.rating=b4;
    inputdata.purchesed=b5;
    jsonObj.push(inputdata);
    displaytable();
}