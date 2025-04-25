const Review = require('../models/review');
const mongoose = require('mongoose');

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching reviews',
            error: error.message
        });
    }
};

// Get reviews by spa ID
const getReviewsBySpaId = async (req, res) => {
    try {
        const reviews = await Review.find({
            spaId: req.params.spaId
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching spa reviews',
            error: error.message
        });
    }
};

// Create new review
const createReview = async (req, res) => {
    try {
        const newReview = new Review({
            spaId: req.body.spaId,
            userId: req.body.userId,
            userName: req.body.userName,
            rating: req.body.rating,
            text: req.body.text
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({
            message: 'Error creating review',
            error: error.message
        });
    }
};

// Update review
const updateReview = async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id, {
                rating: req.body.rating,
                text: req.body.text
            }, {
                new: true
            }
        );

        if (!updatedReview) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(400).json({
            message: 'Error updating review',
            error: error.message
        });
    }
};

// Delete review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json({
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting review',
            error: error.message
        });
    }
};

// Get average rating for a spa
const getSpaAverageRating = async (req, res) => {
    try {
        const result = await Review.aggregate([{
                $match: {
                    spaId: new mongoose.Types.ObjectId(req.params.spaId)
                }
            },
            {
                $group: {
                    _id: '$spaId',
                    averageRating: {
                        $avg: '$rating'
                    },
                    totalReviews: {
                        $sum: 1
                    }
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(200).json({
                averageRating: 0,
                totalReviews: 0
            });
        }

        res.status(200).json({
            averageRating: Math.round(result[0].averageRating * 10) / 10,
            totalReviews: result[0].totalReviews
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error calculating average rating',
            error: error.message
        });
    }
};

module.exports = {
    getAllReviews,
    getReviewsBySpaId,
    createReview,
    updateReview,
    deleteReview,
    getSpaAverageRating
}