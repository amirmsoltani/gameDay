import { types } from 'src/redux/actions/actions';
import { Modal } from 'src/components/shared/modals/types.modals';


type State = {
    isSideBarActive: boolean;
    modals: Array<Modal>;
    chatCount: number;
};

const initialState:State = {
    isSideBarActive: false,
    modals: [] as Modal[],
    chatCount: 0,
};

export default function reducer(
    state: State = initialState,
    action: { type: string; payload: any }
): State {
    switch (action.type) {
        case types.ACTIVE_SIDEBAR:
            return {
                ...state,
                isSideBarActive: action.payload
            };
        case types.NEW_MODAL:
            action.payload.id = action.payload.id ?? `${Date.now()}-${state.modals.length}`;
            return {
                ...state,
                modals: [...state.modals, action.payload]
            };
        case types.CLOSE_MODAL:
            return {
                ...state,
                modals: state.modals.filter((modal) => modal.id !== action.payload)
            };
        case types.UPDATE_CHAT_COUNT:
            return {
                ...state,
                chatCount: state.chatCount + 1
            };
        case types.RESET_CHAT_COUNT:
            return {
                ...state,
                chatCount: 0
            };
        default:
            return state;
    }
}
