const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const http = require('http');
const { 
  userJoin, 
  getCurrentUser,
  getRoomUsers,
  userLeave
} = require('./utils/users');

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

connectDB()

const app = express()


// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  stripNbsp,
  concat
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  exphbs({
    helpers:{
      formatDate,
      stripTags,
      truncate,
      stripNbsp,
      concat
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//Server
const server = http.createServer(app);
const io = socketio(server);



// Static folder
app.use(express.static(path.join(__dirname, 'public')))


//Bot
const bot = 'Bot';

//Discussion Room
io.on('connection',socket => {
    socket.on('joinRoom',({username,room})=>{
      console.log(username+" "+room);
        const user = userJoin(socket.id,username,room);
        socket.join(user.room);
        socket.emit('message',formatMessage(bot,'Welcome to the discussion room!'));
        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
    //Send Message
    socket.on('chatMessage',msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username,msg));  
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        
        //Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
});

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/addcourse', require('./routes/addcourse'))

const PORT = process.env.PORT || 3000

// app.listen(
//     PORT,
//     console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// )
// server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

server.listen(process.env.PORT || 3000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
});