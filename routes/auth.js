const express = require('express');
const { body, validationResult } = require('express-validator'); 
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model defined

// Registration route
router.post('/register', [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;

    try {
        // Check if the username already exists
        const existingUser  = await User.findOne({ username });
        if (existingUser ) {
            return res.status(400).json({ errors: [{ msg: 'Username already exists. Please choose another.' }] });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({
            username,
            password: hashedPassword,
            role // Store the role selected during registration
        });

        await newUser .save(); // Save the user to the database

        res.status(201).json({ message: 'Registration successful! You can now log in.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ errors: [{ msg: 'Internal server error. Please try again later.' }] });
    }
});

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ username, password: hashedPassword, role });
    await newUser .save();
    res.redirect('/login');
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', [
    body('username').notEmpty().withMessage('Username is required.'),
    body('password').notEmpty().withMessage('Password is required.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password.' }] });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid username or password.' }] });
        }

 
        // For now, we will just return the user role
        res.status(200).json({ message: 'Login successful!', role: user.role });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ errors: [{ msg: 'Internal server error. Please try again later.' }] });
    }
});;

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;