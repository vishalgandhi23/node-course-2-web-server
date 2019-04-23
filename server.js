const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log.');
        }
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Vishal',
    //     likes: [
    //         'Biking',
    //         'Exercise'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        // currentYear: new Date().getFullYear(),
        welcomeMessage: 'Welcome Vishal' 
    });
});

app.get('/about',(req, res) => {
    //res.send('About Page');
    res.render('about.hbs',{
        pageTitle: 'About Page',
        // currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        statusCode: '404 Not OK',
        errorMessage: 'Unable to fulfill the request.'
    });
});

app.get('/projects',(req,res) => {
    res.render('projects.hbs',{
        pageTitle: 'Projects Page',
        welcomeMessage: 'Wellcome to the new project.'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});