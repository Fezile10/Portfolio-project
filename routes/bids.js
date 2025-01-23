const express = require('express');
const Bid = require('../models/Bid');
const router = express.Router();

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect('/login');
};

// Submit Bid
router.get('/submit', isAuthenticated, (req, res) => {
    res.render('bid_submission');
});

router.post('/submit', isAuthenticated, async (req, res) => {
    const { projectName, bidAmount } = req.body;
    const newBid = new Bid({ userId: req.session.userId, projectName, bidAmount });
    await newBid.save();
    res.redirect('/contractor_dashboard');
});

// View Bids (Admin)
router.get('/view', isAuthenticated, async (req, res) => {
    if (req.session.role !== 'admin') {
        return res.redirect('/login');
    }
    const bids = await Bid.find().populate('userId', 'username');
    res.render('view_bids', { bids });
});

module.exports = router;