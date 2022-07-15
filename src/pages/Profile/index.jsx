import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

const Profile = () => {
  const sla = 'sla';
  return (
    <>
      <Header />
      <h1>Profile</h1>
      <h1>{sla}</h1>
      <Footer />
    </>
  );
};

export default Profile;
