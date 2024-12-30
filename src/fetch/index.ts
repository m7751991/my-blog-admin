const BASE_URL = "http://localhost:3333/api/v1"; // Replace with your API base URL

export type FetchResponse<T> = {
  status: boolean;
  message: string;
  data?: T;
  code: number;
  error?: string;
};
type FetchRequest = <T>(url: string, options: RequestInit) => Promise<FetchResponse<T>>;

const fetchRequest: FetchRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("authorization");
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      authorization: `${token}`,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData, "response");
    if (errorData.status === 401 && errorData.code === 10001) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return errorData;
  }

  return response.json();
};

export const uploadFile = async (url: string, file: File, options?: RequestInit): Promise<FetchResponse<any>> => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchRequest(url, {
    method: "POST",
    body: formData,
    ...options,
  });
};

// 指定响应数据类型和入参的类型
type fetchType = <dataT, paramsT extends Record<string, any> | undefined>(url: string, params?: paramsT, options?: RequestInit) => Promise<FetchResponse<dataT>>;

export const fetchData: fetchType = async (url, params, options) => {
  // const queryString = new URLSearchParams(params).toString();
  let fullUrl = url;
  if (params) {
    const filteredParams = Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== undefined && v !== null));
    const queryString = new URLSearchParams(filteredParams).toString();
    console.log(queryString, "queryString");
    fullUrl = queryString ? `${url}?${queryString}` : url;
  }

  return fetchRequest(fullUrl, { method: "GET", ...options });
};

export const createResource: fetchType = async (url, params, options) => {
  return fetchRequest(url, { method: "POST", body: JSON.stringify(params), ...options });
};

export const updateResource: fetchType = async (url, params, options) => {
  return fetchRequest(url, { method: "PUT", body: JSON.stringify(params), ...options });
};

export const deleteResource: fetchType = async (url, options) => {
  return fetchRequest(url, { method: "DELETE", ...options });
};
