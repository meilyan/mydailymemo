import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

var getData = ["Tes aja"];
var getDate = ["Tes aja"];

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    getData = fs.readFileSync('curhat.txt', 'utf-8').toString().split(",");
    getData.reverse()

    getDate = fs.readFileSync('date.txt', 'utf-8').toString().split(",");
    getDate.reverse()
    res.render("index.ejs", {
        post: getData,
        date: getDate,
    })
    
});

app.get("/about", (req, res) => {
    res.render("about.ejs")
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs")
});

app.get("/github", (req, res) => {
    res.redirect(301, 'https://github.com/meilyan')
});

app.post("/post", (req, res) => {
    var curhatText = req.body["curhat"];
    getData.push(curhatText);
    var array = getData.toString();
    getData.reverse();
    fs.writeFile("curhat.txt", array, function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("This file was saved")
    });

    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1;
    const day   = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const newDate = `${year} - ${month} - ${day}`;
    getDate.push(`${newDate}`);
    const array2 = getDate.toString();
    getDate.reverse();
    fs.writeFile("date.txt", array2, function(err) {
        if(err) {
            return console.log(err)
        } 
        console.log("This file was saved")
    });

    res.redirect("/")
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;

    res.render("post.ejs", {
        post: getData[postId],
        date: getDate[postId],
    })
}) 

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    getData.splice(postId, 1);
    getDate.splice(postId, 1);
    fs.writeFile("curhat.txt", getData.toString(), function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("This file was saved")
    });
    fs.writeFile("date.txt", getDate.toString(), function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("This file was saved")
    });
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Server is now starting on port ${port}.`);
});