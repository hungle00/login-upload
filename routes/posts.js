var express = require('express');
var router = express.Router();

const fileWorker = require('../controllers/upload');

router.get('/', function(req, res, next) {
    res.render('posts-index', { posts: 123 });
});

router.post('/upload', fileWorker.upload.single("uploadfile"), fileWorker.uploadFile);
	
router.get('/getall', fileWorker.listAllFiles);
	
router.get('/:filename', fileWorker.downloadFile);

module.exports = router;
