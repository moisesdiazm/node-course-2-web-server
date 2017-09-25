const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// middleware to log calls
app.use((req, res, next)=> {
    var currentTime = new Date().toDateString();
    var logText = `${currentTime}: ${req.method} ${req.url}`;
    console.log(logText);
    fs.appendFile('server.log', logText, (err)=>{
        if(err){
            console.log("Unable to write the file.");
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
    res.render('home.hbs',{
       titlePage: 'Home Page',
       welcomeMessage: 'Welcome to the home page',
       currentYear: new Date().getFullYear() 
    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        titlePage: 'About page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: true
    });
});


app.listen(8000, ()=> {
    console.log('Server is now running on port 8000');
});