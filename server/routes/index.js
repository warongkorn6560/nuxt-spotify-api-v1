const express = require('express')
const router = express.Router()

router.get('/', (req, res) => { 
  res.json({
    success: true,
    name: 'test2',
  })
})

module.exports = router