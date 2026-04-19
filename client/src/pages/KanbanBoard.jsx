import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

const initialColumns = [
    {
        id: "todo",
        title: "To Do",
        tasks: [
            { id: "t-1", text: "Create auth API" },
            { id: "t-2", text: "Design onboarding flow" },
        ],
    },
    {
        id: "in-progress",
        title: "In Progress",
        tasks: [{ id: "t-3", text: "Build drag-and-drop cards" }],
    },
    {
        id: "done",
        title: "Done",
        tasks: [
            { id: "t-4", text: "Set up Vite + Tailwind" },
            { id: "t-5", text: "Create Register page" },
        ],
    },
];

export default function KanbanBoard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [columns, setColumns] = useState(initialColumns);
    const [inputByColumn, setInputByColumn] = useState({
        todo: "",
        "in-progress": "",
        done: "",
    });
    const [draggedTask, setDraggedTask] = useState(null);

    const addTask = (columnId) => {
        const value = (inputByColumn[columnId] || "").trim();
        if (!value) return;

        const newTask = {
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            text: value,
        };

        setColumns((prev) =>
            prev.map((column) =>
                column.id === columnId
                    ? { ...column, tasks: [...column.tasks, newTask] }
                    : column,
            ),
        );

        setInputByColumn((prev) => ({ ...prev, [columnId]: "" }));
    };

    const moveTask = ({ taskId, fromColumnId, toColumnId }) => {
        if (!taskId || !fromColumnId || !toColumnId || fromColumnId === toColumnId) {
            return;
        }

        let taskToMove = null;

        const withoutTask = columns.map((column) => {
            if (column.id !== fromColumnId) return column;
            const nextTasks = column.tasks.filter((task) => {
                if (task.id === taskId) {
                    taskToMove = task;
                    return false;
                }
                return true;
            });
            return { ...column, tasks: nextTasks };
        });

        if (!taskToMove) return;

        setColumns(
            withoutTask.map((column) =>
                column.id === toColumnId
                    ? { ...column, tasks: [...column.tasks, taskToMove] }
                    : column,
            ),
        );
    };

    const handleDrop = (toColumnId) => (e) => {
        e.preventDefault();

        let payload = draggedTask;
        const raw = e.dataTransfer.getData("text/plain");
        if (raw) {
            try {
                payload = JSON.parse(raw);
            } catch {
                payload = draggedTask;
            }
        }

        if (payload) {
            moveTask({ ...payload, toColumnId });
        }

        setDraggedTask(null);
    };

    return (
        <div className="min-h-screen bg-[#f5f0e8] md:flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="flex-1 p-6 md:p-10">
                <div className="mb-5 md:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#fdf8f2] px-3 py-2 text-sm font-medium text-[#3b2e1e] border border-[rgba(180,155,115,0.2)]"
                    >
                        <Menu size={16} />
                        Menu
                    </button>
                </div>

                <div className="mb-8">
                    <h1 className="font-bold text-3xl text-[#2c1f0e] mb-1">Kanban Board</h1>
                    <p className="text-[#9a8570]">Track progress across your current sprint.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {columns.map((column) => (
                        <section
                            key={column.id}
                            className="rounded-3xl bg-[#fdf8f2] border border-[rgba(180,155,115,0.2)] p-4"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop(column.id)}
                        >
                            <h2 className="text-sm font-semibold text-[#8a7560] mb-4 uppercase tracking-wide">
                                {column.title}
                            </h2>

                            <div className="mb-4 flex gap-2">
                                <input
                                    type="text"
                                    value={inputByColumn[column.id] || ""}
                                    onChange={(e) =>
                                        setInputByColumn((prev) => ({
                                            ...prev,
                                            [column.id]: e.target.value,
                                        }))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") addTask(column.id);
                                    }}
                                    placeholder="Add a task"
                                    className="flex-1 rounded-xl bg-[#f5f0e8] px-3 py-2 text-sm outline-none border border-transparent focus:border-[#c9a96e]"
                                />
                                <button
                                    type="button"
                                    onClick={() => addTask(column.id)}
                                    className="rounded-xl px-3 py-2 text-sm text-white bg-gradient-to-br from-[#c9a96e] to-[#a07840]"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="space-y-3">
                                {column.tasks.map((task) => (
                                    <article
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) => {
                                            const payload = {
                                                taskId: task.id,
                                                fromColumnId: column.id,
                                            };
                                            setDraggedTask(payload);
                                            e.dataTransfer.effectAllowed = "move";
                                            e.dataTransfer.setData("text/plain", JSON.stringify(payload));
                                        }}
                                        className="rounded-2xl bg-[#f5f0e8] p-3 text-sm text-[#3b2e1e]"
                                    >
                                        {task.text}
                                    </article>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}
