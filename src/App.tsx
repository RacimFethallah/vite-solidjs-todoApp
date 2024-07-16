import { createStore } from "solid-js/store";
import "./App.css";
import { batch, createSignal, For } from "solid-js";
import TodoForm from "./components/TodoForm";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [title, setTitle] = createSignal<string>("");
  const [todos, setTodos] = createStore<Todo[]>([]);

  const addTodo = (e: SubmitEvent) => {
    e.preventDefault();
    batch(() => {
      setTodos([
        { id: todos.length + 1, title: title(), completed: false },
        ...todos,
      ]);
      setTitle("");
    });
  };

  return (
    <main class="flex flex-col items-center justify-center p-20">
      <div class=" max-w-xl mx-auto my-8 p-8 bg-white rounded-lg shadow">
        <h1 class="text-3xl font-bold mb-4 text-center text-black">
          Svelte Todo App
        </h1>

        <TodoForm title={title()} setTitle={setTitle} addTodo={addTodo} />

        <For each={todos}>
          {(todo) => (
            <div class="flex items-center justify-between p-2 border-b">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                      )
                    )
                  }
                  class="mr-2"
                />
                <span
                  class="text-black"
                  classList={{ "line-through": todo.completed }}
                >
                  {todo.title}
                </span>
              </div>
              <button
                onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                class="text-red-500"
              >
                Delete
              </button>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}

export default App;
