import { useState } from 'react'
import './Following.css'


function Following() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='follow-container'>
        <h3>Who to follow</h3>
        <div className="container-card">
          <section>
            <section className='finfo-container'>
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
          </section>

          <section className='container-follow'>
            <button>Follow</button>
          </section>
        </div>
        <div className="container-card">
          <section>
            <section className='finfo-container'>
              <section className='photo-section flex-center'>
                <img src="https://pbs.twimg.com/profile_images/1734158748061450240/SLkB77Fe_400x400.jpg" />
                <p className='name'>miguel ortiz</p>
              </section>
              <section className='photo-section2 flex-center'>
                <p className='username'>@miguel11mom</p>
                <span>.</span>
                <p className='date'>3 Jun</p>
              </section>
            </section >
          </section>

          <section className='container-follow'>
            <button>Follow</button>
          </section>
        </div>
        <div className="container-card">
          <section>
            <section className='finfo-container'>
              <section className='photo-section flex-center'>
                <img src="https://pbs.twimg.com/profile_images/1557504301878202368/rF3Ee8Z7_400x400.jpg" />
                <p className='name'>Elmariana</p>
              </section>
              <section className='photo-section2 flex-center'>
                <p className='username'>@elmarianaa</p>
                <span>.</span>
                <p className='date'>3 Jun</p>
              </section>
            </section >
          </section>

          <section className='container-follow'>
            <button>Follow</button>
          </section>
        </div>

      </section>
    </>
  )
}

export default Following;
