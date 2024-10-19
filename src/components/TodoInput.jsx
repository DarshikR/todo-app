import { useState } from "react";

export function TodoInput(props) {
    const { handleAddTodo, isEditing, isEnterPressed } = props;
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false); // Track input focus

    return (
        <div className="input-container">
            <div className="for-pill">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            if (!inputValue) {return}
                            handleAddTodo(inputValue);
                            setInputValue('');
                        }
                    }}
                    placeholder="Add task"
                    disabled={isEditing}
                    onFocus={() => setIsFocused(true)}  // Set focus state to true when input is focused
                    onBlur={() => setIsFocused(false)}   // Set focus state to false when input loses focus
                />
                <p className={`pill pill--key ${isEnterPressed ? 'pill--key-pressed' : ''}`}>
                    Enter
                </p>
            </div>
            <button
                className={`${isFocused && isEnterPressed ? 'enter--key-pressed' : ''}`} // Apply class only when input is focused and Enter is pressed
                onClick={() => {
                    if (!inputValue) {return}
                    handleAddTodo(inputValue);
                    setInputValue('');
                }}
                disabled={isEditing}
            >
                <i style={{ margin: '10.5px 0' }} className="fa-solid fa-plus"></i>
            </button>
        </div>
    );
}
