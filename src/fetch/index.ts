const BASE_URL = "https://api.example.com"; // Replace with your API base URL

const fetchRequest = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "An error occurred");
  }

  return response.json();
};

export const get = (url: string, options?: RequestInit) => {
  return fetchRequest(url, { method: "GET", ...options });
};

export const post = (url: string, body: any, options?: RequestInit) => {
  return fetchRequest(url, { method: "POST", body: JSON.stringify(body), ...options });
};

export const put = (url: string, body: any, options?: RequestInit) => {
  return fetchRequest(url, { method: "PUT", body: JSON.stringify(body), ...options });
};

export const del = (url: string, options?: RequestInit) => {
  return fetchRequest(url, { method: "DELETE", ...options });
};
export const uploadFile = async (url: string, file: File, options?: RequestInit) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchRequest(url, {
    method: "POST",
    body: formData,
    ...options,
  });
};

// export const fetchData = async (url: string, options?: RequestInit) => {
//   return fetchRequest(url, { method: "GET", ...options });
// };

// export const createResource = async (url: string, body: any, options?: RequestInit) => {
//   return fetchRequest(url, { method: "POST", body: JSON.stringify(body), ...options });
// };

// export const updateResource = async (url: string, body: any, options?: RequestInit) => {
//   return fetchRequest(url, { method: "PUT", body: JSON.stringify(body), ...options });
// };

// export const deleteResource = async (url: string, options?: RequestInit) => {
//   return fetchRequest(url, { method: "DELETE", ...options });
// };
