import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

// root rout
app.get("/",async function(req,res){
    // res.send("This is a root rout");
    const queryResponse = await db.query('SELECT * FROM guestbook');
    res.json(queryResponse.rows);
});
app.listen(8080,function(){
    console.log('server is running on port 8080');
});

app.post("/add",function(req,res){
    console.log(req.body.formValues.name);

    db.query(`INSERT INTO guestbook (name, city,feedback) VALUES ($1,$2,$3)`,
        [req.body.formValues.name, req.body.formValues.city, req.body.formValues.feedback]);
});

