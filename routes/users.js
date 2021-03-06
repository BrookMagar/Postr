const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../models");
const Post = require("../models").Post;
const { ensureAuthenticated } = require("../helpers/auth");



router.get("/board", (req, res) => {
  Post.findAll().then(posts => {
    console.log(posts);
    res.render("board", { posts: posts });
  });
})

router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  db.User.create({

    username: req.body.username,
    password: req.body.password

  }).then(user =>{
    res.render("account_created");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/users/success",
    failureRedirect: "/users/failure"
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.render("logout");
});

router.get("/success", (req, res, next) => {
  console.log(req.session);
  res.render("welcome");
});

router.get("/failure", (req, res) => {
  res.send("Failed to log in");
});

router.get("/create", ensureAuthenticated, (req, res) => {
  res.render("create_post");
});

module.exports = router;
