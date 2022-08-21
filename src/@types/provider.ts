import { Dispatch, SetStateAction } from 'react';
import { User } from './auth';

export type ElementalState = { user?: User; authError?: any };

export type ElementalContextProps = {
  state: ElementalState;
  setState?: Dispatch<SetStateAction<ElementalState>>;
};
