const TRIGGERS = ['click' , 'hover'] as const;
export type Trigger = typeof TRIGGERS[number];