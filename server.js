const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const bidRoutes = require('./routes/bids');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'fcff4254082215a6e5382db0653cf3ba039e811b5ebb605ad727a16e226a23c8',
    resave: false,
    saveUninitialized: true
}));

// Connect to MongoDB
connectDB();

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! Please try again later.');
});

// Set view engine
app.set('view engine', 'ejs');

// Route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','views', 'index.html')); // Serve the landing page
});

// Route for serving contractor dashboard
app.get('/contractor_dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contractor_dashboard.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        }
    });
});

// Route for serving admin dashboard
app.get('/admin_dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin_dashboard.html'), (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        }
    });
});
// Routes
app.use('/auth', authRoutes);
app.use('/bids', bidRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});