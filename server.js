const express = require('express');
const axios = require('axios');
const cors = require('cors')

const app = express();

const PORT = process.env.PORT || 5000;

require('dotenv').config()

app.use(cors())

app.get('/', (req, res) => {
  res.send("Hello")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post('/chat', async (req, res) => {

  const prompt = req.body.data;
  console.log("prompt", prompt)

  async function fetchData() {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          'model': 'text-davinci-002',
          'prompt': prompt,
          'temperature': 1,
          'max_tokens': 250
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.REACT_APP_CHATGPT_KEY
          },
        },
      );

      console.log("response.data.choices[0].text", response.data.choices[0].text);
      return response.data.choices[0].text;
      
    } catch (err) {
      console.log(err);
    }
  }
  const dataResponse = await fetchData()
  res.send(dataResponse);
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));