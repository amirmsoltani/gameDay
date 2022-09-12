import React, { FC, HTMLProps } from 'react';
import { SearchIconExercise } from 'src/assets/exercise/search-icon';
import { SearchInputWrapper } from './search-input-style';

type PropsType = HTMLProps<HTMLInputElement> & { wrapperClassName?: string };

const SearchInput: FC<PropsType> = ({ wrapperClassName, ...props }) => {
    return (
        <SearchInputWrapper className={wrapperClassName}>
            <SearchIconExercise />
            <span className="input-box__search-text">search |</span>
            <input className="input-box__input" {...props} />
        </SearchInputWrapper>
    );
};

export default SearchInput;
