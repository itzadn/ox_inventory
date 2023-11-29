import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { onRename } from '../../dnd/onRename';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const [, rename] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onRename(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>

    {/* <button className="inventory-control-button" ref={use}>
      {Locale.ui_use || 'Use'}
    </button>
    <button className="inventory-control-button" ref={give}>
      {Locale.ui_give || 'Give'}
    </button>
    <button className="inventory-control-button" onClick={() => fetchNui('exit')}>
      {Locale.ui_close || 'Close'}
    </button> */}

    <div className="inventory-control flex items-center justify-center px-3">
      <div className="grid grid-cols-1 gap-2.5">
        <input className="w-28 2k:w-32 4k:w-40 px-1 py-2.5 2k:py-4 4k:py-6 2k:text-xl 4k:text-3xl bg-dark border-zinc-700 bg-opacity-80 rounded-md text-center mb-8 focus:outline-none hover:border-gray-500 border border-transparent focus:border-indigo-400 transition-colors duration-300" type="number" defaultValue={itemAmount} onChange={inputHandler} />

        <div className='flex items-center justify-between flex-col space-y-3'>
          <button className='inventory-control__button inventory-control__button--use' ref={use}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 11v-3.5a1.5 1.5 0 0 1 3 0v2.5"></path>
              <path d="M11 9.5v-3a1.5 1.5 0 0 1 3 0v3.5"></path>
              <path d="M14 7.5a1.5 1.5 0 0 1 3 0v2.5"></path>
              <path d="M17 9.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path>
            </svg>
          </button>

          <button className='inventory-control__button' ref={give}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M21 17l-18 0"></path>
              <path d="M6 10l-3 -3l3 -3"></path>
              <path d="M3 7l18 0"></path>
              <path d="M18 20l3 -3l-3 -3"></path>
            </svg>
          </button>

          <button className='inventory-control__button' ref={rename}>
              <svg width="24" height="24" viewBox="0 0 1024 1024" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M64 800H53.76a31.36 31.36 0 0 1-19.84-40.32l128-384A32.64 32.64 0 0 1 192 352a32.64 32.64 0 0 1 30.08 21.76l128 384a32 32 0 1 1-60.16 20.48L192 485.12l-97.92 293.12a30.72 30.72 0 0 1-30.08 21.76z" fill="#FFFFFF"></path>
                <path d="M256 672H128a32 32 0 0 1 0-64h128a32 32 0 0 1 0 64zM768 768h-96a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32H768a128 128 0 0 1 0 256z m-64-64h64a64 64 0 0 0 0-128h-64z" fill="#FFFFFF"></path>
                <path d="M832 960h-160a32 32 0 0 1-32-32v-192a32 32 0 0 1 32-32H832a128 128 0 0 1 0 256z m-128-64h128a64 64 0 0 0 0-128h-128zM773.76 434.56a32 32 0 0 1-21.12-7.68l-96-85.12a31.36 31.36 0 0 1 0-44.8 32.64 32.64 0 0 1 45.44 0l71.68 64 64-71.68a31.36 31.36 0 0 1 44.8 0 32.64 32.64 0 0 1 0 45.44l-84.48 96a33.92 33.92 0 0 1-22.4 10.88z" fill="#FFFFFF"></path>
                <path d="M768 384a32 32 0 0 1-32-32 224 224 0 0 0-432-83.84 32 32 0 0 1-58.88-24.32A288 288 0 0 1 800 352a32 32 0 0 1-32 32z" fill="#FFFFFF"></path>
              </svg>
          </button>

          <button className='inventory-control__button inventory-control__button--close' onClick={() => fetchNui('exit')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

export default InventoryControl;
