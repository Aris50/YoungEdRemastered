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
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import api from '../services/api';
import type { Student, Course } from '../services/api';

type SortField = 'name' | 'grade' | null;
type SortDirection = 'asc' | 'desc';

export default function StudentList() {
    const [students, setStudents] = useState<Student[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [gradeFilter, setGradeFilter] = useState<number | null>(null);
    const [formData, setFormData] = useState<Student>({
        name: '',
        age: 0,
        gender: '',
        grade: 0,
        course: null
    });
    const [formErrors, setFormErrors] = useState<{
        name?: string;
        age?: string;
        gender?: string;
        grade?: string;
    }>({});

    useEffect(() => {
        loadStudents();
        loadCourses();
    }, []);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getFilteredAndSortedStudents = () => {
        let filteredStudents = students;

        // Apply grade filter
        if (gradeFilter !== null) {
            filteredStudents = filteredStudents.filter(student => student.grade === gradeFilter);
        }

        // Apply sorting
        if (!sortField) return filteredStudents;

        return [...filteredStudents].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    };

    const validateForm = () => {
        const errors: {
            name?: string;
            age?: string;
            gender?: string;
            grade?: string;
        } = {};

        if (!formData.name.trim()) {
            errors.name = 'Name cannot be empty';
        }

        if (formData.age <= 0) {
            errors.age = 'Age must be positive';
        }

        if (!formData.gender) {
            errors.gender = 'Gender cannot be empty';
        } else if (!['male', 'female'].includes(formData.gender.toLowerCase())) {
            errors.gender = 'Gender can only be "male" or "female"';
        }

        if (formData.grade < 5 || formData.grade > 8) {
            errors.grade = 'Grade must be between 5 and 8';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

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
                course: null
            });
        }
        setFormErrors({});
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedStudent(null);
        setFormErrors({});
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            if (selectedStudent) {
                await api.updateStudent(selectedStudent.id!, formData);
            } else {
                await api.createStudent(formData);
            }
            handleClose();
            loadStudents();
        } catch (error: any) {
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

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen()}
                >
                    Add New Student
                </Button>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <FormControl style={{ minWidth: 200 }}>
                        <InputLabel>Filter by Grade</InputLabel>
                        <Select
                            value={gradeFilter === null ? '' : gradeFilter.toString()}
                            onChange={(e) => setGradeFilter(e.target.value === '' ? null : Number(e.target.value))}
                            label="Filter by Grade"
                        >
                            <MenuItem value="">All Grades</MenuItem>
                            <MenuItem value="5">5th Grade</MenuItem>
                            <MenuItem value="6">6th Grade</MenuItem>
                            <MenuItem value="7">7th Grade</MenuItem>
                            <MenuItem value="8">8th Grade</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl style={{ minWidth: 200 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortField || ''}
                            onChange={(e) => handleSort(e.target.value as SortField)}
                            label="Sort By"
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="grade">Grade</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                                {sortField === 'name' && (
                                    <IconButton size="small" onClick={() => handleSort('name')}>
                                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                )}
                            </TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>
                                Grade
                                {sortField === 'grade' && (
                                    <IconButton size="small" onClick={() => handleSort('grade')}>
                                        {sortDirection === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                )}
                            </TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getFilteredAndSortedStudents().map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.age}</TableCell>
                                <TableCell>{student.gender}</TableCell>
                                <TableCell>{student.grade}</TableCell>
                                <TableCell>
                                    {courses.find(c => c.cid === student.course?.cid)?.name}
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
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />
                    <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                        margin="normal"
                        error={!!formErrors.age}
                        helperText={formErrors.age}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Gender"
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        margin="normal"
                        error={!!formErrors.gender}
                        helperText={formErrors.gender}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        label="Grade"
                        type="number"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: parseInt(e.target.value) })}
                        margin="normal"
                        error={!!formErrors.grade}
                        helperText={formErrors.grade}
                        inputProps={{ min: 5, max: 8, step: 1 }}
                    />
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