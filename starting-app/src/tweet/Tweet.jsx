import { useState } from 'react'
import './Tweet.css'

function Tweet() {
  const [count, setCount] = useState(0);
  return (
    <>
      <article>
        <section className='info-container'>
          <section className='photo-section flex-center'>
            <img src="https://avatars.githubusercontent.com/u/181368088?s=96&v=4" />
            <p className='name'>Bryanjrr</p>
          </section>
          <section className='photo-section2 flex-center'>
            <p className='username'>@bryanjr</p>
            <span>.</span>
            <p className='date'>3 Jun</p>
          </section>
        </section >

        <section>
          <section className='message-creation'>
            <textarea name="" id="" placeholder='¿What is happening?'></textarea>
            <div className='functionalities-container'>
              <div className='functionalities'>
                <span>
                  <i class="fa-regular fa-image"></i>
                </span>
                <span>
                  <i class="fa-regular fa-gif"></i>
                </span>
                <span>
                  <i class="fa-regular fa-face-awesome"></i>
                </span>
              </div>
              <button>Post</button>
            </div>
          </section>
          <section className='message-list'>
            <h3>List of messages</h3>
            <div className='message-container'>
              <div className='info-container '>
                <section className='photo-section flex-center'>
                  <img src="https://avatars.githubusercontent.com/u/181368088?s=96&v=4" />
                  <p className='name'>Bryanjrr</p>
                </section>
                <section className='photo-section2 flex-center'>
                  <p className='username'>@bryanjr</p>
                  <span>.</span>
                  <p className='date'>3 Jun</p>
                </section>

              </div >
              <section className='message-section flex-center'>
                <p className='message'>Calling all developers! 📣
                  Innovate with our real-time and historical data on the X API.
                  Get started with Pro👇</p>
              </section>
            </div>
          </section>
        </section>
      </article>
    </>)
}

export default Tweet;
