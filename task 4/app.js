const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


let vehicles = [];
let idCounter = 1;

app.get('/vehicles', (req, res) => {
    res.render('index', { vehicles });
});


app.get('/vehicles/new', (req, res) => {
    res.render('new');
});


app.post('/vehicles', (req, res) => {
    const { vehicleName, price, image, desc, brand } = req.body;
    vehicles.push({ id: idCounter++, vehicleName, price, image, desc, brand });
    res.redirect('/vehicles');
});

app.get('/vehicles/:id/edit', (req, res) => {
    const vehicle = vehicles.find(v => v.id == req.params.id);
    if (!vehicle) return res.status(404).send('Vehicle not found');
    res.render('edit', { vehicle });
});

// Update vehicle
app.post('/vehicles/:id', (req, res) => {
    const vehicle = vehicles.find(v => v.id == req.params.id);
    if (!vehicle) return res.status(404).send('Vehicle not found');
    const { vehicleName, price, image, desc, brand } = req.body;
    vehicle.vehicleName = vehicleName;
    vehicle.price = price;
    vehicle.image = image;
    vehicle.desc = desc;
    vehicle.brand = brand;
    res.redirect('/vehicles');
});


app.post('/vehicles/:id/delete', (req, res) => {
    vehicles = vehicles.filter(v => v.id != req.params.id);
    res.redirect('/vehicles');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/vehicles`);
});
