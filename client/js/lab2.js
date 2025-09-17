const submitbutton = document.getElementById("summit");
submitbutton.addEventListener("click",function(event){
    const firsttextbox = document.getElementById("input1");
    const secondttextbox = document.getElementById("input2");
    const thirdtextbox = document.getElementById("input3");

    var first = firsttextbox.value; 
    var second = secondttextbox.value; 
    var third = $('#input3').val(); 

    console.log("first: ",first);
    console.log("second: ",second);
    console.log("third: ",third);

    alert(first +"\n"+second+"\n"+third);
    
    event.preventDefault();


});

$('clear').click(function(){
    $("#input1").val("");
    $("#input2").val("");
    $("#input3").val("");
})