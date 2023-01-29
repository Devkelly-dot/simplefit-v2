export function authFetch(request_type = "GET", headers = {}, endpoint, body) {
    const defaultHeaders = { "Content-Type": "application/json" };
    const finalHeaders = { ...defaultHeaders, ...headers };
    const final_endpoint = String(import.meta.env.VITE_API_ENDPOINT) + endpoint;


    return fetch(final_endpoint, {
      method: request_type,
      headers: finalHeaders,
      body: request_type !== "GET" ? JSON.stringify(body) : undefined
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }