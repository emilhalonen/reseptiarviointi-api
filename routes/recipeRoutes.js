const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/', recipeController.getRecipes);
router.get('/:id/reviews', recipeController.getRecipeReviews);
router.get('/:id/average-rating', recipeController.getRecipeAverageRating);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

module.exports = router;
