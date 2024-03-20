import Input from "./components/Input"
import TodoCard from "./components/TodoCard"

function App() {
  

  return (
    <div className="w-screen h-screen bg-blue-950 flex flex-col gap-4 items-center">
      <h1 className="text-4xl text-white mt-4">Manage your todo</h1>
      <div className="lg:w-1/3 md:max-w-screen-md flex flex-col items-center gap-8 mt-8">
        <Input/>
        <TodoCard/>
      </div>
    </div>
  )
}

export default App
