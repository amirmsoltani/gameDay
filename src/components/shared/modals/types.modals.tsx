export type Modal = {
    closeButton?: boolean;
    Body: React.FC<any>;
    Container?: React.FC<any>;
    id?: string;
    title?: string;
    callback?: any;
    navbarModal?: boolean;
    text?: string;
    onSubmit?: () => void;
    top?: number;
    canClose?: boolean;
    searchData?: any;
    hasSearch?: boolean;
    sideBarSearch?: boolean;
    topBar?: boolean;
    variables?: any;
};
