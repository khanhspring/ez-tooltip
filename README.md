### Installation

```
npm install ez-tooltip
```

or

```
yarn add ez-tooltip
```

### Usage

#### 1. Import the CSS file to set default styling

```
@import url('/node_modules/ez-tooltip/dist/index.css');
```

#### 2. Import ez-tooltip after installation

```
import { Tooltip } from "ez-tooltip";
```

#### 3. Use Tooltip component to wrap another component that you want show the tooltip

```
<Tooltip
    content="Click to submit form"
    placement="bottom"
    className="bg-slate-400 text-slate-900"
    arrowClassName="border-slate-400"
>
    <button>Submit</button>
</Tooltip>
```

### Options

- content: the tooltip content
- placement: top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end
- trigger: click, hover
- className: custom class name for the tooltip
- arrowClassName: custom class name for the arrow
