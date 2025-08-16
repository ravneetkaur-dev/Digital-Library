// Base API URL (change if needed)
export const API_BASE_URL =
  (typeof window !== "undefined" && (localStorage.getItem("API_BASE_URL") || window.API_BASE_URL)) ||
  "http://localhost:5000"

// API Endpoints
export const ENDPOINTS = {
    faculty: {
    login: "/api/faculty/login", // POST
    logout: "/api/faculty/logout", // POST
    profile: (id) => `/api/faculty/profile/${id}`, // GET
    updateImage: (id) => `/api/faculty/update/facultyimages/${id}`, // PUT (multipart)
    updatePassword: (id) => `/api/faculty/update/password/${id}`,
    list: "/api/facultymanagement/getfaculty",
    create: "/api/facultymanagement/register",
    update: (id) => `/api/facultymanagement/update/${id}`,
    delete: (id) => `/api/facultymanagement/delete/${id}`,
  },
  notes: {
    list: "/api/notes",
    create: "/api/notes", 
    update: (id) => `/api/notes/${id}`, // PUT
    delete: (id) => `/api/notes/${id}`, // DELETE
    byFaculty: (facultyId) => `/api/notes?uploadedBy=${facultyId}`, // GET
    bySubject: (subject) => `/api/notes?subject=${encodeURIComponent(subject)}`, // GET
    approve: (id) => `/api/notes/${id}/approve`, // PUT (admin only)
    toggleVisibility: (id) => `/api/notes/${id}/visibility`, // PUT
  },
  syllabus: {
    list: "/api/syllabus/getsyllabus",
    create: "/api/syllabus/uploadsyllabus",
    delete: (id) => `/api/syllabus/${id}`,
  },
  books: {
    list: "/api/book/filter",
    create: "/api/book/upload",
    delete: (id) => `/api/book/delete/${id}`,
  },
  papers: {
    list: "/api/paper",
    create: "/api/paper",
    delete: (id) => `/api/paper/${id}`,
  },
  course: {
    departments: {
      list: "/api/course/departments",
      create: "/api/course/departments",
    },
    courses: {
      byDepartment: (departmentId) => `/api/course/courses/${departmentId}`,
      create: "/api/course/courses",
    },
    semesters: {
      byCourse: (courseId) => `/api/course/semesters/${courseId}`,
      create: "/api/course/semesters",
    },
  },
  subjects: {
    list: "/api/subjects",
    create: "/api/subjects",
    update: (id) => `/api/subjects/${id}`,
    delete: (id) => `/api/subjects/${id}`,
  },
  // Feedback/Contact
  feedback: {
    submit: "/api/feedback/submit", // POST { userName, userEmail, content, rating }
    list: "/api/feedback/all", // GET (for admin to view all feedback)
  },
  facultyAuth: {
    login: "/api/faculty/login", // POST
    logout: "/api/faculty/logout", // POST
    updateImage: (id) => `/api/faculty/update/facultyimages/${id}`, // PUT (multipart)
    updatePassword: (id) => `/api/faculty/update/password/${id}`, // PUT
  },
  // Notifications
  notifications: {
    list: "/api/notification", // GET
    create: "/api/notification", // POST
    markRead: (id) => `/api/notification/${id}/read`, // PUT
  },
}

// Helper to get auth headers with faculty_token
function facultyAuthHeaders() {
  const token = (typeof window !== "undefined" && window.localStorage.getItem("faculty_token")) || null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Helper to get auth headers with admin_token
function adminAuthHeaders() {
  const token = (typeof window !== "undefined" && window.localStorage.getItem("admin_token")) || null
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// Generic auth headers (tries faculty first, then admin)
function getAuthHeaders() {
  const facultyToken = typeof window !== "undefined" ? localStorage.getItem("faculty_token") : null
  const adminToken = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null
  const token = facultyToken || adminToken
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function authHeaders() {
  return getAuthHeaders()
}

// Common response handler
async function handleResponse(res, defaultError) {
  const type = res.headers.get("content-type") || ""
  const data = type.includes("application/json") ? await res.json() : await res.text()
  if (!res.ok) {
    throw new Error(
      (typeof data === "object" && (data.message || data.error)) ||
      (typeof data === "string" && data) ||
      defaultError
    )
  }
  return data
}

// Faculty-specific API functions
export const facultyApiJson = (path, options = {}) =>
  fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...facultyAuthHeaders(), ...(options.headers || {}) },
  }).then((res) => handleResponse(res, "Request failed"))

export const facultyApiUpload = (path, formData, options = {}) =>
  fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: { ...facultyAuthHeaders(), ...(options.headers || {}) },
  }).then((res) => handleResponse(res, "Upload failed"))

export const facultyApiGet = (path) =>
  fetch(`${API_BASE_URL}${path}`, { credentials: "include", headers: facultyAuthHeaders() }).then((res) =>
    handleResponse(res, "Request failed"),
  )

// GET
export const apiGet = (path) =>
  fetch(`${API_BASE_URL}${path}`, { credentials: "include", headers: authHeaders() })
    .then((res) => handleResponse(res, "Request failed"))

// POST/PUT/PATCH (JSON)
export const apiJson = (path, options = {}) =>
  fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...authHeaders(), ...(options.headers || {}) },
  }).then((res) => handleResponse(res, "Request failed"))

// POST multipart/form-data
export const apiUpload = (path, formData, options = {}) =>
  fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: { ...authHeaders(), ...(options.headers || {}) },
  }).then((res) => handleResponse(res, "Upload failed"))

// DELETE
export const apiDelete = (path) =>
  fetch(`${API_BASE_URL}${path}`, {
    method: "DELETE",
    credentials: "include",
    headers: authHeaders(),
  }).then((res) => handleResponse(res, "Delete failed"))
