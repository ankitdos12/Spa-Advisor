const Spa = require('../models/spas');
const Service = require('../models/services');
const { uploadMultipleImages, uploadImage } = require('../utils/cloudinary');

// Get all spas with optional filtering
const getAllSpas = async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);

        let query = Spa.find(queryObj).populate('services');

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);

        const spas = await query;

        res.status(200).json({
            success: true,
            count: spas.length,
            data: spas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Get single spa
const getSpa = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Fetching spa with ID: ` + id);

        const spa = await Spa.findById(id).populate('services');
        if (!spa) {
            return res.status(404).json({
                success: false,
                error: 'Spa not found'
            });
        }

        res.status(200).json({
            success: true,
            data: spa
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Create new spa
const createSpa = async (req, res) => {
    try {
        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            // Upload multiple images if present
            imageUrls = await uploadMultipleImages(req.files);
        }

        const {
            name,
            country,
            state,
            district,
            pincode,
            locality,
            address,
            type,
            coordinates,
            startingPrice,
            discount,
            openingHours,
            contacts,
            rating,
            reviewCount
        } = req.body;

        // Basic required field validation
        if (!name || !locality || !startingPrice || !contacts?.number || !contacts?.email || !contacts?.website) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, locality, startingPrice, and contact details are required.'
            });
        }

        // Construct nested location object
        const location = {
            country,
            state,
            district,
            locality,
            pincode,
            address
        };

        // Create the spa first
        const spa = await Spa.create({
            name,
            location,
            type,
            coordinates,
            startingPrice,
            images: imageUrls,
            discount,
            openingHours,
            contacts,
            rating,
            reviewCount
        });
 
        return res.status(201).json({
            success: true,
            message: 'Spa created successfully',
            data: spa
        });

    } catch (error) {
        console.error('Error creating spa:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error: ' + error.message
        });
    }
};

// Update spa
const updateSpa = async (req, res) => {
    try {
        const spa = await Spa.findByIdAndUpdate(
            req.params.id,
            req.body, {
            new: true,
            runValidators: true
        }
        ).populate('location');

        if (!spa) {
            return res.status(404).json({
                success: false,
                error: 'Spa not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Spa updated successfully',
            spa
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Delete spa
const deleteSpa = async (req, res) => {
    try {
        const spa = await Spa.findByIdAndDelete(req.params.id);

        if (!spa) {
            return res.status(404).json({
                success: false,
                error: 'Spa not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};

// Add service to spa
const addService = async (req, res) => {
    try {
        const spa = await Spa.findById(req.params.id);
        if (!spa) return res.status(404).json({ message: 'Spa not found' });

        let imageUrl = '';
        if (req.file) {
            imageUrl = await uploadImage(req.file);
        }

        const service = await Service.create({ 
            ...req.body, 
            spa: spa._id,
            image: imageUrl
        });
        
        spa.services.push(service._id);
        await spa.save();

        // Fetch the updated spa with populated services
        const updatedSpa = await Spa.findById(req.params.id).populate('services');
        res.status(201).json({
            message: 'Service added successfully',
            spa: updatedSpa
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllSpas,
    getSpa,
    createSpa,
    updateSpa,
    deleteSpa,
    addService
};