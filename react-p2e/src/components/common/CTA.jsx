import React from 'react';

const CTA = ({ callToAction, containerClass, linkClass, iconClass }) => {
  const { text, href, icon: Icon, targetBlank } = callToAction;

  return (
    <>
      {href && (text || Icon) && (
        <div className={`flex w-auto cursor-pointer ${containerClass}`}>
          {targetBlank ? (
            <a
              className={`inline-flex items-center justify-center w-full sm:mb-0 ${linkClass}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Icon && (
                <Icon className={`w-5 h-5 ${text ? 'mr-1 -ml-1.5 rtl:ml-1 rtl:-mr-1.5' : ''} ${iconClass}`} />
              )}
              {text}
            </a>
          ) : (
            <a className={`inline-flex items-center justify-center w-full sm:mb-0 ${linkClass}`} href={href}>
              {Icon && (
                <Icon className={`w-5 h-5 ${text ? 'mr-1 -ml-1.5 rtl:ml-1 rtl:-mr-1.5' : ''} ${iconClass}`} />
              )}
              {text}
            </a>
          )}
        </div>
      )}
    </>
  );
};

export default CTA;
