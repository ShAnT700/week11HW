import { faker } from "@faker-js/faker";
import fs from "fs";

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

  const createListingResponse = await apiClient.post(`/api/estate-objects`, {
    multipart: data,
    // Playwright request API expects headers under `headers` and token interpolated
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const loginApiResponseJson = await createListingResponse.json();
  return loginApiResponseJson;
}
