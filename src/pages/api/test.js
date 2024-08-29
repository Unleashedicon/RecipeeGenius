const axios = require('axios');

async function testApi() {
  const options = {
    method: 'GET',
    url: 'https://api.spoonacular.com/recipes/complexSearch',
    params: {
      sort: 'popularity', // Use 'popularity' as a string or define a variable
      number: '20',
      offset: '0'
    },
    headers: {
      'x-api-key': 'f673e990767c45518dee1f79e6fc55ea'
    }
  };

  try {
    const response = await axios(options);
    console.log('Response data:', response.data);
  } catch (error) {
    if (error.response) {
      // Axios error
      console.error('Error response data:', error.response.data);
      console.error('Error status:', error.response.status);
    } else {
      // Non-Axios error
      console.error('Error message:', error.message);
    }
  }
}

// Run the test
testApi();
