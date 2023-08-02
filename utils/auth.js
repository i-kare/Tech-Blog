const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');//If user is NOT logged in, redirect to the login page
  } else { // If user is authenticated i.e IS logged in, allow page to be viewed
    next();
  }
};

module.exports = withAuth;
