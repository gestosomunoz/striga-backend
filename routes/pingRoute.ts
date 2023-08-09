import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { getAuthHeaderv2 } from '../striga-api/strigaUtils';

dotenv.config();



export const pingRoute = Router();

pingRoute.get('/ping', async (req, res) => {
  try {
    const data = {
      ping: 'pouung'
    };

    const authorization = getAuthHeaderv2(data, '/ping', 'POST');

    const headers = {
      Authorization: authorization,
      'api-key': process.env.API_KEY,
    };

    

    const apiUrl = 'https://www.sandbox.striga.com/api/v1/ping';

    const response = await axios.post(apiUrl, data, { headers });
    
    res.json(response.data); // Send the response data from the external API to the client
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' }); // Handle errors appropriately
  }
});