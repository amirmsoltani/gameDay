import React, { FC, HTMLProps, useRef } from 'react';
import { ArrowDownBoldIcon } from 'src/assets/common/ArrowDownIcon';
import { InputWrapper } from './number-input-style';

type PropsType = Omit<HTMLProps<HTMLInputElement>, 'type'> & {
    wrapperClassName?: string;
    buttonWrapperClassName?: string;
    buttonClassName?: string;
    defaultValue?: number;
    step?: number;
    sign?: '%' | '$';
};

const NumberInput: FC<PropsType> = ({
    wrapperClassName,
    buttonWrapperClassName,
    buttonClassName,
    className,
    defaultValue = 0,
    step = 1,
    min,
    max,
    sign,
    onChange: inputOnChange,
    ...props
}) => {
    const input = useRef<HTMLInputElement>(null);

    const onChange = (action: 'increase' | 'decrease') => () => {
        const value = +input.current.value.replace(sign, '');
        if (action === 'increase' && (value + step <= max || max === undefined)) {
            input.current.value = value + step + (sign || '');
            // @ts-ignore

            props.onChange?.({ target: input.current });
        } else if (action === 'decrease' && (value - step >= min || min === undefined)) {
            input.current.value = value - step + (sign || '');
            // @ts-ignore
            props.onChange?.({ target: input.current });
        }
    };

    return (
        <InputWrapper className={wrapperClassName}>
            <input
                {...props}
                className={'number-input__input ' + className}
                type="text"
                defaultValue={defaultValue + (sign || '')}
                min={min}
                max={max}
                ref={input}
                onChange={(event) => {
                    let value = event.target.value;
                    value = value.replace(/[^0-9]+/g, '');
                    if (+value > 100) value = '100';
                    else if (+value < 0) value = '0';
                    event.target.value = value + '%';
                    inputOnChange?.(event);
                }}
                // disabled={!!sign}
            />
            <div className={buttonWrapperClassName + ' number-input__button-wrapper'}>
                <button
                    className={buttonClassName + ' number-input__button'}
                    onClick={onChange('increase')}>
                    <ArrowDownBoldIcon />
                </button>
                <button
                    className={buttonClassName + ' number-input__button'}
                    onClick={onChange('decrease')}>
                    <ArrowDownBoldIcon />
                </button>
            </div>
        </InputWrapper>
    );
};

export default NumberInput;
