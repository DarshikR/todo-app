import { useState } from "react";

export function TodoCard(props) {
    const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo, setIsEditing, isEnterPressed, handleSaveEdit, editInputRef, isSlashPressed } = props
    const [isEditingCard, setIsEditingCard] = useState(false); // Local state for individual todo editing
    // const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
    const [newInput, setNewInput] = useState(todo.input); // Local state to hold the new value
    const [isInputFocused, setIsInputFocused] = useState(false); // Track input focus in edit mode
    return (
        <div className="card todo-item">
            {!isEditingCard ? (
                <>
                    <p style={{
                        textDecoration: todo.complete ? 'line-through' : 'none'
                    }}>
                        {todo.input}
                        {todo.isEdited && <span style={{ marginLeft: '10px', color: 'green' }}>(Edited)</span>} {/* Show "Edited" label */}
                    </p>
                    <div className="todo-buttons">
                        <button onClick={() => {
                            handleCompleteTodo(todoIndex)
                        }} disabled={todo.complete}>
                            <h6>Done</h6>
                        </button>
                        <button onClick={() => {
                            setIsEditingCard(true); // Enable editing mode for this card
                            setIsEditing(true); // Disable the TodoInput component
                        }} disabled={todo.complete}>
                            <h6>Edit</h6>
                        </button>
                        <button onClick={() => {
                            handleDeleteTodo(todoIndex)
                            setIsEditingCard(false); // Exit editing mode for this card
                            setIsEditing(false); // Re-enable the TodoInput component
                        }}>
                            <h6>Delete</h6>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="for-pill">
                        <input
                            ref={editInputRef}
                            type="text"
                            value={newInput}
                            onChange={(e) => setNewInput(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    handleSaveEdit(todoIndex, newInput); // Save edited value
                                    setIsEditingCard(false); // Exit editing mode for this card
                                    setIsEditing(false); // Re-enable the TodoInput component
                                }
                            }}
                            onFocus={() => setIsInputFocused(true)}   // Set focus state to true when input is focused
                            onBlur={() => setIsInputFocused(false)}    // Set focus state to false when input loses focus
                        />
                        {!isInputFocused ? (
                            <p className={`pill pill--key ${isSlashPressed ? 'pill--key-pressed' : ''}`}>
                                /
                            </p>
                        ) : (
                            <p className={`pill pill--key ${isEnterPressed ? 'pill--key-pressed' : ''}`}>
                                Enter
                            </p>
                        )}
                    </div>
                    <div className="todo-buttons">
                        <button onClick={() => {
                            handleSaveEdit(todoIndex, newInput); // Save edited value
                            setIsEditingCard(false); // Exit edit mode
                            setIsEditing(false); // Re-enable the TodoInput component
                        }}>Save</button>
                        <button onClick={() => {
                            setIsEditingCard(false); // Exit editing mode for this card
                            setIsEditing(false); // Re-enable the TodoInput component
                        }}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}