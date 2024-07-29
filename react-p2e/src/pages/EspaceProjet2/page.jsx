import React from 'react';
import Hero from '../../components/Widgets/Hero';
import PricingCondidat from '../../components/Widgets/PricingCondidat';
import Pricing2 from '../../components/Widgets/Pricing2';
import { heroPricing, pricingPricing } from '../../components/shared/data/pages/pricing.data';
import { pricingPricing2 } from '../../components/shared/data/pages/pricing2.data';
import "../../styles/espaceProjet.css"

const Page = () => {
  return (
    <>
      <Hero {...heroPricing} />
      <PricingCondidat {...pricingPricing} />
      <Pricing2 {...pricingPricing2} />
    </>
  );
};

export default Page;
