import React, {useState} from 'react';

function SignUp(props) {
  const [username, setUsername] = useState("");

  function handleChange(e) {
    const {value} = e.target;
    setUsername(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(username);
  }

  return (
    <div className="form-container">
        <h1>Let's Talk</h1>
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="email">What is your email?</label>
            <input type="email" name="username" onChange={handleChange} className="input" />
            <button className="submit">Submit</button>
        </form>
    </div>
  )

}
export default SignUp;
