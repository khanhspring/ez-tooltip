const PLACEMENTS = ['top', 'bottom', 'left' , 'right'] as const;
export type Placement = typeof PLACEMENTS[number];

const TRIGGERS = ['click' , 'hover'] as const;
export type Trigger = typeof TRIGGERS[number];