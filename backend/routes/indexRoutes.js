const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'sign-in.html'));
});

// Add more routes as needed

module.exports = router;
