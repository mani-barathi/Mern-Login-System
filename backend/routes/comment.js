const { Router } = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = Router()

router.post("/addcomment", async (req, res) => {
  if (!req.session.isAuth && req.session._id != req.body.authorId)
      return res.status(401).json({ message: "Unauthorized Access", report: false })

  const comment = req.body
  try{
    comment.timestamp = Date.now()
    const newComment = await new Comment(comment)
    newComment.save()

    const post = await Post.findById(newComment.postId)
    post.noOfComments += 1
    await post.save()
    return res.status(201).json({ report: true, comment: newComment });
  }
  catch(err){
    console.log("error while saving comment :",err)   
    return res.status(500).json({ report: false, message:"something went wrong"});
  }
});


module.exports =   router 
