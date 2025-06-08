import React from "react"

const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>NEXTZENI</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className='social'>
            <a href='https://www.facebook.com/profile.php?id=61571258289396' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-facebook-f icon'></i>
            </a>
            <a href='https://www.instagram.com/nextzeni/' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram icon'></i>
            </a>
            <a href='https://x.com/next_zeni' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-twitter icon'></i>
            </a>
            <a href='https://www.youtube.com/@NextZeni' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube icon'></i>
            </a>
            <a href='https://www.linkedin.com/company/nextzeni/?viewAsMember=true' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin-in icon'></i>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
