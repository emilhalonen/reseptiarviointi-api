const recipeModel = require('../models/recipeModel');

const getRecipes = async (req, res) => {
    try {
        const recipes = await recipeModel.getAllRecipes();

        res.status(200).json({
            recipes
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve recipes'
        });
    }
};

const createRecipe = async (req, res) => {
    const {
        name,
        category,
        preparationTimeMinutes,
        ingredients,
        instructions
    } = req.body;

    if (!name || !category || !preparationTimeMinutes || !ingredients || !instructions) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    if (typeof preparationTimeMinutes !== 'number' || preparationTimeMinutes <= 0) {
        return res.status(400).json({
            message: 'preparationTimeMinutes must be a positive number'
        });
    }

    try {
        const recipe = await recipeModel.createRecipe({
            name,
            category,
            preparationTimeMinutes,
            ingredients,
            instructions
        });

        res.status(201).json({
            recipe
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to create recipe'
        });
    }
};

const updateRecipe = async (req, res) => {
    const recipeId = Number(req.params.id);
    const {
        name,
        category,
        preparationTimeMinutes,
        ingredients,
        instructions
    } = req.body;

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    if (!name || !category || !preparationTimeMinutes || !ingredients || !instructions) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    if (typeof preparationTimeMinutes !== 'number' || preparationTimeMinutes <= 0) {
        return res.status(400).json({
            message: 'preparationTimeMinutes must be a positive number'
        });
    }

    try {
        const recipe = await recipeModel.updateRecipe(recipeId, {
            name,
            category,
            preparationTimeMinutes,
            ingredients,
            instructions
        });

        if (!recipe) {
            return res.status(404).json({
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            recipe
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to update recipe'
        });
    }
};

const deleteRecipe = async (req, res) => {
    const recipeId = Number(req.params.id);

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    try {
        const wasDeleted = await recipeModel.deleteRecipe(recipeId);

        if (!wasDeleted) {
            return res.status(404).json({
                message: 'Recipe not found'
            });
        }

        res.status(200).json({
            message: 'Recipe deleted successfully',
            recipeId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to delete recipe'
        });
    }
};

const getRecipeReviews = async (req, res) => {
    const recipeId = Number(req.params.id);

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    try {
        const reviews = await recipeModel.getRecipeReviews(recipeId);

        res.status(200).json({
            reviews
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve recipe reviews'
        });
    }
};

const getRecipeAverageRating = async (req, res) => {
    const recipeId = Number(req.params.id);

    if (!Number.isInteger(recipeId) || recipeId <= 0) {
        return res.status(400).json({
            message: 'id must be a positive integer'
        });
    }

    try {
        const averageRatings = await recipeModel.getRecipeAverageRating(recipeId);

        res.status(200).json({
            averageRating: averageRatings[0] || null
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: 'Failed to retrieve recipe average rating'
        });
    }
};

module.exports = {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipeReviews,
    getRecipeAverageRating
};
