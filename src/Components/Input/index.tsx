import React, { useState } from 'react';

export interface Props {
    type: string;
    placeholder?: string;
    value?: string;
    className?: string;
    onChange?: (value: string) => void;
}

const Input = ({ type, placeholder = '', value = '', className = '', onChange }: Props) => {
    const [placeholderText, setPlaceholderText] = useState(placeholder);

    function handleOnChange(value: string) {
        if (onChange) {
            onChange(value);
        }
    }

    return <input type={type}
                  placeholder={placeholderText}
                  value={value}
                  className={className}
                  onFocus={() => setPlaceholderText('')}
                  onBlur={() => setPlaceholderText(placeholder)}
                  onChange={e => handleOnChange(e.target.value)}/>
};

export default Input;
