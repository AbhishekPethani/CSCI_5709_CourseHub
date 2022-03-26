import '../../assets/css/AdminHeader.css';
import UserInfo from './AdminUserInfo';


function Header() {
  return (
    <header className='protoHeader'>
      <div className='logo-name clickable'>
        {/* <img src={logo} className="logo" alt="Course Hub App" /> */}
        <div className='app-name'>Course Hub</div>
      </div>
      <UserInfo />
    </header>
  );
}

export default Header;
