import { render, screen,fireEvent } from '@testing-library/react';
import LoginForm from '.';
import { click } from '@testing-library/user-event/dist/click';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here
describe('Login  Validation',() =>{
  test('displya error for email invalid',()=>{
    const {getByLabelText,getByText} =render(<LoginForm/>)
    const emailInput = getByLabelText('Email Address');
    const submitButton =getByText('Sign in');
    fireEvent.change(emailInput,{target:{value:'invalid-email'}});
    fireEvent,click(submitButton);

    expect(getByLabelText('Invalid email')).toBeInTheDocument();
  })
  test('Valid password return an empty array',()=> {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const passwordInput = getByLabelText('Password');
    const submitButton = getByText('Sign in')

    fireEvent.change(passwordInput,{target:{value:'short'}});
    fireEvent,click(submitButton);
    expect(getByText('Password must be at least 8 characters')).toBeInTheDocument();
    expect(getByText('Password must contain at least one lowercase letter')).toBeInTheDocument();
    expect(getByText('Password must contain at least one uppercase letter')).toBeInTheDocument();
    expect(getByText('Password must contain at least one numerical digit')).toBeInTheDocument();
    expect(getByText('Password must contain at least on special character')).toBeInTheDocument();
  })
  test('Submit the form for valid email and password',()=>{
    const { getByLabelText, getByText,queryByText } = render(<LoginForm />);
    const emailInput=getByLabelText('Email Address');
    const passwordInput=getByLabelText('Password');
    const submitButton=getByText('Sign in');

    // Enter a valid email and password
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'ValidPwd123!@' } });
    fireEvent.click(submitButton);
  
    expect(queryByText('Invalid email address')).toBeNull();
    expect(queryByText('Password invalid')).toBeNull();
  })
})