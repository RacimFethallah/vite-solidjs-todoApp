function TodoForm(props: any) {
  return (
    <form class="my-4" onSubmit={props.addTodo}>
      <input
        value={props.title}
        onInput={(e) => props.setTitle(e.target.value)}
        type="text"
        placeholder="Add a new todo"
        class="p-2 border rounded mr-2"
      />
      <button class="bg-blue-500 text-white p-2 rounded">Add Todo</button>
    </form>
  );
}

export default TodoForm;
