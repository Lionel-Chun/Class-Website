var express = require('express');
var router = express.Router();
const teacher = [
    {name:'Alex',tel:'91234567',sex:'M',age:30,course:['eng', 'chi']},
    {name:'Betty',tel:'92345678',sex:'F',age:28,course:['chem']},
    {name:'Carie',tel:'61234567',sex:'F',age:50,course:['history']}
];
router.get('/', function(req, res, next) { // list teachers name
    let s = "";
    for (let t of teacher) 
      s+=t.name + " <a href=/teacher/detail?name=" + t.name + ">detail</a><br>";
    res.send("<h3>Teacher name list</h3>" + s);
}).get('/detail', function(req, res, next) {
    const name=req.query.name;
    for (let t of teacher) {
      if (name==t.name) {
        let s="";
        for (let f in t) s+= f + ": " + t[f] + "<br>";
        res.send("<h3>Detail of teacher " + name + "</h3>" + s);
        return; //break;
      }
    }
    res.send("Cannot find matching teacher");
}).post('/detail', function(req, res, next) {
  let name = req.body.name;
  let tel = req.body.tel;
  let sex = req.body.sex;
  let age = req.body.age;
  let course = Object.values(req.body.course);
  let newTeacher = {name:name,tel:tel,sex:sex,age:age,course:course};
  teacher[teacher.length] = newTeacher;
  //console.log(teacher);
  let html = '<h1>Teacher List</h1>';
  for(let num in teacher) {
    html += 'Name: ' + teacher[num].name + '<br>';
    html += 'Tel: ' + teacher[num].tel + '<br>' ;
    html += 'Sex: ' + teacher[num].sex + '<br>' ;
    html += 'Age: ' + teacher[num].age + '<br>' ;
    html += 'Course: ' + teacher[num].course.toString() + '<br>' ;
    html += '<hr>';
  }
  res.send(html);
});
module.exports = router;