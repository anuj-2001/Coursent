const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Course = require('../models/Add')

router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Course.create(req.body)
    res.redirect('/dashboard')
    console.log(Course.courseName);
    console.log(Course.courseDescription);
  } catch (err) {
    console.error(err)
    res.render('error/500')
  }
  console.log(Course.courseName);
})


// app.get("/posts/:postID", function(req, res){

//   const requestedID=req.params.postID;

//   Post.findOne({_id:requestedID},function(err,post){
//     if(!err){
//       res.render("post", {
//             title: post.title,
//             content: post.content
//           });
//     }
//   })
// });

router.get('/coursestream/:id', ensureAuth, async (req, res) => {
  try {
    // let course = await Course.findById(req.params.id).populate('user').lean()
    const requestedID=req.params.id;
    console.log(requestedID)
    Course.findOne({_id:requestedID},function(err,post){
          if(!err){
            res.render("coursestream", {
                  title: post.title,
                  content: post.content
                });
          }
        })
    // if (course.user._id != req.user.id) {
    //   console.error(err)
    // } else {
    //   res.render('/coursestream', {
    //     course,
    //   })
    // }
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
