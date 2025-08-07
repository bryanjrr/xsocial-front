import { useState, useEffect, use } from 'react'
import './Following.css'
import { followingUsers } from '../../services/UserService';
import confirmFollow from './confirmFollowing/confirmFollow';
import { useSnackbar } from 'notistack';
import { followUser } from '../../services/FollowService';


function Following() {
  const [users, setUsers] = useState([]);
  const [followModal, setFollowModal] = useState(null);
  const { enqueueSnackbar } = useSnackbar();


  useEffect(function () {
    fetchFollowingUsers();
  }, []);

  async function fetchFollowingUsers() {
    let users = await followingUsers();
    setUsers(users);
  }

  async function handleFollow(user) {
    try {
      let response = await followUser(localStorage.getItem("token"), user);
      setUsers(prev =>
        prev.map(u =>
          u.id_user === user.id_user ? { ...u, is_following: true } : u
        ));
      enqueueSnackbar(response.message, { variant: response.status, });
    } catch (e) {
      console.log(e);
      enqueueSnackbar(response.message, {
        variant: response.status, ContentProps: {
          className: "my-snackbar",
        },
      });
    }
  }


  return (
    <>
      <section className='follow-container'>
        <h3>Who to follow</h3>
        {users.length === 0 && (
          <p className='no-following'>No users to follow</p>)}
        {users.map(user => (
          <div className="container-card">
            <section>
              <section className='finfo-container'>
                <section className='photo-section flex-center'>
                  <img src={user.photo} />
                  <p className='name'>{user.account_details.full_name}</p>
                </section>
                <section className='photo-section2 flex-center'>
                  <p className='username'>{user.username}</p>
                  <span>.</span>
                  <p className='date'>{user.account_details.union_date}</p>
                </section>
              </section >
            </section>

            <section className='container-follow'>
              {user.is_following ? <button className='is_following' onClick={() => setFollowModal(user.username)}>Following</button> : <button onClick={() => handleFollow(user)}>Follow</button>}
            </section>
            {followModal === user.username && confirmFollow(user, setFollowModal, setUsers)}
          </div>
        ))}
      </section>
    </>
  )

}

export default Following;
