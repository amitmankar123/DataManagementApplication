const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dbconnect = require('./config/dbconfig');  
const projectRoutes = require('./routes/projectRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/contactRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const {cloudinaryConnect} = require('./utiles/cloudinaryConfig');



const app = express();
app.use(cors({
    origin: '*',
    credentials: true
}));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/subscriber', subscriberRoutes);
dbconnect();
cloudinaryConnect();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("this the protect dashboard server for the Admin Panel");

}

);
