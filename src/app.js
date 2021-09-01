const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// Define paths for Express config
const publicDirpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars enigine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kanchan Sikder'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather About:',
        name: 'Kanica Sikder'
    })
}
)

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helptext: 'This is a help text page.',
        name: 'Moumita Sikder'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: " You must provide an address."
        })
    }
    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "ERROR 404",
        name: "Olivia",
        message: "Help article not."
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "ERROR 404",
        name: "Rodrig",
        message: "Page not Found."
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})