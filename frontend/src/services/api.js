const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/api/v1${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg =
      typeof err.detail === "string" ? err.detail : `Error ${res.status}`;
    throw new Error(msg);
  }

  return res.status === 204 ? null : res.json();
}
