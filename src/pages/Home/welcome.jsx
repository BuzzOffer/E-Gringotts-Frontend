function Welcome({ userInfo }) {
    let user = userInfo.myUser?.name;
    return (
        <h2 className="welcomeMessage">Welcome, {user}</h2>
    );
}

export default Welcome