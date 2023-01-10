const express = require('express');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 5000;

require('dotenv').config()

app.get('/', (req, res) => {
  res.send("Hello")
})


app.get('/chat', async (req, res) => {

  async function fetchData() {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          'model': 'text-davinci-002',
          'prompt': 'Tell me a joke.',
          'temperature': 1,
          'max_tokens': 1024
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_CHATGPT_KEY
          },
        },
      );

      console.log(response.data.choices[0].text);
      return response.data.choices[0].text;
      
    } catch (err) {
      console.log(err);
    }
  }
  const joke = await fetchData()
  res.send(joke);
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));