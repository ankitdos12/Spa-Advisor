import React from 'react';
import SpaCard from './SpaCard';

const SpaList = ({ spas }) => {
  if (!spas || spas.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No spas available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {spas.map((spa) => (
        <SpaCard key={spa._id} spa={spa} />
      ))}
    </div>
  );
};

export default SpaList;