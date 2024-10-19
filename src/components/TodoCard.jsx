import { useState } from "react";

export function TodoCard(props) {
    const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo, handleEditTodo, setIsEditing, isEnterPressed } = props
    const [isEditingCard, setIsEditingCard] = useState(false); // Local state for individual todo editing
    // const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
    const [newInput, setNewInput] = useState(todo.input); // Local state to hold the new value
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
                        }}>
                            <h6>Delete</h6>
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="for-pill">
                        <input
                            type="text"
                            value={newInput}
                            onChange={(e) => setNewInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleEditTodo(todoIndex, newInput); // Save edited value
                                    setIsEditingCard(false); // Exit editing mode for this card
                                    setIsEditing(false); // Re-enable the TodoInput component
                                }
                            }}
                        />
                        <p className={`pill pill--key ${isEnterPressed ? 'pill--key-pressed' : ''}`}>Enter</p>
                    </div>
                    <div className="todo-buttons">
                        <button onClick={() => {
                            handleEditTodo(todoIndex, newInput); // Save edited value
                            setIsEditingCard(false); // Exit edit mode
                            setIsEditing(false); // Re-enable the TodoInput component
                        }}>Save</button>
                        <button onClick={() => setIsEditingCard(false)}>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}