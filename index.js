//npm install express --save
// npm install body-parser --save
// npm install cors --save
const express = require("express");
const boydParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(cors());

app.use(boydParser.urlencoded({ extended: false }));
app.use(boydParser.json());

var DB = {
    games: [
        {
            id: 23,
            title: "ARK",
            year: 2000,
            price: 100
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2019,
            price: 120
        },
        {
            id: 2,
            title: "God of War",
            year: 2001,
            price: 110
        }
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games)
});
app.get("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);
        if (game == undefined) {
            res.sendStatus(404);
        } else {
            res.statusCode = 200;
            res.json(game);
        }
    }
});


function GetRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/game", (req, res) => {

    var { title, price, year } = req.body;

    DB.games.push({
        id: GetRandomIntInclusive(1, 100),
        title,
        year,
        price
    })
    res.sendStatus(200);
});

app.delete("/game/:id", (req, res) => {

    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var gameIndex = DB.games.findIndex(g => g.id == id);

        if (gameIndex == -1) {
            res.sendStatus(404);
        } else {
            DB.games.splice(gameIndex, 1);
            res.sendStatus(200);
        }
    }
});

app.put("/game/:id", (req, res) => {


    if (isNaN(req.params.id)) {
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);
        if (game == undefined) {
            res.sendStatus(404);
        } else {

            var { title, price, year } = req.body;

            if (title != undefined) {
                game.title = title;
            }
            if (price != undefined) {
                game.price = price;
            }
            if (year != undefined) {
                game.year = year;
            }

            res.sendStatus(200);
        }
    }
});

app.listen(3001, () => {
    console.log("API iniciada");
})