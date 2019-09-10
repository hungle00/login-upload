const multer = require('multer');
const uploadFolder = __basedir + '/upload/';
const fs = require('fs');

// ===  Upload with multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __basedir + '/upload/')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	}
});

exports.upload = multer({ storage: storage });

exports.uploadFile = (req, res) => {
	res.send('File uploaded successfully! -> filename = ' + req.file.filename);
}

exports.listAllFiles = (req, res) => {
	fs.readdir(uploadFolder, (err, files) => {
		res.send(files);
	})
}

exports.downloadFile = (req, res) => {
	var filename = req.params.filename;
	res.download(uploadFolder + filename);
}