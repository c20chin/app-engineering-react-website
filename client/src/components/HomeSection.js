import React from 'react';
import './HomeSection.css';
import { Link } from 'react-router-dom';


function HomeSection({
  bgimage,
  lightBg,
  lightText,
  headline,
  description,
  buttonLabel,
  imgStart,
  orgText,
  button,
  redirect,
}) {
  return (
    <>
    <div
        className={bgimage ? 'home__hero-section bgimage' : lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          <div
            className='row home__hero-row'
            style={{
              display: 'flex',
              flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
            }}
          >
            <div className='col'>
              <div className='home__hero-text-wrapper'>
                <h1 className={lightText ? 'heading' : orgText ? 'heading orange' : 'heading dark'}>
                  {headline}
                </h1>
              </div>
            </div>
            <div className='col'>
                <div class="home__hero-subtitle">
                    <p>{description}</p>
                </div>
                <Link to={redirect}>
                  <div class={button != null ? 'button' : 'btn-hidden'}>
                      <button class={buttonLabel != null ? 'btn' : 'btn-hidden'} /* class={button ? 'btn' : 'btn-hidden'} */>
                          {buttonLabel}
                      </button>
                  </div>
                </Link>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default HomeSection;