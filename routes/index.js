const express = require('express')
const router = express.Router()
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const upload = require('express-fileupload')
const http = require('http');
const fs = require("fs");


const app = express();

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

router.get('/coursecards', ensureGuest, async(req, res) => {
  try {
    const courses = await Course.find().sort({createdAt:'desc'}).lean()
      res.render('course-cards', {
        layout:'',
        courses
      })
  }
  catch(err){
      console.log(err)
    }
})

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

router.get('/discussion/:id', ensureAuth, async (req, res) => {
  try {
    // let course = await Course.findById(req.params.id).populate('user').lean()
    const requestedID=req.params.id;
    console.log(requestedID)
    Course.findOne({_id:requestedID}, async function(err,post){
      const courses = await Course.find({ user: req.user.id }).lean()
          if(!err){
            res.render('discussion', {
                  layout:'',
                  courseName : post.courseName,
                  courseTitle : post.courseTitle,
                  courseDescription : post.courseDescription,
                  coursePrerequisite : post.coursePrerequisite,
                  courseWeek1 : post.courseWeek1,
                  firstname: req.user.firstName,
                  lastname:req.user.lastname,
                  courses,
                  requestedID
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
    Course.findOne({_id:requestedID},async function(err,post){
          if(!err){
            const courses = await Course.find({ user: req.user.id }).lean()
            res.render("course-stream", {
                  layout:'',
                  courseName : post.courseName,
                  courseTitle : post.courseTitle,
                  courseDescription : post.courseDescription,
                  coursePrerequisite : post.coursePrerequisite,
                  courseWeek1 : post.courseWeek1,
                  firstname: req.user.firstName,
                  lastname:req.user.lastname,
                  fileName : post.fileName,
                  pdfName : post.pdfName,
                  courses,
                  requestedID
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

router.get('/usercoursestream/:id', ensureAuth, async (req, res) => {
  try {
    // let course = await Course.findById(req.params.id).populate('user').lean()
    const requestedID=req.params.id;
    console.log(requestedID)
    Course.findOne({_id:requestedID},async function(err,post){
          if(!err){
            const courses = await Course.find({ user: req.user.id }).lean()
            res.render("guest-course-stream", {
                  layout:'',
                  courseName : post.courseName,
                  courseTitle : post.courseTitle,
                  courseDescription : post.courseDescription,
                  coursePrerequisite : post.coursePrerequisite,
                  courseWeek1 : post.courseWeek1,
                  firstname: req.user.firstName,
                  lastname:req.user.lastname,
                  courses,
                  requestedID
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
        lastname : req.user.lastname,
        courses
      })
  }
  catch(err){
      console.log(err)
    }
})

router.get('/authcoursecards', ensureAuth, async(req, res) => {
  try {
    const courses = await Course.find().sort({createdAt:'desc'}).lean()
      res.render('auth-course-cards', {
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

router.get('/resources/:fileName',ensureAuth,async(req,res)=>{
  const fileshow = req.params.fileName
  const server1 = http.createServer(function(req, res) {
    let img ="C:/Users/anujp/OneDrive/Documents/Coursent - Copy/uploads/" + fileshow;
    console.log(img)
    fs.access(img, fs.constants.F_OK, err => {
      //check that we can access  the file
      console.log(`${img} ${err ? "does not exist" : "exists"}`);
    });
  
    fs.readFile(img, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>No such image</h1>");
      } else {
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": "video/mp4"});
        res.end(content);
      }
    });
  });
  server1.listen(1234 , function() {
    console.log("Server running on port 1234");
  });
  res.redirect('http://localhost:1234')
})


router.get('/documents/:pdfName',ensureAuth,async(req,res)=>{
  const fileshow = req.params.pdfName
  const server2 = http.createServer(function(req, res) {
    let img ="C:/Users/anujp/OneDrive/Documents/Coursent - Copy/uploads/" + fileshow;
  
    fs.access(img, fs.constants.F_OK, err => {
      //check that we can access  the file
      console.log(`${img} ${err ? "does not exist" : "exists"}`);
    });
  
    fs.readFile(img, function(err, content) {
      if (err) {
        res.writeHead(404, { "Content-type": "text/html" });
        res.end("<h1>No such image</h1>");
      } else {
        
        // specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": "application/pdf"});
        res.end(content);
      }
    });
  });
  
  server2.listen(1235, function() {
    console.log("Server running on port 1235");
  });
  res.redirect('http://localhost:1235')
})

router.get('/chat/:id', ensureAuth, async (req, res) => {
  try {
    // let course = await Course.findById(req.params.id).populate('user').lean()
    const requestedID=req.params.id;
    console.log(requestedID)
    Course.findOne({_id:requestedID}, async function(err,post){
      const courses = await Course.find({ user: req.user.id }).lean()
          if(!err){
            res.render('chat', {
                  layout:'',
                  courseName : post.courseName,
                  courseTitle : post.courseTitle,
                  courseDescription : post.courseDescription,
                  coursePrerequisite : post.coursePrerequisite,
                  courseWeek1 : post.courseWeek1,
                  firstname: req.user.firstName,
                  lastname:req.user.lastname,
                  courses,
                  requestedID
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


// router.get('/chat', ensureAuth, async(req, res) => {
//   try {
//       res.render('chat', {
//         layout:'',
//         firstname: req.user.firstName,
//         lastname:req.user.lastname,
//       })
//   }
//   catch(err){
//       console.log(err)
//     }
// })



module.exports = router


