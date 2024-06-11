function Welcome({ userInfo, userType }) {
    let user = userInfo.myUser?.name;
    const status = userInfo.myUser?.status;

    let statusStyle = null;
    switch(status) {
        case 'goldenGalleon':
            statusStyle = "golden";
            break;
        case 'platinumPatronus':
            statusStyle = "platinum";
            break;
        case 'silverSnitch':
            statusStyle = "silver";
            break;
        case 'goblin':
            statusStyle = "goblin";
            break;
    }

    return (
        <div className="usernameContainer">
            <h2 className="welcomeMessage">Welcome, {user}</h2>
            {status && <p className={`userType ${statusStyle}`}>{userType[status]}</p>}
        </div>
    );
}

export default Welcome