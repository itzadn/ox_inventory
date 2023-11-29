import React from 'react';

const WeightBar: React.FC<{ percent: number; durability?: boolean }> = ({ percent, durability }) => {
  const color = React.useMemo(
    () =>
      durability
        ? percent < 50
          ? 'bg-orange-600'
          : 'bg-green-400'
        : percent > 50
          ? 'bg-orange-600'
          : 'bg-green-400',
    [durability, percent]
  );

  return (
    <div className={`rounded-md mt-0.5 ${durability ? 'durability-bar' : 'weight-bar'}`}>
      <div
        className={`rounded-md ${color}`}
        style={{
          visibility: percent > 0 ? 'visible' : 'hidden',
          height: '100%',
          width: `${percent}%`,
          transition: `background ${0.3}s ease, width ${0.3}s ease`,
        }}
      ></div>
    </div>
  );
};
export default WeightBar;