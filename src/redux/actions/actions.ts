import { Modal } from 'src/components/shared/modals/types.modals';
import { IQuickListExercise, IQuickListStoreCard, PageDataType } from '../reducer/reducer';

export const types = {
    ACTIVE_SIDEBAR: 'ACTIVE_SIDEBAR',
    NEW_MODAL: 'NEW_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
    SET_PAGE_DATA: 'SET_PAGE_DATA',
    SET_DIRTY_FORM: 'SET_DIRTY_FORM',
    ACTIVE_TAB: 'ACTIVE_TAB',
    SET_CHAT_KEY: 'SET_CHAT_KEY',
    SET_SORT_ITEMS: 'SET_SORT_ITEMS',
    UPDATE_CHAT_COUNT: 'UPDATE_CHAT_COUNT',
    RESET_CHAT_COUNT: 'RESET_CHAT_COUNT',
    SET_BOARD_EXERCISE: 'SET_BOARD_EXERCISE',
    ADD_BOARD_EXERCISE: 'ADD_BOARD_EXERCISE',
    REMOVE_BOARD_EXERCISE: 'REMOVE_BOARD_EXERCISE',
    ADD_STORE_CARD: 'ADD_STORE_CARD',
    REMOVE_STORE_CARD: 'REMOVE_STORE_CARD',
    SET_STORE_CARD: 'SET_STORE_CARD'
};

export function setSortItems(sort: string) {
    return {
        type: types.SET_SORT_ITEMS,
        payload: sort
    };
}

export function activeSideBar(mustActive: boolean) {
    return {
        type: types.ACTIVE_SIDEBAR,
        payload: mustActive
    };
}

export function activeTab(tabName: string) {
    return {
        type: types.ACTIVE_TAB,
        payload: tabName
    };
}

export function newModal(modal: Partial<Modal>) {
    return {
        type: types.NEW_MODAL,
        payload: modal
    };
}

export function setChatKey(key: any) {
    return {
        type: types.SET_CHAT_KEY,
        payload: key
    };
}

export function closeModal(id: string) {
    return {
        type: types.CLOSE_MODAL,
        payload: id
    };
}

export function updateChatCount() {
    return {
        type: types.UPDATE_CHAT_COUNT
    };
}

export function resetChatCount() {
    return {
        type: types.RESET_CHAT_COUNT
    };
}

export function setPageData(pageData: { pageData: PageDataType, type: string}) {
    return {
        type: types.SET_PAGE_DATA,
        payload: pageData
    };
}

export function setIsDirtyForm(isDirty: boolean) {
    return {
        type: types.SET_DIRTY_FORM,
        payload: isDirty
    };
}

export function setStoreCard(storeCard: []) {
    return {
        type: types.SET_STORE_CARD,
        payload: storeCard
    };
}

export function addStoreCard(product: IQuickListStoreCard['storeCard'][number]) {
    return {
        type: types.ADD_STORE_CARD,
        payload: product
    };
}
export function removeStoreCard(productId: number) {
    return {
        type: types.REMOVE_STORE_CARD,
        payload: productId
    };
}

export function setBoardExercise(exercises: []) {
    return {
        type: types.SET_BOARD_EXERCISE,
        payload: exercises
    };
}

export function addBoardExercise(exercise: IQuickListExercise['exerciseBoard'][number]) {
    return {
        type: types.ADD_BOARD_EXERCISE,
        payload: exercise
    };
}
export function removeBoardExercise(exerciseId: number) {
    return {
        type: types.REMOVE_BOARD_EXERCISE,
        payload: exerciseId
    };
}
