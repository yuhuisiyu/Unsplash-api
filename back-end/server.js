var express = require('express');
var app = express();
var axios = require('axios');

//fix the cros problem
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', getPhoto);
app.get('/search', searchPhoto);

function getPhoto(req,res) {
    axios.get('https://api.unsplash.com/photos/random',
        {
        params: {
            count:'25',
            client_id: '78d71975c45e0eaf1a48f92c543f2eebc9e59fb697f367162ec69aa2a98a90ac'
        }
    })
        .then(response => {
        res.json(response.data);
    })
        .catch(error => {
            res.status(500);
            res.send(error.response.data);
        });
}

function searchPhoto(req,res) {
    axios.get('https://api.unsplash.com/search/photos',{
        params: {
            query: req.query.query,
            per_page:'25',
            client_id: '78d71975c45e0eaf1a48f92c543f2eebc9e59fb697f367162ec69aa2a98a90ac'
        }
    }).then(response=> {
        res.json(response.data);
    })
        .catch(error=>{
            res.status(500);
            res.json(error.response.data);
        });
}
app.listen(3002);

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// // // configure a public directory to host static content
// // app.use(express.static(__dirname + '/public'));
//
// // require ("./test/app.js")(app);
// require("./app.js");
//
// var port = process.env.PORT || 3000;
//
// app.listen(port);