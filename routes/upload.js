const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const fileWorker = require('../controllers/upload');

router.route('/')
    .get(auth.isLoggedIn, (req, res, next) => {
    	res.render('upload', { posts: 123 });
    });

router.post('/upload', fileWorker.upload.single("uploadfile"), fileWorker.uploadFile);
	
router.get('/getall', fileWorker.listAllFiles);
	
router.get('/:filename', fileWorker.downloadFile);

module.exports = router;