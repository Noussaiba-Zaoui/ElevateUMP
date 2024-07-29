import React from 'react';

// Hero data on Pricing page *******************
export const heroPricing = {
  title: 'Espace Projet',
  subtitle: (
    <>
      <span className="hidden md:inline">
        {`Bienvenue sur votre espace projet ! Vous êtes au bon endroit pour gérer et explorer vos projets en toute simplicité.`}
      </span>{' '}
    </>
  ),
  tagline: '',
};

// Pricing data on Pricing page *******************
export const pricingPricing = {
  id: 'pricing-on-pricing',
  hasBackground: true,
  header: {
    title: 'Projets créés',
    subtitle: (
      <>
        Voici la liste de vos projets créés.{' '}
        <span className="hidden md:inline">{`Vous pouvez les explorer et les gérer selon vos besoins.`}</span>
      </>
    ),
  },
  header2: {
    title: 'Projets créés',
    subtitle: (
      <>
        Aucun projet n'est créé pour le moment.{' '}
      </>
    ),
  },
  prices: [
    {
      title: 'Projet 1',
      isSelected: false,
      callToAction: {
        targetBlank: true,
        text: 'Modifier',
        href: '/',
      },
      callToAction2: {
        targetBlank: true,
        text: 'Supprimer',
        href: '/',
      },
      hasRibbon: true,
    },
    {
      title: 'Projet 2',
      isSelected: true,
      callToAction: {
        targetBlank: true,
        text: 'Modifier',
        href: '/',
      },
      callToAction2: {
        targetBlank: true,
        text: 'Supprimer',
        href: '/',
      },
      hasRibbon: true,
    },
    {
      title: 'Projet 3',
      isSelected: true,
      callToAction: {
        targetBlank: true,
        text: 'Modifier',
        href: '/',
      },
      callToAction2: {
        targetBlank: true,
        text: 'Supprimer',
        href: '/',
      },
      hasRibbon: true,
    },
    {
      title: 'Projet 4',
      isSelected: false,
      callToAction: {
        targetBlank: true,
        text: 'Modifier',
        href: '/',
      },
      callToAction2: {
        targetBlank: true,
        text: 'Supprimer',
        href: '/',
      },
      hasRibbon: true,
    },
    {
      title: 'Projet 5',
      isSelected: false,
      callToAction: {
        targetBlank: true,
        text: 'Modifier',
        href: '/',
      },
      callToAction2: {
        targetBlank: true,
        text: 'Supprimer',
        href: '/',
      },
      hasRibbon: true,
    },
    {
      title: 'Projet 6',
      isSelected: true,
      callToAction: {
        targetBlank: true,
        text: 'Modifier',
        href: '/',
      },
      callToAction2: {
        targetBlank: true,
        text: 'Supprimer',
        href: '/',
      },
      hasRibbon: true,
    },
  ],
};
