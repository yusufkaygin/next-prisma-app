const fetchApi = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Api error");
  }
  return res.json();
};

export const getApi = (url) => fetchApi(url);
export const postApi = (url, data) =>
  fetchApi(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
export const putApi = (url, data) =>
  fetchApi(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteApi = async (url) => {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Api error");
  }
  return res.status === 204 ? null : await res.json();
};

export default fetchApi;
