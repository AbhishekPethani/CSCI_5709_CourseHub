import "../../assets/css/AdminUserInfo.css";

function UserInfo() {
  return (
    <section className="userInfo">
      <span className="material-icons account-circle">account_circle</span>
      <div className="userInfoItems">
        <ul>
          <li>Sourav Malik</li>
          <li>Logout</li>
        </ul>
      </div>
    </section>
  );
}

export default UserInfo;
