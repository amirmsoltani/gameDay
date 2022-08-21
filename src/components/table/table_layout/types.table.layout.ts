import React, { HTMLAttributes, TdHTMLAttributes } from 'react';

interface Button extends HTMLAttributes<HTMLButtonElement> {
    label: string;
}

export type Column = {
    id: string;
    label?: string;
    search?: string;
    button?: Button;
    sort?: boolean;
    Component?: any;
    componentProps?: any;
};

export type TableLayoutProps = {
    columns: Column[];
    rows: Array<any>;
    onSearch?: (data: { column: Column; value: string }) => void;
    searchData?: any;
    isError?: boolean;
    onSort?: (data: { column: Column; direction: 'ASC' | 'DESC' }) => void;
    onChange?: (rows) => void;
    TD?: any;
    TR?: any;
};
