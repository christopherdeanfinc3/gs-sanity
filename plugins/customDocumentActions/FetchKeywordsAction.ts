import axios from 'axios';
import { createClient } from '@sanity/client';

export default function FetchKeywordsAction() {
  return {
    label: 'Fetch Keywords',
    onHandle: () => {
      const client = createClient({
        projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
        dataset: process.env.SANITY_STUDIO_PROJECT_DATASET || '',
        useCdn: false,
      });
      // TODO replace this with the actual document ID as variable
      const documentId = 'b6beb36d-ee2c-4587-87e0-ef6b68361954'; // Replace this with the actual ID

      client.fetch(`*[_id == "${documentId}"][0]`).then(document => {
        const domain = document.seo.page.domain;
        const numResults = document.seo.page.numResults;
        const apiKey = process.env.SISTRIX_API_KEY || '';
        const url = `https://api.sistrix.com/keyword.domain.seo?api_key=${apiKey}&domain=${domain}&date=now&num=${numResults}`;

        axios.get(url).then(response => {
          const keywords = response.data.keywords; // adjust this according to the API response structure

          client
            .patch(documentId)
            .set({ 'seo.page.keywords': keywords })
            .commit()
            .then(updatedDocument => {
              console.log(`Document was updated with ID ${updatedDocument._id}`);
            })
            .catch(err => {
              console.error('Error updating document:', err);
            });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching configuration document:', error);
      });
    },
  };
}
