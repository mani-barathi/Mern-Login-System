const { Router } = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const router = Router()

router.post("/addcomment", async (req, res) => {
  const comment = req.body
  try{
    comment.timestamp = Date.now()
    const newComment = await new Comment(comment)
    newComment.save()

    const post = await Post.findById(newComment.postId)
    post.noOfComments += 1
    await post.save()
    return res.json({ report: true, comment: { text: "this is a comment" } });
  }
  catch(err){
    console.log("error while saving comment :",err)   
    return res.json({ report: false, message:"something went wrong"});
  }
});


module.exports =   router 
