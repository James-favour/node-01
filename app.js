
const path = require('path');
const express = require('express');
const { logger } = require('./middleware/logEvents');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT ||4500;
const errorHandler = require('./middleware/errorHandler');
app.use(logger);

// cross origin resource sharing

const whiteList = ['https://www.yoursite.com', 'https://127.0.0.1.5500', 'http://localhost:4500'];
const corsOptions = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

// form data

app.use(express.urlencoded({ extended:false }));

// json file

app.use(express.json());

// static files... 

app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'index.html'));
});

// for routes that dont exist
app.all('*', (req,res)=>{
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({error:'404 Page Not Found!!!'});
    } else {
        res.type('txt').send('404 Page Not Found!!!')
    }
});
 
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});
