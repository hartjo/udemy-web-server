const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const dir = path.join(__dirname);
const dir_src = path.join(__dirname, '..');
const dir_public = path.join(__dirname, '../public');
const dir_template = path.join(__dirname, '../template/views');
const dir_partials = path.join(__dirname, '../template/partials');

const app = express();

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', dir_template);
hbs.registerPartials(dir_partials);

// Setup Static Directory to Serve
app.use(express.static(dir_public));


// Routes
app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather',
        name: 'Jan Rainier'
    });
    
});

app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About',
        name: 'Jan Rainier'
    });
    
});

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        name: 'Jan Rainier'
    });
    
});

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: 'Help Not Found',
        name: 'Jan Rainier'
    });
    
});


app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Address must be provide'
        });
    }

    geocode(req.query.address, (error, geoData) => {

        if(error) {
            return res.send({
                error: error
            });
        }
    
        forecast(geoData.lat, geoData.long, (forcastError, forecastData) => {
    
            if(error) {
                return res.send({
                    error: forcastError
                });
            }


            res.send({
                forecast: forecastData,
                location: geoData.loc,
            });
        })

    });

    
    
});

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: [req.query.search]
    });
    
});

app.get('*', function(req, res){
    res.status(404).render('404', {
        title: '404 Not Found',
        name: 'indexxxx'
    });
});


// Listen to port 
app.listen(3000, () => {
    console.log('Server is Up on port 3000');
});