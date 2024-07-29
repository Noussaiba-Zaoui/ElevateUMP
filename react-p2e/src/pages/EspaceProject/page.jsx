import React from 'react';

import Hero from '../../components/Widgets/Hero';
import Pricing from '../../components/Widgets/Pricing';
import "../../styles/espaceProjet.css"

import { heroPricing, pricingPricing } from '../../components/shared/data/pages/pricing.data';

const Page = () => {
  return (
    <>
      <Hero {...heroPricing} />
      <Pricing {...pricingPricing} />
    </>
  );
};

export default Page;
