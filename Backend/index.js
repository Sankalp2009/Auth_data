// Only Handling Express Work
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json()); // JSON Middleware // URL Encoding Middleware
const UserRoutes = require('./Routes/UserRoute')
const JobRoutes = require('./Routes/JobRoute')
app.use(cors({
   origin: '*',
})); // Cross Origin Resource Sharing Middleware 
app.use('/api/auth',UserRoutes);
app.use('/api/v1/Jobs',JobRoutes);
module.exports = app;