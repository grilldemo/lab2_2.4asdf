
const fs=require('fs');
const path=require('path');

const database_file=path.join(__dirname+"/files/data.txt");

const services= function(app){

    app.post('/write-record',function(req,res){
        var id="rec"+Date.now();

        var foodData={
            id:id,
            name:req.body.name,
            price:req.body.price,
            calorie:req.body.calorie,
            rating:req.body.rating,
            purchesed:req.body.purchesed
        }

        var foodList=[];

        if(fs.existsSync(database_file)){
            fs.readFile(database_file,"utf8",function(err,data){
                if(err){
                    res.send(JSON.stringify({msg:err}));
                }else{
                    foodList=JSON.parse(data);
                    foodList.push(foodData);

                    fs.writeFile(database_file,JSON.stringify(foodList),
                    function(err){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        }else{
                            res.send(JSON.stringify({msg:"success"}));
                        }
                    });
                }
            });
        }else{
            foodList.push(foodData);

             fs.writeFile(database_file,JSON.stringify(foodList),
                    function(err){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        }else{
                            res.send(JSON.stringify({msg:"success"}));
                        }
                    });

        }
    })

    app.get("/get-records",function(req,res){
        if(fs,fs.existsSync(database_file)){
            fs.readFile(database_file,"utf-8",function(err,data){
                if(err){
                    res.json({msg:err});
                }else{
                    foodListArray=JSON.parse(data);

                    res.json({msg:"SUCCESS",foodList:foodListArray});
                }
            })
        }else{
            foodListArray=[]
            res.join({msg:"SUCCESS",foodList:foodListArray})
        }
    });
    app.delete('/delete-record',function(req,res){
        
        fs.readFile(database_file,"utf-8",function(err,data){
            if(err){
                    console.log("before parseing line 76");    
                res.json({msg:err});
                }else{
                    console.log("before parseing line 78");
                    foodListArray=JSON.parse(data);
                                        console.log("after parseing line 80");
                    for(var i=0;i<foodListArray.length;i++){
                        if(foodListArray[i].id===req.body.id){
                        
                            foodListArray.splice(i,1);
                            break;
                            

                        }
                    }
                    fs.writeFile(database_file,JSON.stringify(foodListArray),
                    function(err){
                        if(err){
                            res.send(JSON.stringify({msg:err}));
                        }else{
                            res.send(JSON.stringify({msg:"SUCCESS"}));
                        }
                    });
                }
        });
    });
        


}

module.exports=services;

