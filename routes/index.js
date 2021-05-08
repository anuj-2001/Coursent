const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Course = require('../models/Add')
// @desc    Login/Landing page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
  res.render('home', {
    layout: '',
  })
});

router.get('/login', ensureGuest, (req, res) => {
  res.render('login', {
    layout: 'login',
  })
})

router.get('/coursecards', function(req, res) {
  res.render('course-cards', {
      layout: '',
   });
});

// router.get('/coursestream', function(req, res) {
//   res.render('course-stream', {
//       layout: '',
//    });
// });

router.get('/addcourse', function(req, res) {
  res.render('add-course', {
      layout: '',
   });
});

router.get('/discussion', function(req, res) {
  res.render('discussion', {
      layout: '',
   });
});

router.get('/chat', function(req, res) {
  res.render('chat', {
      layout: '',
   });
});


router.get('/authhome', ensureAuth, async(req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).lean()
      res.render('auth-home', {
        layout:'',
        name: req.user.firstName,
        courses
      })
  }
  catch(err){
      console.log(err)
    }
})

router.get('/coursestream/:id', ensureAuth, async (req, res) => {
  try {
    // let course = await Course.findById(req.params.id).populate('user').lean()
    const requestedID=req.params.id;
    console.log(requestedID)
    Course.findOne({_id:requestedID},function(err,post){
          if(!err){
            res.render("course-stream", {
                  layout:'',
                  courseName : post.courseName,
                  courseTitle : post.courseTitle,
                  courseDescription : post.courseDescription,
                  coursePrerequisite : post.coursePrerequisite,
                  courseWeek1 : post.courseWeek1
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
// @desc    Dashboard
// @route   GET /dashboard
  
router.get('/dashboard', ensureAuth, async(req, res) => {
  try {
    const courses = await Course.find({ user: req.user.id }).lean()
      res.render('dashboard', {
        layout:'',
        firstname: req.user.firstName,
        lastname:req.user.lastname,
        courses
      })
  }
  catch(err){
      console.log(err)
    }
})


module.exports = router