import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const res = await fetch('http://localhost/contact-form-server/login.php', {
        // هنا يتم استدعاء الـ API
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      setResponse(result.message);
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  return (
    <div className='login'>
      <div className="wrapper">
        <form onSubmit={handleSubmit}> {/* تأكد من استخدام onSubmit هنا */}
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <i className="bx bxs-user" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="bx bxs-lock-alt" />
          </div>
          <div className="remember-forgot">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forget password?</a>
          </div>
          <button type="submit" className="btn bg-success">Login</button>
          <div className="register-link">
            <p> Don’t have an account? <a href="Registration.html">Register</a></p>
          </div>
          {response && <p>{response}</p>} {/* عرض الاستجابة هنا */}
        </form>
      </div>
    </div>
  );
}

export default ContactForm;