
const users = localStorage.getItem("game-username");
if (users) {
  console.log(users);
} else {
  console.log(0);
}

const User = () => {

    return(
        <h1>{users}</h1>
    )

}

export default User