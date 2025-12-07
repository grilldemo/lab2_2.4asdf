
function clearall(){
    document.getElementById("b111").value= "";
    document.getElementById("b222").value= "";
    document.getElementById("b333").value= "";
    document.getElementById("b444").value= "";
    document.getElementById("b555").value= "";

}


function sendData1(){
                        
                        var string1 =document.getElementById("b111").value;
                        var string2 =document.getElementById("b222").value;
                        var string3 =document.getElementById("b333").value;
                        var string4 =document.getElementById("b444").value;
                        var string5 =document.getElementById("b555").value;
                        if(!string1||!string2||!string3||!string4||!string5){
                            alert("please fill in all fields");
                            return;
                        }
                        var jsonObject={
                            name:string1,
                            price:string2,
                            calorie:string3,
                            rating:string4,
                            purchesed:string5
                        }
                        fetch(libraryURL+"/write-record",{
                            method:"post",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body: JSON.stringify(jsonObject)
                            
                        })
                        .then(Response=>{
                            if(!Response.ok){
                                throw new Error("network error: "+Response.statusText);
                            }
                            return Response.json();
                        })
                        .then(data=>{
                            alert(data.msg);
                            if(data.msg==="success"){
                                console.log("line 47")
                                //document.getElementById("clearbut").click();
                            }
                        })
                        .catch(error=>{
                            alert("alert line 51 "+error);
                        })
                      
                      
                      
                        //sendData(string1,string2,string3,string4,string5);
                    }