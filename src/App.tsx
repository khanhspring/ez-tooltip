import React from 'react';
import Tooltip from './components/Tooltip';

function App() {

  const content = (
    <>
      <p><strong>Drag</strong> to move</p>
      <p><strong>Click</strong> to open menu</p>
    </>
  )

  const content2 = (
    <>
      <h1>Hello</h1>
    </>
  )

  const content3 = (
    <>
      <h1>Hello</h1>
    </>
  )

  return (
    <div className="w-[500px] m-auto text-center p-10 py-[200px] bg-slate-800">
      <Tooltip
        content={content}
        trigger='hover'
        placement='bottom'
        className="bg-red-500 text-slate-100"
        arrowClassName="border-red-500"
        spacing={5}
        hideArrow
        closeDelay={true}
        openDelay={0}
        clickToClose
      >
        <Tooltip
          content={content2}
          trigger='hover'
          placement='right'
          className="bg-red-500 text-slate-100"
          arrowClassName="border-red-500"
          spacing={5}
          hideArrow
          closeDelay={true}
          openDelay={0}
          clickToClose
        >
          <Tooltip
            content={content3}
            trigger='hover'
            placement='left'
            className="bg-red-500 text-slate-100"
            arrowClassName="border-red-500"
            spacing={5}
            hideArrow
            closeDelay={true}
            openDelay={0}
            clickToClose
          >
            <button className='bg-blue-700 p-2 text-white'>Button</button>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </div>
  );
}

export default App;
