import React from 'react';
import Form2 from '../common/Form2';
import Headline2 from '../common/Headline2';
import WidgetWrapper2 from '../common/WidgetWrapper2';

const Contact3 = ({ header, form, id, hasBackground = false }) => (
  <WidgetWrapper2 id={id ? id : ''} hasBackground={hasBackground} containerClass="max-w-7xl mx-auto">
    {header && <Headline2 header={header} titleClass="text-3xl sm:text-5xl" />}
    <div className="flex items-stretch justify-center">
      <Form2 {...form} containerClass="card2 h-fit max-w-2xl mx-auto p-5 md:p-12" btnPosition="right" />
    </div>
  </WidgetWrapper2>
);

export default Contact3;
