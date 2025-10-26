import { faker } from "@faker-js/faker";
import fs from "fs";

import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;

export async function apiCreateListing(apiClient, token) {
  const data = {
    images: fs.createReadStream("./data/housepic.jpg"),
    lotSize: 200,
    sqft: 924,
    garage: 2,
    bathrooms: 2,
    bedrooms: 2,
    price: 589000,
    zipCode: 75206,
    state: "TX",
    city: "Joshua Tree",
    address: "89803 Cuthbert Rd",
    description: "Vitalii created test ap",
    title: `Vitalii TEST ${faker.lorem.words(2)}`,
    isPublished: true,
  };

  const createListingResponse = await apiClient.post(`${BASE_URL}api/estate-objects`, {
    multipart: data,
    // Playwright request API expects headers under `headers` and token interpolated
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Log response status and body for debugging (temporary)
  try {
    const status = createListingResponse.status();
    let body = null;
    try {
      body = await createListingResponse.json();
    } catch (e) {
      // fallback to text if json parsing fails
      try {
        body = await createListingResponse.text();
      } catch (e2) {
        body = '<unable to read body>';
      }
    }
    console.log('apiCreateListing status:', status);
    console.log('apiCreateListing body:', body);
    return body;
  } catch (err) {
    console.error('Error reading create listing response:', err);
    throw err;
  }
}
