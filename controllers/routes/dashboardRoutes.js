const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => { //this is the initial dashboard page that is looking for authentication. 
    try {

        
    }
