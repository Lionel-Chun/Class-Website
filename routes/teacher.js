var express = require('express');
var router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

// const teacher = [
//     {name:'Alex',tel:'91234567',sex:'M',age:30,course:['eng', 'chi']},
//     {name:'Betty',tel:'92345678',sex:'F',age:28,course:['chem']},
//     {name:'Carie',tel:'61234567',sex:'F',age:50,course:['history']}
// ];

router.get('/createDB', async function(req, res, next) {

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // let db = client.db("mdb");
    // db.dropCollection("teacher");
    await client.db("mdb").collection("teacher").deleteMany({});
    await client.db("mdb").collection("teacher").insertOne(
      {name:'Alex',tel:'91234567',sex:'M',age:30,course:['eng', 'chi']}
    );
    await client.db("mdb").collection("teacher").insertMany([
      {name:'Betty',tel:'92345678',sex:'F',age:28,course:['chem']},
      {name:'Carie',tel:'61234567',sex:'F',age:50,course:['history']}
    ]);
    res.send("DB created");
  } finally {
    await client.close();
  }
}).get('/', async function(req, res, next) { // list teachers name

  try {
    await client.connect();
    let teacher =  await client.db("mdb").collection("teacher").find().toArray(), s = "";
    // let s = "";
    for (let t of teacher) 
      s+=t.name + " <a href=/teacher/detail?name=" + t.name + ">detail</a><br>";
    res.send("<h3>Teacher name list</h3>" + s);
  } finally {
    await client.close();
  }

}).get('/detail', async function(req, res, next) {

    try {
      await client.connect();
      // let teacher = await client.db("mdb").collection("teacher").findOne({
      //   name:req.query.name
      // }), s = "";

      let teacher = await client.db("mdb").collection("teacher").findOne(req.query, {
        projection: {name:1, course:1, sex:1, _id:0}
      }), s = "";
      
      if (!teacher) {
        res.send('Name does not exist');
        return;
      }

      // for (let f in teacher) if (f!="_id") s+= f + ": " + teacher[f] + "<br>"; 
      for (let f in teacher) s+= f + ": " + teacher[f] + "<br>";
      res.send("<h3>Detail of teacher " + req.query.name + "</h3>" + s);   
    } finally {
      await client.close();
    }

    // const name=req.query.name;
    // for (let t of teacher) {
    //   if (name==t.name) {
    //     let s="";
    //     for (let f in t) s+= f + ": " + t[f] + "<br>";
    //     res.send("<h3>Detail of teacher " + name + "</h3>" + s);
    //     return; //break;
    //   }
    // }
    // res.send("Cannot find matching teacher");

});

router.post('/insert', async function(req, res, next) {

  console.log(req.body);
  
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    await client.db("mdb").collection("teacher").insertOne(
      req.body
    );
    res.send("record inserted");
  } finally {
    await client.close();
  }
});


// router.post('/detail', function(req, res, next) {
//   let name = req.body.name;
//   let tel = req.body.tel;
//   let sex = req.body.sex;
//   let age = req.body.age;
//   let course = Object.values(req.body.course);
//   let newTeacher = {name:name,tel:tel,sex:sex,age:age,course:course};
//   teacher[teacher.length] = newTeacher;
//   //console.log(teacher);
//   let html = '<h1>Teacher List</h1>';
//   for(let num in teacher) {
//     html += 'Name: ' + teacher[num].name + '<br>';
//     html += 'Tel: ' + teacher[num].tel + '<br>' ;
//     html += 'Sex: ' + teacher[num].sex + '<br>' ;
//     html += 'Age: ' + teacher[num].age + '<br>' ;
//     html += 'Course: ' + teacher[num].course.toString() + '<br>' ;
//     html += '<hr>';
//   }
//   res.send(html);
// });
module.exports = router;