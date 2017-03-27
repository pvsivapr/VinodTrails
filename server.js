var mysql = require('mysql')
var rfr = require('rfr');
var util = rfr('models/utilities');
var express = require('express');
var restify = require('restify');
var bodyParser = require('body-parser');
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);
var md5 = require('js-md5');
var server  = restify.createServer();
var multer  = require('multer');

var path = require('path');     //used for file path

var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin123!',
  database: 'allgives'
})


app.use(express.static(path.join(__dirname, 'public')));

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
  
})
 
var upload = multer({ storage: storage })
var cors = require('cors');
app.use(cors({origin: '*',methods:'GET, POST, OPTIONS, PUT, PATCH, DELETE'}));


app.post('/images/', upload.single('file'), function(req,res,next){
  
    console.log(req.body.insertid1);
    connection.query('UPDATE register SET ? WHERE p_id= ?', [ {myFile:req.file.originalname},req.body.insertid1],
  function(err,rows){
      
      res.json(rows);

  });
});

app.post('/updatedata/', function(req,res){
  
    console.log(req.body.insertid1);
    connection.query('UPDATE register SET ? WHERE p_id= ?', [ {reg_name:req.body.reg_name,reg_password:req.body.reg_password,reg_email:req.body.reg_email},req.body.p_id],
  function(err,rows){
      
      res.json(rows);

  });
});

app.get('/getHotelsByLoc/', function (req, res) {
    console.log('ghfh');
  connection.query('SELECT city_name FROM cities', function(err, rows) {
    console.log('hhhhhhhhhhhj');
    if (err) {
        
        console.log(err);
        
       
    }
    
    // console.log(rows);
   //   return(rows);
      res.json(rows);
        
  // connected! (unless `err` is set) 
});
});


app.get('/getdbRegister/', function (req, res) {
 
var date = new Date();
    console.log(date);
  connection.query('SELECT * FROM register', function(err, rows) {
    console.log('hhhhhhhhhhhj');
    if (err) {
        
        console.log(err);
        
       
    }
    
     console.log(rows);
   //   return(rows);
      res.json(rows);
        
  // connected! (unless `err` is set) 
});
});


//get  Locations
app.get('/getLocations', function (req, res) {
 connection.query('SELECT location_name FROM locations', function(err, rows) {
    console.log('hhhhhhhhhhhj');
    if (err) {
        
        console.log(err);
        
       
    }
    
    
    //console.log(rows);
   //   return(rows);
      res.json(rows);
        
  // connected! (unless `err` is set) 
});
});



app.get('/getProducts_by_loc_and_cat/:loc/:type', function (req, res) {
    var location=req.params.loc;
    var categy=req.params.type;
connection.query(
  'SELECT * FROM products WHERE prod_location=? && prod_category=?',[location,categy] , 
  function(err,rows){
    //  console.log(rows);
      res.json(rows);
   /*   connection.query(
  'SELECT * FROM products WHERE prod_category=?',categy , 
  function(err,ress){
    //  console.log('fffffh');
    if(err) throw err;
    console.log(ress);
      res.json(ress);
  });*/
  });
});
    
app.listen(process.env.PORT || 6737, function () {
    console.log("Server started @ ", process.env.PORT || 6737);
});
app.post('/register', function (req, res,next) {
    
    var products=req.body;
    
connection.query(
  'INSERT INTO register SET ?',products , 
  function(err,rows){
      console.log(rows);
      res.json(rows);

  });
});
   

    
app.post('/delete_person', function (req, res,next) {
    
    var products=req.body;
    console.log(req.body);
connection.query(
  'DELETE FROM register WHERE p_id = ? ',[products.p_id] , 
function(err,rows){
      
      res.json(rows);

  });
});