const express = require("express");
const mongoose = require("mongoose");
const shortenedUrl = require("./models/shortenedUrl");

const ShortenedUrl = require("./models/shortenedUrl");
const app = express();

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser:true, useUnifiedTopology: true
});


app.set('view engine' , 'ejs');
app.use(express.urlencoded({ extended: false}));

app.get('/' , async (req,res) => {
    const shortUrls = await ShortenedUrl.find()
    res.render('home', {shortUrls: shortUrls});
    
});

app.post('/shortUrls', async (req,res)=>{
    await ShortenedUrl.create({original: req.body.originalUrl })
    res.redirect('/')

})

app.get('/:shortenedUrl', async (req,res) => {
   const shortenedUrl =  await ShortenedUrl.findOne({ short: req.params.shortenedUrl});

   if(shortenedUrl === null) res.sendStatus(404);

   shortenedUrl.save();
   res.redirect(shortenedUrl.original);
})
app.listen(process.env.PORT || 3000);