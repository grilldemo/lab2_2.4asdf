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
            purchesed:req.body.purchesed,
            category:req.body.category
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

       
    });
    app.delete('/delete-record',async function(req,res){
        
        var foodIDSentFromClient = req.query.foodID;

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

        
    });
    app.get("/get-foodsByCategory", async function(req, res) {
        //1.  Capture data sent from client (see line 34 in spellsTable.js for JSON object name)
        var categoryValueSentFromClient = req.query.category;

        //2.  Filter by the data value sent from the client.
        //       Note: type = "", is sent when ALL is selected.
        var search = (categoryValueSentFromClient === "") ? { } : {category: categoryValueSentFromClient};

        //3. Set up sort by name ascending
            const orderBy={name:1};
        //4.  Connect, find data, close database, return results or error
        try{
            const conn=await client.connect();
            const db=conn.db("JoesGrill");
            const coll=db.collection("foodList");

            const foodList=await coll.find(search).sort(orderBy).toArray();

            await conn.close();

             return res.json({msg:"SUCCESS",foodList:foodList});
        }catch{
            return res.json({msg:"error: "+err});
        }
    });
    app.put('/update-food', async function(req, res) {
        //1.  Bring in the data from the client (see spellsTable.js, line 96 for JSON object names)
        var IDSentFromClient = req.body.foodID;
        

        //2. Create JSON with the data sent
            var updateData={
                $set:{
                    name:req.body.name,
                    price:req.body.price,
                    calorie:req.body.calorie,
                    rating:req.body.rating,
                    purchesed:req.body.purchesed,
                    category:req.body.category
                }
            }
        //3. Convert id string to a MongoID object
            var IDAsMongoObject=ObjectId.createFromHexString(IDSentFromClient);
        //4. Create search with MongoID
            const search={_id:IDAsMongoObject};
        //5.  Connect and update data, close database, return success or failure

        const conn=await client.connect();
        const db=conn.db("JoesGrill");
        const coll=db.collection("foodList");

        await coll.updateOne(search,updateData);

        await conn.close();
        return res.json({msg:"SUCCESS"});
});

}

module.exports=services;
