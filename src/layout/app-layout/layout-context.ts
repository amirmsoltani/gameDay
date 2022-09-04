import { createContext, ReactNode } from 'react';

export type ContextType = {
    setChildren:(children:ReactNode)=>void;
};

export const LayoutContext = createContext<Partial<ContextType>>({});



