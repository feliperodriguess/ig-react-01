import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number
  title: string
  isComplete: boolean
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  function handleCreateNewTask() {
    const newTask = {
      id: getRandomInt(100),
      title: newTaskTitle,
      isComplete: false,
    }
    setTasks((state) => [...state, newTask])
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks((prevState) => {
      const updatedTasks = prevState.map((task) => {
        if (task.id === id) return { ...task, isComplete: !task.isComplete }
        return task
      })
      return updatedTasks
    })
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input type="text" placeholder="Adicionar novo todo" onChange={(e) => setNewTaskTitle(e.target.value)} value={newTaskTitle} />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask} disabled={!newTaskTitle}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task">
                <label className="checkbox-container">
                  <input type="checkbox" readOnly checked={task.isComplete} onClick={() => handleToggleTaskCompletion(task.id)} />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  )
}
