import { ThemeProvider, createTheme, CssBaseline, Container, Typography } from '@mui/material';
import StudentList from './components/StudentList';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Student Management System
        </Typography>
        <StudentList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
