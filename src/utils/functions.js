import { HTTP_SUCCESS } from "./constants";

const SendPostRequest = async (payload, headers, url) => {
  let final_response = {};
  let err;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: payload,
      headers: headers,
    });
    if (response.status === HTTP_SUCCESS) {
      const result = await response.json();
      final_response = result;
    } else {
      const result = await response.text();
      err = result;
    }
  } catch (error) {
    err = error;
  }
  return { response: final_response, error: err };
};

export { SendPostRequest };
