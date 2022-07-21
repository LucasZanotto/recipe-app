import React, { useState } from 'react';
import PropTypes from 'prop-types';
import imageComp from '../../images/shareIcon.svg';
import './style.css';

const copy = require('clipboard-copy');

export default function ShareBtn(props) {
  const [shared, setShared] = useState(false);
  const numeroMagicos = 2000;
  const { url } = props;
  return (
    <div className="share-background">
      {
        shared
       && (
         <div className="alert-div">
           <p className="alert-link-copied">Link copied!</p>
         </div>
       )
      }
      <button
        className="share-btn"
        data-testid="share-btn"
        type="button"
        src={ imageComp }
        onClick={ () => {
          setShared(!shared);
          setTimeout(() => {
            setShared(false);
          }, numeroMagicos);
          copy(`http://localhost:3000${url}`);
        } }
      >
        <img src={ imageComp } alt="sla" />
      </button>
    </div>
  );
}
ShareBtn.propTypes = {
  url: PropTypes.string.isRequired,
};
