import axios from 'axios';
import { createClient } from '@sanity/client';

// Initialize Sanity client using environment variables
const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET || '',
  token: process.env.YOUR_SANITY_TOKEN, // replace with your write token environment variable name if needed
  useCdn: false,
});

// Variable for domain
const domain = 'garten-schlueter.de';

// Get the API key from the environment variables
const apiKey = process.env.SISTRIX_API_KEY || '';

// URL for the Sistrix API
const url = `https://api.sistrix.com/keyword.domain.seo?api_key=${apiKey}&domain=${domain}&date=now&num=20`;

axios.get(url)
  .then(response => {
    // Extract the data from the response as needed
    const data = {
      domain: domain,
      date: response.data.date,
      // add other fields as needed
    };

    // Create the document in Sanity
    client.create(data)
      .then(res => {
        console.log(`Document was created with ID ${res._id}`);
      })
      .catch(err => {
        console.error('Error creating document:', err);
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });