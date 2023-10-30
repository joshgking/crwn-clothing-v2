import { useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { signInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);

      resetFormFields();
    } catch (error) {
      console.log('ERROR', error.code);
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Password is incorrect.');
          break;
        case 'auth/invalid-login-credentials':
          alert('No user associated with this email');
          break;
        default:
          console.log('error signing in', error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    const userDocRef = createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-up-container">
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          type="password"
          label="Password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType={'google'} onClick={logGoogleUser}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
