//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Hey there! Welcome to PENNED. It is a daily journal where you can write your thoughts, emotions, next oscar winning script and what not!! Well you may ask What is a journal? A journal, from the Old French journal (meaning daily), may refer to: Bullet journal, a method of personal organizations. Diary, a record of what happened over the course of a day or other period. Daybook, also known as a general journal, a daily record of financial transactions. Do let us know if you face any problem or if you have got any suggestions.Hope you will the user experience. Also if you win an Oscar you have to tell us!!!";
const aboutContent = "HEYAA!! I am Vaibhav, cruently studying Computer Science in KIIT University. So most of the time i am a partying and netflix kinda typical teenager but recently i developed an interest in Web development, and demnn it is so good! such a facinating workspace it is. I really wish to grow in it and create cool websites! ";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
