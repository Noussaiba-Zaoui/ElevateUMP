import React from 'react';
import Form from '../common/Form';
import Headline from '../common/Headline';
import WidgetWrapper from '../common/WidgetWrapper';

const Contact2 = ({ header, form, id, hasBackground = false }) => (
  <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-7xl mx-auto">
    {header && <Headline header={header} titleClass="text-3xl sm:text-5xl" />}
    <div className="flex items-stretch justify-center">
      <Form {...form} containerClass="card2 h-fit max-w-2xl mx-auto p-5 md:p-12" btnPosition="right" />
    </div>
  </WidgetWrapper>
);

export default Contact2;
