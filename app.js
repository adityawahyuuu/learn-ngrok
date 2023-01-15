const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const ngrok = require('ngrok');

const router = express.Router();
const app = express();
const host = "name of host";
const port = "number of port";

app.set('view engine', 'ejs');

app.use(cors());
app.use("/",router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/',(req, res) => {
    res.render('index');
});

router.post('/login',(req, res) => {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = "+user_name+" ", "password is" +password);
    res.end('yes');
});

const init = async () => {
    app.listen(port, host, () => {
        console.log(`Example app listening on port http://${host}:${port}`);
    });
    
    await ngrok.connect(port, (err, url) => {
        if (err) {
            console.error('Error while connecting Ngrok',err);
            return new Error('Ngrok Failed');
        }
    });
}

init();
