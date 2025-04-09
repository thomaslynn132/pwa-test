"use client"; // Use "use client" instead of "use server" for React components

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";
import InstallPWA from "@/components/InstallPWA";
import ShareApp from "@/components/ShareApp";

const Home = () => {
  const { todos, addTodo, toggleTodo, deleteTodo, newTodo, setNewTodo } =
    useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1"
            />
            <Button type="submit">Add</Button>
          </form>

          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                  />
                  <span
                    className={
                      todo.completed ? "line-through text-gray-500" : ""
                    }>
                    {todo.text}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(todo.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <InstallPWA />
      <ShareApp />
    </main>
  );
};

export default Home; // Export Home as the default export
