const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ 
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
            cb(new Error('File is not supported'), false)
            return
        }
        cb(null, true)
    }
});

const {
    getAllSpas,
    getSpa,
    createSpa,
    updateSpa,
    deleteSpa,
    addService
} = require('../controllers/spaController');

router.get('/', getAllSpas);
router.get('/:id', getSpa);
router.post('/', upload.array('images', 5), createSpa);  
router.put('/:id', updateSpa);
router.delete('/:id', deleteSpa);
router.post('/:id/services', upload.single('image'), addService);   

module.exports = router;