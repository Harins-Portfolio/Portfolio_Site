import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-start w-full">
      <h1 className="text-3xl font-extrabold text-[#0F172A]">Get In Touch</h1>
      <p className="text-base text-[#475569] mb-6">
        Let's talk business analytics, operational strategy, or project collaborations.
      </p>

      <div className="flex flex-col items-start w-full max-w-lg bg-white border-2 border-[#0F172A] p-8 rounded-xl shadow-[5px_5px_0px_#0F172A] mb-16">
        <label htmlFor="name" className="text-sm font-bold text-[#0F172A] mb-1">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Your Name"
          className="w-full border border-[#0F172A] p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
        />

        <label htmlFor="email" className="text-sm font-bold text-[#0F172A] mb-1">Business Email</label>
        <input
          type="email"
          id="email"
          placeholder="name@company.com"
          className="w-full border border-[#0F172A] p-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
        />

        <label htmlFor="inquiries" className="text-sm font-bold text-[#0F172A] mb-1">Project Focus / Inquiries</label>
        <textarea
          id="inquiries"
          placeholder="What operational challenges can we look into?"
          rows="5"
          className="w-full border border-[#0F172A] p-2 rounded-md mb-5 focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
        ></textarea>

        <button className="bg-[#0F172A] text-white font-bold w-full py-2 px-4 rounded-md hover:bg-[#1E293B] transition-colors duration-200">
          Initiate Consultation
        </button>
      </div>
    </div>
  );
};

export default Contact;