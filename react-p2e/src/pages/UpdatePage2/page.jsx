import React from 'react';

import Contact3 from '../../components/Widgets/Contact3';
import Hero from '../../components/Widgets/Hero';
import { heroContact, contact2Contact } from '../../components/shared/data/pages/contact.data';
import Navbar from '../../components/Navbar/NavbarCondidat';
import Footer from '../../components/Footer/FooterCondidat';

const Form = () => {
  return (
    <>
      <Navbar />
      <Hero {...heroContact} />
      <Contact3 {...contact2Contact} />
      <Footer />
    </>
  );
};

export default Form;
