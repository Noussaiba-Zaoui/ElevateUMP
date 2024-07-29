import React from 'react';
import Contact2 from '../../components/Widgets/Contact2';
import Hero from '../../components/Widgets/Hero';
import { heroContact, contact2Contact } from '../../components/shared/data/pages/contact.data';

const Form = () => {
  return (
    <>
      <Hero {...heroContact} />
      <Contact2 {...contact2Contact} />
    </>
  );
};

export default Form;
