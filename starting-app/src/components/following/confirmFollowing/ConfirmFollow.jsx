// confirmFollow.jsx
import { createPortal } from 'react-dom';
import './ConfirmFollow.css';
import Button from '@mui/material/Button';
import { UnfollowUser } from '../../../services/FollowService';

function ConfirmFollow(user, setFollowModal, setUsers) {

  async function handleUnfollow() {
    await UnfollowUser(localStorage.getItem("token"), user);
    setFollowModal(null);
    setUsers(prev =>
      prev.map(u =>
        u.id_user === user.id_user ? { ...u, is_following: false } : u
      )
    );
  }

  return createPortal(
    <section className='confirmContainer'>
      <h2>Are you sure you want to unfollow <strong>{user.username}</strong>?</h2>
      <div className='buttons'>
        <Button className='cancel' variant="outlined" onClick={() => setFollowModal(null)}>Cancel</Button>
        <Button className='confirm' variant="outlined" onClick={handleUnfollow}>Unfollow</Button>
      </div>
    </section>,
    document.body
  );
}

export default ConfirmFollow;
