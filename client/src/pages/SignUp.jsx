import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import { useState } from 'react';

import Auth from '../utils/auth';

const SignUp = (props) => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [signup, { newUser }] = useMutation(ADD_USER);
  const setUserId = props.setUserId;

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { newUser } = await signup({
        variables: { ...formState },
        });
        console.log(newUser)
      const { data } = await login({
        variables: { ...formState },
      });
      setUserId(data.login.user._id);
      Auth.login(data.login.token);
      localStorage.setItem('user_id', data.login.user._id);
      props.setLoggedIn(true);
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up!</h1>
          <p className="py-3">
            Sign up to access your trading history and more!
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
        
        
      </div>
      
      
    </div>
  );
};

export default SignUp;
