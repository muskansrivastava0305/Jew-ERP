const API_BASE = 'http://localhost:5000/api';

export const getAllProducts = async () => {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
};

export const createProduct = async (data) => {
  const res = await fetch(`${API_BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateProduct = async (id, data) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: 'DELETE',
  });
  return res.json();
};
