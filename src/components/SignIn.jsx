import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
export default function GoogleLoginButton() {
  const navigate = useNavigate();
  const handleSuccess = async credentialResponse => {
    const idToken = credentialResponse.credential;
    try {
      const res = await axios.post(
        'http://localhost:3000/api/auth/verify',
        { idToken },
        { withCredentials: true }  // Only needed if your backend sets cookies
      );
      console.log('✅ Login success:', res.data);
      if (res.data.success){
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('role', res.data.role);
        const role = res.data.role;
        if (role === 'customer') {
          console.log("Role: customer");
          navigate('/customer-home');
        } else if (role === 'admin') {
          console.log("Role: admin");
          navigate('/admin');
        } else if (role === 'rider') {
          console.log("Role: rider");
          navigate('/rider');
        } else {
          console.warn("Unknown role:", role);
          navigate('/unauthorized');
        }
      }
    } catch (err) {
      if (err.response) {
        console.error('❌ Login failed:', err.response.data);
      } else if (err.request) {
        console.error('❌ No response from server:', err.request);
      } else {
        console.error('❌ Error setting up request:', err.message);
      }
    }
  };

  const handleError = () => {
    console.error('❌ Google Sign In failed');
  };


  return (
    <div className='flex min-h-screen items-center justify-around '>
      <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
    </div>
    
  );
}
