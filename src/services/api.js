import { api } from '../context/AuthContext.jsx'

export const getDashboard          = () => api.get('/dashboard')
export const getStudents           = (params) => api.get('/students', { params })
export const getStudentSummary     = () => api.get('/students/summary')
export const getEnrollmentStats    = () => api.get('/students/enrollment-stats')
export const getCourseDistribution = () => api.get('/students/course-distribution')
export const getCourses            = (params) => api.get('/courses', { params })
export const getCoursesByDept      = () => api.get('/courses/by-department')

export default api