const axios = require('axios');

export default async function handler(req, res) {
  const options = {
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/complexSearch',
    params: {
        query: req.query.keyword,
        diet: req.query.diet,
        type: req.query.type,
        excludeIngredients: req.query.exclude,
        number: '5',
        offset: '0'
    },
    headers: {
      'x-api-key': 'a9cf5f30751e48ebb3833dbb535c88c3'
    }
  };

	try {
		let response = await axios(options);
		res.status(200).json(response.data);
    console.log("Response: ", response.data)
	} catch (error) {
		console.error(error.response);
	}
}