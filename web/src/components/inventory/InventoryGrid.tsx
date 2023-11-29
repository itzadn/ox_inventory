import React, { useRef } from 'react';
import { Inventory } from '../../typings';
import WeightBar from '../utils/WeightBar';
import InventorySlot from './InventorySlot';
import { getTotalWeight } from '../../helpers';
import { useAppSelector } from '../../store';
import { useIntersection } from '../../hooks/useIntersection';
import UserIcon from '../utils/icons/UserIcon';
import StoreIcon from '../utils/icons/StoreIcon';
import ToolsIcon from '../utils/icons/TooltsIcon';
import BoxIcon from '../utils/icons/BoxIcon';

const PAGE_SIZE = 30;

const InventoryGrid: React.FC<{ inventory: Inventory }> = ({ inventory }) => {
  const weight = React.useMemo(
    () => (inventory.maxWeight !== undefined ? Math.floor(getTotalWeight(inventory.items) * 1000) / 1000 : 0),
    [inventory.maxWeight, inventory.items]
  );

  const weightPercent = React.useMemo(
    () => (inventory.maxWeight ? (weight / inventory.maxWeight) * 100 : 0),
    [weight]
  );

  const inventoryIcon = React.useMemo(
    () => {
      switch (inventory.type) {
        case 'player': return <UserIcon />;
        case 'shop': return <StoreIcon />;
        case 'crafting': return <ToolsIcon />;
        default: return <BoxIcon />;
      }
    },
    [inventory.type]
  );

  const [page, setPage] = React.useState(0);
  const containerRef = useRef(null);
  const { ref, entry } = useIntersection({ threshold: 0.5 });
  const isBusy = useAppSelector((state) => state.inventory.isBusy);

  React.useEffect(() => {
    if (entry && entry.isIntersecting) {
      setPage((prev) => ++prev);
    }
  }, [entry]);
  return (
    <>
      <div className="inventory-grid-wrapper col-span-3" style={{ pointerEvents: isBusy ? 'none' : 'auto' }}>
        <div className={`flex items-center ${inventory.label ? 'justify-between' : 'justify-end'}`}>
          {(inventory.type && inventory.label) && (
            <div className='pl-2 pr-4 py-2 rounded-md bg-light bg-opacity-60 font-semibold text-sm text-gray-300 inline-flex items-center space-x-3'>
              <div className='p-1.5 rounded-md bg-slate-50 bar-icon'>
                {inventoryIcon}
              </div>

              <span>{inventory.label}</span>
            </div>
          )}

          <div className="inline-flex items-center space-x-4 pl-2 pr-4 py-2 bg-light bg-opacity-60 rounded-md float-right">
            <div className='p-1.5 rounded-md bg-slate-50'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M6.835 9h10.33a1 1 0 0 1 .984 .821l1.637 9a1 1 0 0 1 -.984 1.179h-13.604a1 1 0 0 1 -.984 -1.179l1.637 -9a1 1 0 0 1 .984 -.821z"></path>
              </svg>
            </div>

            <div className='px-2 py-3 bg-gray-300 bg-opacity-20 rounded-md'>
              <div className='overflow-hidden rounded-md bg-zinc-700 h-2 w-24'>
                <div
                  className={`h-full transition-all duration-150 rounded-md ${weightPercent >= 90 ? 'bg-red-400' : 'bg-slate-200'}`}
                  style={{
                    width: `${weightPercent}%`,
                  }}
                />
              </div>
            </div>

            <div className='text-sm text-gray-300'>
              <p>
                {inventory.maxWeight ? `${Number((weight / 1000).toFixed(2))}/${inventory.maxWeight / 1000} kg` : '∞ kg'}
              </p>
            </div>
          </div>
        </div>

        <div className="inventory-grid-container" ref={containerRef}>
          <>
            {inventory.items.slice(0, (page + 1) * PAGE_SIZE).map((item, index) => (
              <InventorySlot
                key={`${inventory.type}-${inventory.id}-${item.slot}`}
                item={item}
                ref={index === (page + 1) * PAGE_SIZE - 1 ? ref : null}
                inventoryType={inventory.type}
                inventoryGroups={inventory.groups}
                inventoryId={inventory.id}
              />
            ))}
          </>
        </div>
      </div>
    </>
  );
};

export default InventoryGrid;
