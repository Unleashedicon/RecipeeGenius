import React, { useEffect, useState } from 'react';
import { Modal, Backdrop, Box, Fade, Typography } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto', // Increased width
  maxHeight: '90%', // Increased max height
  bgcolor: '#e0f7e0', // Light green background color
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
};
type RecipeModalProps = {
  open: boolean;
  handleClose: () => void;
  recipeId: any;
};

export default function RecipeModal({ open, handleClose, recipeId }: RecipeModalProps) {
  const [recipe, setRecipe] = useState<any>(null);
  const [ingredients, setIngredients] = useState<any[]>([]);

  const fetchRecipeDetails = async (recipeId: number) => {
    try {
      const res = await axios.get(`/api/recipe/${recipeId}/information`);
      const data = res.data;
      return {
        id: data.id,
        title: data.title,
        image: data.image,
        readyInMinutes: data.readyInMinutes,
        servings: data.servings,
        sourceUrl: data.sourceUrl,
        instructions: data.instructions,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const fetchRecipeIngredients = async (recipeId: number) => {
    try {
      const res = await axios.get(`/api/recipe/${recipeId}/ingredients`);
      const data = res.data;
      return data.ingredients.map((ingredient: any) => ({
        name: ingredient.name,
        amountMetric: `${ingredient.amount.metric.value} ${ingredient.amount.metric.unit}`,
        amountUS: `${ingredient.amount.us.value} ${ingredient.amount.us.unit}`,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  useEffect(() => {
    if (recipeId) {
      fetchRecipeDetails(recipeId).then(setRecipe);
      fetchRecipeIngredients(recipeId).then(setIngredients);
    }
  }, [recipeId]);

  if (!recipe) return null;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
            {recipe.title}
          </Typography>
          <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }} />
          <Typography sx={{ mb: 2 }}>
            <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
          </Typography>
          <Typography sx={{ mb: 2, padding: '10px', backgroundColor: '#f0fff0', borderRadius: '4px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Ingredients</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              {ingredients.map((ingredient: any, index: number) => (
                <li key={index} style={{ marginBottom: '8px', fontSize: '15px' }}>
                  <strong>{ingredient.name}</strong>: {ingredient.amountMetric} / {ingredient.amountUS}
                </li>
              ))}
            </ul>
          </Typography>
          <Typography sx={{ mb: 2, fontSize: '16px', lineHeight: '1.5', padding: '10px', backgroundColor: '#f0fff0', borderRadius: '4px' }}>
            <h3 style={{ fontWeight: 'bold' }}>Instructions</h3>
            <p>{recipe.instructions}</p>
          </Typography>
          {recipe.sourceUrl && (
            <Typography sx={{ mt: 2 }}>
  <button
  onClick={() => window.open(recipe.sourceUrl, "_blank", "noopener noreferrer")}
  className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
>
  Full Recipe
</button>
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
