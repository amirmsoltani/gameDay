import { types } from 'src/redux/actions/actions';
import { Modal } from 'src/components/shared/modals/types.modals';
import { TableContainerProps } from '@/components/table_container/types.table.container';
import { GetAllExercisesQuery, GetAllProductsQuery } from 'src/graphql/generated';

export type PageDataType = Partial<
    TableContainerProps & { modalData?: any; sortData?: any; path: string }
>;

export interface IQuickListExercise {
    exerciseBoard: GetAllExercisesQuery['exercise_getExercises']['result']['items'] & Array<{
        equipment: number
    }>;
}

export interface IQuickListStoreCard {
    storeCard: GetAllProductsQuery['product_getProducts']['result']['items'];
}

type State = {
    isSideBarActive: boolean;
    modals: Array<Modal>;
    pageData: PageDataType;
    pageDataShop: PageDataType;
    pageDataExercise: PageDataType;
    pageDataFavorite: PageDataType;
    chatCount: number;
    exerciseBoard: IQuickListExercise['exerciseBoard'];
    storeCard: IQuickListStoreCard['storeCard']
};
export const initialPageData: PageDataType = {
    path: '',
    activePage: 1,
    searchData: {},
    sortData: { Sort: 'Sort' },
    dates: { DatePicker: {} } as any,
    showProfile: false,
    sessionItem: '',
    loading: false,
    searchdata: '',
    clientRequest: false
};

const initialState = {
    isSideBarActive: false,
    modals: [] as Modal[],
    pageData: initialPageData,
    pageDataShop: initialPageData,
    pageDataExercise: initialPageData,
    pageDataFavorite: initialPageData,
    isDirtyForm: false,
    activeTabName: 'is-not-in-dashboard',
    sortItems: '',
    chatCount: 0,
    exerciseBoard: [],
    storeCard: []
};

export default function reducer(
    state: State = initialState,
    action: { type: string; payload: any }
) {
    switch (action.type) {
        case types.ACTIVE_SIDEBAR:
            return {
                ...state,
                isSideBarActive: action.payload
            };
        case types.SET_SORT_ITEMS:
            return {
                ...state,
                sortItems: action.payload
            };
        case types.ACTIVE_TAB:
            return {
                ...state,
                activeTabName: action.payload
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
        case types.SET_CHAT_KEY:
            return {
                ...state,
                chatKey: action.payload
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
        case types.SET_PAGE_DATA:
            return {
                ...state,
                [action.payload.type]: action.payload.pageData as PageDataType
            };
        case types.SET_DIRTY_FORM:
            return {
                ...state,
                isDirtyForm: action.payload
            };
        case types.SET_BOARD_EXERCISE:
            return {
                ...state,
                exerciseBoard: action.payload
            };
        case types.SET_STORE_CARD:
            return {
                ...state,
                storeCard: action.payload
            };
        case types.ADD_BOARD_EXERCISE:
            if (
                state.exerciseBoard.findIndex(
                    (item) => item.exercise.id === action.payload.exercise.id
                ) > -1
            ) {
                return state;
            }

            return {
                ...state,
                exerciseBoard: [...state.exerciseBoard, action.payload]
            };
        case types.REMOVE_BOARD_EXERCISE:
            const exercises = state.exerciseBoard.filter(
                (item) => item.exercise.id !== action.payload
            );

            return {
                ...state,
                exerciseBoard: exercises
            };
        case types.ADD_STORE_CARD:
            if (
                state.storeCard.findIndex(
                    (item) => item.id === action.payload.id
                ) > -1
            ) {
                return state;
            }

            return {
                ...state,
                storeCard: [...state.storeCard, action.payload]
            };
        case types.REMOVE_STORE_CARD:
            const product = state.storeCard.filter(
                (item) => item.id !== action.payload
            );

            return {
                ...state,
                storeCard: product
            };
        default:
            return state;
    }
}
