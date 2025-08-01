import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center h-full w-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-accent"></div>
  </div>
);

export default Spinner;