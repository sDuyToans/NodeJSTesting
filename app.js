const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hatsRouter = require('./routes/hats');
const jacketsRouter = require('./routes/jackets');
const mensRouter = require('./routes/mens');
const womensRouter = require('./routes/womens');
const sneakersRouter = require('./routes/sneakers');
const loginRoute = require('./routes/login');
const signUpRoute = require('./routes/singup');
const profileRoute = require('./routes/profile');
const mapRoute = require('./routes/map');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: 'http://127.0.0.1:9000' }))

app.use(
    session({
      secret: "5NPMEx6DiVBUVQjXSSNGRw==",
      resave: false,
      saveUninitialized: true,
    })
)

// const setUserInSession = (req, res, next) => {
//     req.session.user = req.locals.user || null;
//     next();
// }

// Middleware to set user in locals from session
const setUserInLocals = (req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
}

// app.use(setUserInSession);
app.use(setUserInLocals);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hats', hatsRouter);
app.use('/jackets', jacketsRouter);
app.use('/sneakers', sneakersRouter);
app.use('/womens', womensRouter);
app.use('/mens', mensRouter);
app.use('/auth', loginRoute);
app.use('/auth', signUpRoute);
app.use('/profile', profileRoute);
app.use('/map', mapRoute);
app.use('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err){
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
})

const shoppingCart = [];
const sql = require('mssql');
const { executeQuery } = require('./utils/Operation');
app.post('/addToCartEndpoint', async (req, res) => {
    const { productId, category } = req.body;

    try {
        switch (category.toLowerCase()) {
            case "hats":
            case "jackets":
            case "sneakers":
            case "men":
            case "womens":
                const query = `select * from ${category.toUpperCase()} where id = ${productId}`;
                const result = await executeQuery(query);
                shoppingCart.push(result.recordset[0]);
                break;
            default:
                res.status(200).json({ message: 'Product added failed' });
                return;
        }
        // Store the shopping cart in a cookie
        res.cookie('shoppingCart', JSON.stringify(shoppingCart));

        // Update the item count in a cookie
        res.cookie('itemCount', shoppingCart.length);
        console.log(shoppingCart);
        res.status(200).json({ message: 'Product added to cart successfully', shoppingCart, itemCount: shoppingCart.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
