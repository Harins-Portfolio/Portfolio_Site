import React from 'react';

const ConsultingSection = () => {
  return (
    <section id="consulting" className="bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold">How it works</h2>
        <p className="mt-2 text-gray-600">Describe a task, name a price — I accept or reject. Fast, fixed-price engagements for clear outcomes.</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">You describe the task</h3>
            <p className="text-gray-600 mt-2">One clear problem and sample data is enough to start.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">You name a price</h3>
            <p className="text-gray-600 mt-2">Propose an amount you're willing to pay for the deliverable.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">I accept or reject</h3>
            <p className="text-gray-600 mt-2">If accepted, I'll confirm timeline and start work; if not, you keep control.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingSection;
