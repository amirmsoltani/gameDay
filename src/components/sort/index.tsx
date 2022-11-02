import React, { FC } from 'react';
import { ArrowDownBoldIcon } from 'src/assets/common/ArrowDownIcon';
import { SortEnumType } from 'src/graphql/generated';

type PropsType = {
    sortObject: { [key in string]: SortEnumType | object };
    name: string;
};

const Sort: FC<PropsType> = ({ name, sortObject }) => {
    switch (sortObject?.[name]) {
        case SortEnumType.Asc:
            return <ArrowDownBoldIcon style={{ width: 16 }} />;
        case SortEnumType.Desc:
            return <ArrowDownBoldIcon style={{ width: 16, transform: 'rotate(180deg)' }} />;
        default:
            return null;
    }
};

export default Sort;
