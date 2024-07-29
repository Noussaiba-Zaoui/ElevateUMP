import * as Icons from '@tabler/icons-react';
import { useState } from 'react';

const  { IconClock, IconHeadset, IconHelp, IconMapPin, IconMessages, IconPhoneCall } = Icons;
// Hero data on Contact page *******************
export const heroContact = {
  title: 'Candidature en P2E',
  subtitle: (
    <>
      <span className="hidden md:inline">{`Veuillez noter que seul le chef de projet est requis pour remplir ce formulaire.`}</span>{' '}
      {`Les champs marqués d'un astérisque (*) sont obligatoires et doivent être remplis pour soumettre le formulaire.`}
    </>
  ),
  tagline: 'Page de Candidature',
};

// Contact data on Contact page *******************
export const contact2Contact = {
  id: 'contactTwo-on-contact',
  hasBackground: true,
  header: {
    title: 'Page de candidature',
    subtitle: (
      <>
        Veuillez prendre quelques instants pour remplir ce formulaire de candidature.{' '}
        <span className="hidden md:inline">{`afin que nous puissions mieux comprendre vos intérêts et commencer le processus en toute fluidité.`}</span>
      </>
    ),
  },
  items: [
    {
      title: 'Our Address',
      description: ['1230 Maecenas Street Donec Road', 'New York, EEUU'],
      icon: Icons.IconMapPin,
    },
    {
      title: 'Contact',
      description: ['Mobile: +1 (123) 456-7890', 'Mail: tailnext@gmail.com'],
      icon: Icons.IconPhoneCall,
    },
    {
      title: 'Working hours',
      description: ['Monday - Friday: 08:00 - 17:00', 'Saturday & Sunday: 08:00 - 12:00'],
      icon: Icons.IconClock,
    },
  ],
  form: {
    title: 'Prêt à commencer ?',
    inputs: [
      {
        type: 'email',
        label: 'E-mail *',
        name: 'email',
        autocomplete: 'on',
        placeholder: 'Entrer votre email',
      },
      {
        type: 'text',
        label: 'Intitule du projet *',
        name: 'intituleProjet',
        autocomplete: 'on',
        placeholder: 'Intitule Projet',
      },
      {
        type: 'text',
        label: 'Nom & prenom *',
        name: 'nomPrenom',
        autocomplete: 'on',
        placeholder: 'Nom Prenom',
      },
      {
        type: 'text',
        label: 'Telephone portable *',
        name: 'telephonePortable',
        autocomplete: 'on',
        placeholder: 'Numéro de Telephone',
      },
      {
        type: 'text',
        label: 'Diplôme *',
        name: 'diplome',
        autocomplete: 'on',
        placeholder: 'Diplome',
      },
      {
        type: 'text',
        label: 'Originalité *',
        name: 'originalite',
        autocomplete: 'on',
        placeholder: 'Originalité',
      },
      {
        type: 'text',
        label: 'Filiere *',
        name: 'filiere',
        autocomplete: 'on',
        placeholder: 'Filiere',
      },
    
    ],
    selectInputs: [
      {
        label: 'Ville d’origine *',
        name: 'villeOrigine',
        options: [
          { label: 'Paris', value: 'Paris' },
          { label: 'Lyon', value: 'Lyon' },
          { label: 'Marseille', value: 'Marseille' },
        ],
      },
      {
        label: 'Etablissement *',
        name: 'etablissement',
        options: [
          { label: 'Université A', value: 'Université A' },
          { label: 'Université B', value: 'Université B' },
          { label: 'Université C', value: 'Université C' },
        ],
      },
    ],
    textareas: [
      {
        cols: 30,
        rows: 5,
        label: "l'idée de l'entreprise *",
        name: 'ideeEntreprise',
        placeholder: 'Idée Entreprise...',
      },
      {
        cols: 30,
        rows: 5,
        label: 'Noms & Prénoms autres *',
        name: 'members',
        placeholder: 'Noms & Prénoms...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Domaine du projet de l'entreprise *",
        name: 'domaineProjetEntreprise',
        placeholder: 'Domaine du projet...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Motivations *",
        name: 'motivations',
        placeholder: 'Motivations...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Développez votre idée *",
        name: 'developpezVotreIdee',
        placeholder: 'Idée...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Innovation technologique et/ou dans les services offerts *",
        name: 'innovationTechnologique',
        placeholder: 'Innovation...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Viabilité et durabilité du projet *",
        name: 'viabiliteDurableteProjet',
        placeholder: 'Viabilité...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Impact économique du projet *",
        name: 'impactEconomique',
        placeholder: 'Impact...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Responsabilités sociale et environnementale *",
        name: 'responsabilitesSocialesEnvironnementales',
        placeholder: 'Responsabilités...',
      },
      {
        cols: 30,
        rows: 5,
        label: "Pérennité : potentiel de développement *",
        name: 'perennitePotentielDeveloppement',
        placeholder: 'Pérennité...',
      },
    ],
    scanStudentCards: {
      label: "Enregistrer vos carte d'étudiant *",
      name: 'scanCarteEtudiant',
    },
   // scanStudentCardImage: null, // Initialisation de l'image scannée
    btn: {
      title: 'Enregistrer',
      type: 'submit',
    },
  },
};

// Feature2 data on Contact page *******************
export const features2Contact = {
  columns: 3,
  header: {
    title: 'Support Center',
    subtitle: 'Looking for something in particular?',
  },
  items: [
    {
      title: 'Have a question?',
      description: 'See our frequently asked questions',
      icon: Icons.IconHelp,
      callToAction: {
        text: 'Go to FAQ page',
        href: '/faqs',
      },
    },
    {
      title: 'Chat with us',
      description: 'Live chat with our support team',
      icon: Icons.IconMessages,
      callToAction: {
        text: 'Write to us',
        href: '/',
      },
    },
    {
      title: 'Get help',
      description: 'Speak to our team today',
      icon: Icons.IconHeadset,
      callToAction: {
        text: 'Call us',
        href: '/',
      },
    },
  ],
};
