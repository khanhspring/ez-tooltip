import React from 'react';
import Tooltip from './components/Tooltip';

function App() {

  const content = (
    <>
      <p><strong>Drag</strong> to move</p>
      <p><strong>Click</strong> to open menu</p>
    </>
  )

  return (
    <div className="w-[500px] m-auto text-center p-10 bg-slate-800">
      <Tooltip
        content={content}
        trigger='hover'
        placement='bottom'
        className="bg-red-500 text-slate-100"
        arrowClassName="border-red-500"
        spacing={5}
        hideArrow
      >
        <button className='bg-blue-700 p-2 text-white'>Button</button>
      </Tooltip>
    </div>
  );
}

export default App;
