const express = require('express');
const authorCtrl=require('../controllers/authorController');
const blogCtrl=require('../controllers/blogController');
const mid = require('../middlewares/middleware')
const authmid=require('../middlewares/authmid.js')
const commentController = require('../controllers/commentController')

const router = express.Router();



router.post('/authors',mid.reqBodyCheck,mid.validEmail,mid.uniqueEmail,authorCtrl.createAuthor);
router.post("/login", mid.reqBodyCheck,mid.validEmail,authorCtrl.loginAuthor);

// blogs comment
router.post('/blogs',mid.reqBodyCheck, mid.validAuthor,authmid.authenticationMid, blogCtrl.createBlog);
router.get('/blogs' ,authmid.authenticationMid,blogCtrl.getBlogData);
router.put("/blogs/:blogId",mid.reqBodyCheck, mid.validBlogId,authmid.authenticationMid,authmid.authorizationMid, blogCtrl.updatedBlog);
router.delete('/blogs/:blogId',mid.validBlogId,authmid.authenticationMid,authmid.authorizationMid,blogCtrl.deleteBlogByPathParam);
router.delete("/blogs", authmid.authenticationMid, blogCtrl.deleteBlogByQueryParam);


// comments API
router.post('/comment/:blogId/',mid.reqBodyCheck,mid.validBlogId,mid.validAuthor,commentController.createComment)
router.post('/updateComment/:commentId/:authorId',commentController.updateComment)
router.post('/delete/:commentId/:authorId',commentController.deleteComment)
 
 
module.exports = router; 