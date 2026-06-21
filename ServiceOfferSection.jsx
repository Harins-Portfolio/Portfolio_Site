import React from 'react';
import ServiceOfferBox from './ServiceOfferBox';

const ServiceOfferSection = ({ title, subtitle, offers }) => {
  return (
    <div className="flex flex-col items-start w-full mb-10">
      <h2 className="text-xl font-extrabold text-[#0F172A] mb-1">{title}</h2>
      <p className="text-sm text-[#64748B] mb-4">{subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {offers.map((offer, index) => (
          <ServiceOfferBox
            key={index}
            stepLabel={offer[0]}
            title={offer[1]}
            clientBenefit={offer[2]}
            deliverables={offer[3]}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceOfferSection;