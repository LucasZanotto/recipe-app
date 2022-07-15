import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcons from '../../images/profileIcon.svg';
import searchProfileIcon from '../../images/searchIcon.svg';
import SearchBar from './components/SearchBar';

export default function Header() {
  const [isSearch, setIsSearch] = useState(false);
  const isLocation = useLocation();
  const history = useHistory();
  const pageNames = { '/foods': 'Foods', '/drinks': 'Drinks', '/profile': 'Profile' };

  return (
    <div>
      <h1 data-testid="page-title">{pageNames[isLocation.pathname]}</h1>
      <button type="button" onClick={ () => history.push('/profile') }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcons }
          alt="Icone"
        />
      </button>
      {
        (isLocation.pathname !== '/profile') && (
          <button type="button" onClick={ () => setIsSearch(!isSearch) }>

            <img
              data-testid="search-top-btn"
              src={ searchProfileIcon }
              alt=""
            />
          </button>
        )
      }

      {
        isSearch && (
          <SearchBar />
        )
      }

    </div>
  );
}
