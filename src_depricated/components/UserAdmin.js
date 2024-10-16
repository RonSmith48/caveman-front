// Author: Ron Smith
// Date: 13.01.23
// Ref: https://youtu.be/nI8PYZNFtac (Dave Gray)

import { Link } from 'react-router-dom';
import Users from './Users';

const UserAdmin = () => {
  return (
    <section>
      <h1>User Admin</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
export default UserAdmin;
