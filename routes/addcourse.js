const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const upload = require('express-fileupload');

const Course = require('../models/Add')

const app = express();
// app.post('/',(req,res)=>{
//   if(req.files){
//       console.log(req.files);
//       var file = req.files.file
//       var filename = file.name
//       console.log(filename)

//       file.mv('./uploads/'+filename,function(err){
//           if(err){
//               res.send(err)
//           }
//           else{
//               res.send("File Uploaded");
//           }
//       })
//   }
// })

// app.post("/", function(req, res) {
//   const itemName = req.body.newItem;
//   const listName = req.body.list;
//     const day = date.getDate();

//   const itemList=new Item({
//     name:itemName
//   });


//   if(listName === day){
//       itemList.save();
//     res.redirect("/");
//   } else {
//     List.findOne({name:listName},function(err,foundList){
//       //item is from listSchema
//       foundList.item.push(itemList);
//       foundList.save();
//       res.redirect("/"+listName)
//     })
//   }

// });

router.use(upload());

router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const coursen = req.body.courseName
    await Course.create(req.body)
    console.log(Course.courseName);
    console.log(Course.courseDescription);
    if(req.files){
      console.log(req.files);
      var pdf = req.files.pdfName
      var file = req.files.fileName
      var filename = file.name
      var pdfname = pdf.name
      console.log(pdfname)
      console.log(filename)
      file.mv('./uploads/'+filename,function(err){
          if(err){
              res.send(err)
          }
      })
      file.mv('./uploads/'+pdfname,function(err){
        if(err){
            res.send(err)
        }
    })
      Course.findOneAndUpdate({courseName : coursen},{$set : 
        {fileName:filename}},function(err,foundList){
        if(!err){
        }
      });
      Course.findOneAndUpdate({courseName : coursen},{$set : 
        {pdfName:pdfname}},function(err,foundList){
        if(!err){
          
        }
      });
  }
  res.redirect("/dashboard");
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
