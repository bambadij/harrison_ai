import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import * as EmailValidator from 'email-validator';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [valid,setisValid] = useState(null)
  const [pwderror,setPwdError]=useState([])
//  add validation password here
  const validatePwd = (password)=>{
    const error =[]
    if (password.length<8) {
      error.push('Password must be at least 8 characters')
    }
    // here we check if the password contain a lowercase letter
    if(!/[a-z]/.test(password)){
      error.push('Password must contain at least one lowercase letter')
    }
    // here we check if the password contain a uppercase letter
    if(!/[A-Z]/.test(password)){
      error.push('Password must contain at least one uppercase letter')
    }
    // here we check if the password contain a numerical digit
    if(!/\d/.test(password)){
      error.push('Password must contain at least one numerical digit')
    }
    // here we check if the password contain special character
    if(!/[!@#$%^&*]/.test(password)){
      error.push('Password must contain at least on special character')
    }
    // after return error
    return error
  }
  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
   
    // Add validation code here
    const isValidEmail = EmailValidator.validate(email);
    const pwdError =  validatePwd(password)
    setisValid(isValidEmail)
    setPwdError(pwdError)
    if (isValidEmail && pwdError.length===0) {
      handleSubmit(event)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    validateForm(event);
    setShowAlert("Login Successful");
  };

  return (
    <>
      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              error={valid !== null}
              margin="normal"
              required
              fullWidth
              id={valid !== null ? "outlined-error":"email"}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              error={pwderror.length > 0}
              margin="normal"
              required
              fullWidth
              name="password"
              label={pwderror.length > 0 ? "Error" : "Password"}
              type="password"
              id={pwderror.length > 0 ? "outlined-error":"password"}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
              {valid !== null && (
                <ul>
                  {valid ? '' : 'Invalid email address'}
                </ul>
              )}
            {pwderror.length > 0 && (
                <ul>
                  {pwderror.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
