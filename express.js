const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var multer = require('multer');
require('dotenv').config();

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());

/*a)Make a POST API with URL Query ,Body & Header Properties.*/
//url
app.post('/url', (req, res) => {
        var firstName = req.query.firstName;
        var lastName = req.query.lastName;
        res.send(firstName + " " + lastName);
    })
    //body
app.post('/body', (req, res) => {
        let JSONDATA = req.body;
        let JSONString = JSON.stringify(JSONDATA)
        res.send(JSONString);
    })
    //Header
app.post('/header', (req, res) => {
    let username = req.header('username')
    let password = req.header('password')
    res.send("username:" + username + " " + "password:" + password)
})

/* /*b)Make a file upload API support PNG,JPG file only */
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
const fileFilter = function(req, file, cb) {
    console.log(file);
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false)
        return cb(new Error());
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter }).single("myFile");

app.post('/file', function(req, res) {
    upload(req, res, function(error) {
        if (error) {
            res.send('File upload failed');
        } else {
            res.send('File upload succed');
        }
    })
})

/* c)Make a file Download API, that can download file from application directory */
const { downloads } = require("./application/download");
app.get('/downloads', downloads);

//Port connection
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`App is running on port: ${port}`);
})