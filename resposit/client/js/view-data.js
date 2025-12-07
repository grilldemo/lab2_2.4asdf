
//var dataset ='[{ "name":"coke","price":"1.99","calorie":"50","rating":"4.5","purchesed":"140"},{ "name":"steak","price":"20.00","calorie":"500","rating":"4.0","purchesed":"30"},{ "name":"chicken breast","price":"14.99","calorie":"600","rating":"4.7","purchesed":"29"},{ "name":"grilled aspargus","price":"5.99","calorie":"100","rating":"3.7","purchesed":"50"},{ "name":"burger","price":"10.99","calorie":"400","rating":"4.9","purchesed":"70"}]';

//const  reser  = require('express');
//const { response }=require('express');
//const jsonObj = JSON.parse(dataset);








var t1="name";
var t2="price";
var t3="calories";
var t4="rating";
var t5="purchesed";
var t6="";

var htmlstring="";

//padding-left: 130%; font-size: 30px;background-color: red;

main();

function main(){
    //console.log(jsonObj);
    //console.log(jsonObj.length);
    //console.log(JSON.stringify(jsonObj));
    retriveData();
    
    //displaytable();
}

function displaytable(jsonObj){
    htmlstring="";
    htmlstring+="<tr>"
        htmlstring+="<td style='padding-left: 60%;padding-right: 0%; font-size: 30px;'>"+t1+"</td>";
        htmlstring+="<td style='padding-left: 70%; font-size: 30px;'>"+t2+"</td>";   
        htmlstring+="<td style='padding-left: 80%; font-size: 30px;'>"+t3+"</td>";    
        htmlstring+="<td style='padding-left: 90%; font-size: 30px;'>"+t4+"</td>";
        htmlstring+="<td style='padding-left: 100%; font-size: 30px;'>"+t5+"</td>";  
        htmlstring+="<td style='padding-left: 110%; font-size: 30px;'>"+t6+"</td>";
    htmlstring+="</tr>"
    for(var i=0;i<jsonObj.length; i++){
        htmlstring+="<tr>"
            htmlstring+="<td style='padding-left: 60%;padding-right: 0%; font-size: 30px;'>"+jsonObj[i].name+"</td>"
            htmlstring+="<td style='padding-left: 70%; font-size: 30px;'>"+jsonObj[i].price+"</td>"   
            htmlstring+="<td style='padding-left: 80%; font-size: 30px;'>"+jsonObj[i].calorie+"</td>"    
            htmlstring+="<td style='padding-left: 90%; font-size: 30px;'>"+jsonObj[i].rating+"</td>"
            htmlstring+="<td style='padding-left: 100%; font-size: 30px;'>"+jsonObj[i].purchesed+"</td>"  
            htmlstring+="<td style='padding-left: 110%; font-size: 30px;'><button class='delete-button' data-id="+jsonObj[i].id+">delete</button></td>"
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

function retriveData(){

    //get datfrom datbase

    fetch(libraryURL+"/get-records",{
        method:"GET"
    })
    .then(Response=>{
        if(!Response.ok){
            throw new Error("network error: "+Response.statusText);
        }
        return Response.json();
    })

    .then(data=>{
        if(data.msg="SUCCESS"){
            displaytable(data.foodList);
            activateDelete();
        }
    })
    .catch(err=>{
        alert("error: "+err);
    })

}

function activateDelete() {
// Capture all html items tagged with the delete-button class
    const deleteButtons = document.querySelectorAll('.delete-button');
//Loop through all the deleteButtons and create a listener for each
//one
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const deleteID = this.getAttribute("data-id"); // <-- from
//the html button object
        handleDelete(deleteID); //You will write this function.
        });
    });
}
function  handleDelete(deleteID){
    fetch(libraryURL+"/delete-record",{
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:deleteID})
    })
    .then(Response=>{
         if(!Response.ok){
            throw new Error(" line 124 network error: "+Response.statusText);
            
        }
        return Response.json();
    })
    .then(data=>{
        if(data.msg="SUCCESS"){
             retriveData()
        }
       
    })
    .catch(error=>{
        alert("line 136 error: "+error);
        console.log("error is here");
    });

}