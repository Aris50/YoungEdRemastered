import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export interface Student {
    id?: number;
    name: string;
    age: number;
    gender: string;
    grade: number;
    course: {
        cid: number;
    } | null;
}

export interface Course {
    cid: number;
    name: string;
    duration: string;
    price: number;
    category: {
        catid: number;
    };
}

export interface Category {
    catid: number;
    name: string;
}

const api = {
    // Student endpoints
    getStudents: () => axios.get<Student[]>(`${API_URL}/students`),
    getStudent: (id: number) => axios.get<Student>(`${API_URL}/students/${id}`),
    createStudent: (student: Student) => axios.post<Student>(`${API_URL}/students`, student),
    updateStudent: (id: number, student: Student) => axios.put<Student>(`${API_URL}/students/${id}`, student),
    deleteStudent: (id: number) => axios.delete(`${API_URL}/students/${id}`),

    // Course endpoints
    getCourses: () => axios.get<Course[]>(`${API_URL}/courses`),
    getCourse: (id: number) => axios.get<Course>(`${API_URL}/courses/${id}`),
    createCourse: (course: Course) => axios.post<Course>(`${API_URL}/courses`, course),
    updateCourse: (id: number, course: Course) => axios.put<Course>(`${API_URL}/courses/${id}`, course),
    deleteCourse: (id: number) => axios.delete(`${API_URL}/courses/${id}`),

    // Category endpoints
    getCategories: () => axios.get<Category[]>(`${API_URL}/categories`),
    getCategory: (id: number) => axios.get<Category>(`${API_URL}/categories/${id}`),
    createCategory: (category: Category) => axios.post<Category>(`${API_URL}/categories`, category),
    updateCategory: (id: number, category: Category) => axios.put<Category>(`${API_URL}/categories/${id}`, category),
    deleteCategory: (id: number) => axios.delete(`${API_URL}/categories/${id}`),
};

export default api; 