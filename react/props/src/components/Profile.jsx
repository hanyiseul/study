function Profile({ name, age, major }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>나이: {age}</p>
      <p>전공: {major}</p>
    </div>
  );
}

export default Profile;