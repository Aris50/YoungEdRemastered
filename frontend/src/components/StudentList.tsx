import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../services/api';
import type { Student, Course } from '../services/api';

export default function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Student>({
        name: '',
        age: 0,
        gender: '',
        grade: 0,
        course: { cid: 0 }
    });

    useEffect(() => {
        loadStudents();
        loadCourses();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await api.getStudents();
            setStudents(response.data);
        } catch (error) {
            console.error('Error loading students:', error);
        }
    };

    const loadCourses = async () => {
        try {
            const response = await api.getCourses();
            setCourses(response.data);
        } catch (error) {
            console.error('Error loading courses:', error);
        }
    };

    const handleOpen = (student?: Student) => {
        if (student) {
            setSelectedStudent(student);
            setFormData(student);
        } else {
            setSelectedStudent(null);
            setFormData({
                name: '',
                age: 0,
                gender: '',
                grade: 0,
                course: { cid: 0 }
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
    };

    const handleSubmit = async () => {
        try {
            if (selectedStudent) {
                await api.updateStudent(selectedStudent.id!, formData);
            } else {
                await api.createStudent(formData);
            }
            handleClose();
            loadStudents();
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.deleteStudent(id);
                loadStudents();
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
                style={{ marginBottom: '20px' }}
            >
                Add New Student
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.age}</TableCell>
                                <TableCell>{student.gender}</TableCell>
                                <TableCell>{student.grade}</TableCell>
                                <TableCell>
                                    {courses.find(c => c.cid === student.course.cid)?.name}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(student)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(student.id!)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {selectedStudent ? 'Edit Student' : 'Add New Student'}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Grade"
                        type="number"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: parseFloat(e.target.value) })}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        select
                        label="Course"
                        value={formData.course.cid}
                        onChange={(e) => setFormData({ ...formData, course: { cid: parseInt(e.target.value) } })}
                        margin="normal"
                    >
                        {courses.map((course) => (
                            <MenuItem key={course.cid} value={course.cid}>
                                {course.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {selectedStudent ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
} 