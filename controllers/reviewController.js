const reviewModel = require('../models/reviewModel');

const isPositiveInteger = (value) => {
    return Number.isInteger(value) && value > 0;
};

const isValidStars = (stars) => {
    return Number.isInteger(stars) && stars >= 1 && stars <= 5;
};

const getReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.getAllReviews();

        res.status(200).json({
            reviews
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve reviews'
        });
    }
};

const createReview = async (req, res) => {
    const {
        userId,
        recipeId,
        stars,
        comment,
        reviewDate
    } = req.body;

    if (!isPositiveInteger(userId) || !isPositiveInteger(recipeId)) {
        return res.status(400).json({
            message: 'userId and recipeId must be positive integers'
        });
    }

    if (!isValidStars(stars)) {
        return res.status(400).json({
            message: 'stars must be an integer from 1 to 5'
        });
    }

    if (!comment || !reviewDate) {
        return res.status(400).json({
            message: 'comment and reviewDate are required'
        });
    }

    try {
        const review = await reviewModel.createReview({
            userId,
            recipeId,
            stars,
            comment,
            reviewDate
        });

        res.status(201).json({
            review
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to create review'
        });
    }
};

const updateReview = async (req, res) => {
    const reviewId = Number(req.params.id);
    const {
        stars,
        comment,
        reviewDate
    } = req.body;

    if (!isPositiveInteger(reviewId)) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    if (!isValidStars(stars)) {
        return res.status(400).json({
            message: 'stars must be an integer from 1 to 5'
        });
    }

    if (!comment || !reviewDate) {
        return res.status(400).json({
            message: 'comment and reviewDate are required'
        });
    }

    try {
        const review = await reviewModel.updateReview(reviewId, {
            stars,
            comment,
            reviewDate
        });

        if (!review) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json({
            review
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to update review'
        });
    }
};

const deleteReview = async (req, res) => {
    const reviewId = Number(req.params.id);

    if (!isPositiveInteger(reviewId)) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    try {
        const wasDeleted = await reviewModel.deleteReview(reviewId);

        if (!wasDeleted) {
            return res.status(404).json({
                message: 'Review not found'
            });
        }

        res.status(200).json({
            message: 'Review deleted successfully',
            reviewId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to delete review'
        });
    }
};

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview
};
