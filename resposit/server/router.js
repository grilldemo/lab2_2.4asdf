
const path=require('path');

//function to holdf all listeners

var router=function(app){
    app.get('/',function(req,res){
        res.sendFile(path.join(__dirname +"/../client/joes_grill.html"))
    });

     app.get('/view-data',function(req,res){
        res.sendFile(path.join(__dirname +"/../client/view-data.html"))
    });
     app.get('/write-data',function(req,res){
        res.sendFile(path.join(__dirname +"/../client/write-data.html"))
    });



}

module.exports=router;