import { useState } from "react";


export const CreateAccount = () => {

  const initialUser = {
    id: -1,
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    year: "",
    experience: "",
    aboutMe: "",
  };

  const [createUser, setCreateUser] = useState(initialUser);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(createUser.lastName);
  };
 
 
 
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <h1>Create An Account</h1>
    <div>
      <label htmlFor="firstName">First Name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={createUser.firstName}
        onChange={(event) =>
          setCreateUser({ ...createUser, firstName: event.target.value})}
        required/>
    </div>

    <div>
      <label htmlFor="lastName">Last Name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={createUser.lastName}
        onChange={(event) =>
          setCreateUser({ ...createUser, lastName: event.target.value})}
        required/>
    </div>

    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={createUser.email}
        onChange={(event) =>
          setCreateUser({ ...createUser, email: event.target.value})}
        required/>
    </div>

    <div>
      <label htmlFor="major">Major:</label>
      <input
        type="text"
        id="major"
        name="major"
        value={createUser.major}
        onChange={(event) =>
          setCreateUser({ ...createUser, major: event.target.value})}
        required/>
    </div>

    <div>
      <label htmlFor="year">Year:</label>
      <input
        type="number"
        id="year"
        name="year"
        value={createUser.year}
        onChange={(event) =>
          setCreateUser({ ...createUser, year: (event.target.value)})}
        required/>
    </div>

    <div>
      <label htmlFor="experience">Experience Working Out:</label>
      <input
        type="text"
        id="experience"
        name="experience"
        value={createUser.experience}
        onChange={(event) =>
          setCreateUser({ ...createUser, experience: event.target.value})}
        required/>
    </div>

    <div>
      <label htmlFor="aboutMe">About Me:</label>
      <textarea
        id="aboutMe"
        name="aboutMe"
        value={createUser.aboutMe}
        onChange={(event) =>
          setCreateUser({ ...createUser, aboutMe: event.target.value})}
        required
      ></textarea>
    </div>

    <button type="submit">Submit</button>
  </form>
  );
};
