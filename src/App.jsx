import { useEffect, useState } from "react"
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"


function App() {
  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: true },
  // ]

  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true, isEdited: false }
  ])
  const [selectedTab, setSelectedTab] = useState('Open')
  const [isEditing, setIsEditing] = useState(false); // Tracks if any todo is being edited

  const [isEnterPressed, setIsEnterPressed] = useState(false); // To track Enter key press globally

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { input: newTodo, complete: false, isEdited: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleEditTodo(index, newInput) {
    const newTodoList = [...todos];
    newTodoList[index].input = newInput; // Update the todo's input value
    newTodoList[index].isEdited = true; // Mark the todo as edited
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveEdit(index, newInput) {
    // Only update the todo if the input is different from the original
    if (newInput !== todos[index].input) {
      handleEditTodo(index, newInput); // Call existing handleEditTodo
    }
    setIsEditing(false); // Reset editing state
  }

  function handleCompleteTodo(index) {
    // update/edit/modify
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return }
    // console.log('here')
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

  // Add event listeners for keydown and keyup on mount and clean up on unmount
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        setIsEnterPressed(true); // Set the state when "Enter" is pressed
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        setIsEnterPressed(false); // Reset the state when "Enter" is released
      }
    };

    // Attach event listeners to the window object
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // Empty dependency array to run this effect only on mount/unmount

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList
        handleCompleteTodo={handleCompleteTodo}
        handleSaveEdit={handleSaveEdit}
        setIsEditing={setIsEditing}
        handleDeleteTodo={handleDeleteTodo}
        selectedTab={selectedTab}
        todos={todos}
        isEnterPressed={isEnterPressed} />
      <TodoInput handleAddTodo={handleAddTodo} isEditing={isEditing} isEnterPressed={isEnterPressed} />
    </>
  )
}

export default App
