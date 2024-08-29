const axios = require('axios');

export default async function handler(req, res) {
  const { id } = req.query; // Get the recipe ID from the URL

  const options = {
    method: 'GET',
    url: `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json`,
    headers: {
      'x-api-key': 'a9cf5f30751e48ebb3833dbb535c88c3'
    }
  };

  try {
    let response = await axios(options);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.response);
    res.status(error.response?.status || 500).json({ message: 'Error fetching recipe details' });
  }
}