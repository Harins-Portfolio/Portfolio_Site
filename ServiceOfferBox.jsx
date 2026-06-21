import React from 'react';

const ServiceOfferBox = ({ stepLabel, title, clientBenefit, deliverables }) => {
  return (
    <div className="border-2 border-[#0F172A] p-5 rounded-lg bg-white w-full">
      <span className="inline-block px-2 py-1 text-xs font-bold rounded-md bg-gray-200 text-gray-800">
        {stepLabel}
      </span>
      <h3 className="text-base font-extrabold text-[#0F172A] mt-2">{title}</h3>
      <div className="bg-[#F4F1DE] px-3 py-2 rounded-md w-full my-2">
        <p className="text-sm text-[#0F172A]">
          <span className="font-bold">What you get: </span>
          {clientBenefit}
        </p>
      </div>
      <ul className="flex flex-col items-start space-y-1 w-full">
        {deliverables.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="text-[#0F172A] text-sm">
              <i className="ri-check-line"></i> {/* Assuming Remix Icon classes */}
            </span>
            <p className="text-sm text-[#334155]">{item}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceOfferBox;