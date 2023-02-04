import Tooltip from './components/Tooltip';

function App() {

  return (
    <div className='m-auto w-[500px] pt-5 text-center flex flex-col gap-2'>
      <div>
        <Tooltip content="Hello" trigger='click' placement='left'>
          <button className="p-2 px-3 bg-blue-700 text-white">Button</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Hello world" placement='top'>
          <button className="p-2 px-3 bg-blue-700 text-white">Button</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Hello world" placement='bottom'>
          <button className="p-2 px-3 bg-blue-700 text-white">Button</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Hello world" placement='right'>
          <button className="p-2 px-3 bg-blue-700 text-white">Button</button>
        </Tooltip>
      </div>
      <div>
        <Tooltip content="Hello world" placement='left'>
          <button className="p-2 px-3 bg-blue-700 text-white">Button</button>
        </Tooltip>
      </div>
    </div>
  );
}

export default App;
