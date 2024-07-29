import React from 'react';
import Espace from './page';
import Navbar from '../../components/Navbar/NavbarCondidat';
import Footer from '../../components/Footer/FooterParticipant';
export default function Candidate() {
  return (
    <main>
       <Navbar />
      <Espace />
      <Footer />
    </main>
  );
}
