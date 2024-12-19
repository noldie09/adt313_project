import { useState, useRef, useCallback, useEffect } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [status, setStatus] = useState('idle');
  const userInputDebounce = useDebounce({ email, password }, 2000);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleInputChange = (setter) => (event) => {
    setIsDirty(true);
    setter(event.target.value);
  };

  const togglePasswordVisibility = () => setIsShowPassword((prev) => !prev);

  const handleLogin = async () => {
    try {
      setStatus('loading');
      const { data } = await axios.post('/user/login', { email, password }, {
        headers: { 'Access-Control-Allow-Origin': '*' },
      });
      localStorage.setItem('accessToken', data.access_token);
      alert('Login successful!');
      navigate('/home');
    } catch {
      alert('Login failed!');
    } finally {
      setStatus('idle');
    }
  };

  const handleSubmit = () => {
    if (status === 'loading') return;

    if (!email) emailRef.current.focus();
    if (!password) passwordRef.current.focus();

    if (email && password) handleLogin();
  };

  useEffect(() => {}, [userInputDebounce]);

  return (
    <div className="Login">
      <div className="main-container">
        <h3>Sign In Account</h3>
        <form>
          <div className="form-container">
            <div className="form-group">
              <label>E-mail:</label>
              <input
                type="text"
                ref={emailRef}
                value={email}
                onChange={handleInputChange(setEmail)}
              />
              {isDirty && !email && <span className="errors">This field is required</span>}
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type={isShowPassword ? 'text' : 'password'}
                ref={passwordRef}
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              {isDirty && !password && <span className="errors">This field is required</span>}
            </div>

            <div className="show-password" onClick={togglePasswordVisibility}>
              {isShowPassword ? 'Hide' : 'Show'} Password
            </div>

            <div className="submit-container">
              <button
                className="btn-primary"
                type="button"
                disabled={status === 'loading'}
                onClick={handleSubmit}
              >
                {status === 'idle' ? 'Login' : 'Loading...'}
              </button>
            </div>

            <div className="register-container">
              <small>Don't have an account? </small>
              <a href="/register">
                <small>Register</small>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
