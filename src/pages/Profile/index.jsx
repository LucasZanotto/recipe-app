import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const Profile = () => {
  const history = useHistory();
  const emailInfo = localStorage.getItem('user');
  return (
    <>
      <Header />
      <h1 data-testid="profile-email">{emailInfo}</h1>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <br />
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <br />
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          history.push('/');
          localStorage.clear();
        } }
      >
        Logout
      </button>
      <Footer />
    </>
  );
};

export default Profile;
