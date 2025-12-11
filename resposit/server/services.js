/*
const fs=require('fs');
const path=require('path');

const database_file=path.join(__dirname+"/files/data.txt");
*/

const {MongoClient,ObjectId}=require('mongodb');
//const harryPotterSpells=require('harry-potter-spells');

//Define Database URL

const dbURL="mongodb://127.0.0.1";
//Define the database server

const client= new MongoClient(dbURL);

const services= function(app){

    app.post('/write-record',async function(req,res){
        //var id="rec"+Date.now();

        var foodData={
            
            name:req.body.name,
            price:req.body.price,
            calorie:req.body.calorie,
            rating:req.body.rating,
            purchesed:req.body.purchesed
        }
        
        try{
            const conn=await client.connect();
            const db=conn.db("JoesGrill");
            const coll=db.collection("foodList");

            await coll.insertOne(foodData);

            await conn.close();
            return res.json({msg:"SUCCESS"});
        }catch(err){
            return res.json({msg:"error: "+err});
        }
        
        
        
        /*
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
    */
    })

    app.get("/get-records",async function(req,res){
        
        const orderBy={name:1};
        //2.  Connect, find data, close database, return results or error 
        try{
            const conn=await client.connect();
            const db=conn.db("JoesGrill");
            const coll=db.collection("foodList");

            const foodList=await coll.find().sort(orderBy).toArray();
            
            await conn.close();
            
            return res.json({msg:"SUCCESS",foodList:foodList});
        }
        catch(err){
           return res.json({msg:"error: "+err});
        }

        /*
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
    */
    });
    app.delete('/delete-record',async function(req,res){
        
        var foodIDSentFromClient = req.query.ID;

        //2. Convert id string to a MongoID object
        var foodIDAsMongoObject= ObjectId.createFromHexString(foodIDSentFromClient);
        //3. Create search with MongoID
        const search={_id:foodIDAsMongoObject};
        //4.  Connect and delete data, close database, return success or failure
        try{
            const conn=await client.connect();
            const db=conn.db("JoesGrill");
            const coll=db.collection("foodList");

            await  coll.deleteOne(search);

            await conn.close();
            return res.json({msg:"SUCCESS"});
        }catch(err){
            return res.json({msg:"error: "+err});
        }

        /*
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
        */
    });
        


}

module.exports=services;
