import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const Dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var userIsAuthorised = false;

app.use(bodyParser.urlencoded({extended : true}));

function passwordCheck (req, res, next){
    const password = req.body["password"];
    if(password === "ILoveProgramming"){
        userIsAuthorised = true;
    }
    next();
}
app.use(passwordCheck);

app.get("/", (req,res) => {
    res.sendFile( Dirname + "/public/index.html");
});

app.post("/check", (req, res) =>{
    if(userIsAuthorised){
        res.sendFile(Dirname + "/public/secret.html");
    }else{
        res.sendFile(Dirname + "/public/index.html");    // or res.redirect("/");    
    }
});

app.listen(port, () => {
    console.log(`your runned in ${port}`);
});