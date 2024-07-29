import React from 'react';
import Form from './page';
import Navbar from '../../components/Navbar/NavbarParticipant';
import Footer from '../../components/Footer/FooterParticipant';

export default function Candidate() {
  return (
    <main>
      <Navbar />
      <Form />
      <Footer />
    </main>
  );
}
