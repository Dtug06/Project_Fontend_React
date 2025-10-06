import { useState } from "react";
import TaskModal from "../components/TaskModal";
import { EllipsisOutlined } from "@ant-design/icons";
import ConfirmDeleteTask from "../components/ConfirmDeleteTask";
interface Task {
  id: number;
  name: string;
  assignee: string;
  priority: "Thấp" | "Trung bình" | "Cao";
  startDate: string;
  deadline: string;
  status: "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn";
  section: "To do" | "In Progress" | "Pending" | "Done";
}

const ProjectDetail = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      name: "Soạn thảo đề cương dự án",
      assignee: "An Nguyễn",
      priority: "Thấp",
      startDate: "02-24",
      deadline: "02-27",
      status: "Đúng tiến độ",
      section: "To do",
    },
    {
      id: 2,
      name: "Soạn thảo đề cương dự án",
      assignee: "An Nguyễn",
      priority: "Trung bình",
      startDate: "02-24",
      deadline: "02-27",
      status: "Có rủi ro",
      section: "To do",
    },
    {
      id: 3,
      name: "Soạn thảo đề cương dự án",
      assignee: "An Nguyễn",
      priority: "Cao",
      startDate: "02-24",
      deadline: "02-27",
      status: "Trễ hạn",
      section: "To do",
    },
    {
      id: 4,
      name: "Lên lịch họp kickoff",
      assignee: "An Nguyễn",
      priority: "Trung bình",
      startDate: "02-24",
      deadline: "02-27",
      status: "Có rủi ro",
      section: "In Progress",
    },
  ]);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleAddTask = () => {
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (newTask: any) => {
    if (selectedTask) {
      // Cập nhật nhiệm vụ
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? {
                ...t,
                name: newTask.name,
                assignee: newTask.assignee,
                section: newTask.status === "Done" ? "Done" : t.section,
                priority: newTask.priority as "Thấp" | "Trung bình" | "Cao",
                startDate: newTask.startDate,
                deadline: newTask.dueDate,
                status: newTask.progress as
                  | "Đúng tiến độ"
                  | "Có rủi ro"
                  | "Trễ hạn",
              }
            : t
        )
      );
    } else {
      // Thêm nhiệm vụ mới
      const newId = Math.max(...tasks.map((t) => t.id)) + 1;
      setTasks((prev) => [
        ...prev,
        {
          id: newId,
          name: newTask.name,
          assignee: newTask.assignee,
          priority: newTask.priority as "Thấp" | "Trung bình" | "Cao",
          startDate: newTask.startDate,
          deadline: newTask.dueDate,
          status: newTask.progress as "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn",
          section: newTask.status as
            | "To do"
            | "In Progress"
            | "Pending"
            | "Done",
        },
      ]);
    }
  };

  const handleDeleteTask = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa nhiệm vụ này không?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };
  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
      setTaskToDelete(null);
      setIsConfirmOpen(false);
    }
  };
  const renderPriority = (priority: Task["priority"]) => {
    switch (priority) {
      case "Thấp":
        return (
          <span className="bg-cyan-100 text-cyan-600 px-2 py-1 rounded text-sm">
            Thấp
          </span>
        );
      case "Trung bình":
        return (
          <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-sm">
            Trung bình
          </span>
        );
      case "Cao":
        return (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
            Cao
          </span>
        );
    }
  };

  const renderStatus = (status: Task["status"]) => {
    switch (status) {
      case "Đúng tiến độ":
        return (
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
            Đúng tiến độ
          </span>
        );
      case "Có rủi ro":
        return (
          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm">
            Có rủi ro
          </span>
        );
      case "Trễ hạn":
        return (
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
            Trễ hạn
          </span>
        );
    }
  };

  const sections: Task["section"][] = [
    "To do",
    "In Progress",
    "Pending",
    "Done",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col ">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Quản Lý Dự Án</h1>
        <nav className="space-x-4">
          <a href="/projects" className="hover:underline">
            Dự Án
          </a>
          <a href="#" className="hover:underline opacity-60">
            Nhiệm Vụ của tôi
          </a>
          <a href="/login" className="hover:underline">
            Đăng Xuất
          </a>
        </nav>
      </header>
      <main className="flex-1 p-6 flex gap-6 w-4/6 mx-auto">
        {/* Left */}
        <div className="flex-1 bg-[#f3f4f6]  p-4">
          <h2 className="text-2xl font-bold mb-2">
            Xây dựng website thương mại điện tử
          </h2>
          <div className="flex">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.Bu5oJ4sJaE54KV9TzhgppAHaNK?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="project"
              className="rounded mb-4 w-[218px] h-[163px]"
            />
            <div className="w-[350px] pl-2">
              <p className="text-gray-600 ml-[25px]">
                Dự án nhằm phát triển nền tảng thương mại điện tử với các tính
                năng như giỏ hàng, thanh toán và quản lý sản phẩm.
              </p>
            </div>
          </div>
          <button
            onClick={handleAddTask}
            className="bg-[#0D6EFD] text-white px-4 py-2 rounded"
          >
            + Thêm nhiệm vụ
          </button>
        </div>

        {/* Right */}
        <div className="w-1/3 bg-[#f3f4f6] p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Thành viên</h3>
            <button className="border px-2 py-1 rounded text-sm">
              + Thêm thành viên
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex gap-[40px]">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  AN
                </div>
                <div>
                  <p className="font-medium">An Nguyễn</p>
                  <p className="text-xs text-gray-500">Project Owner</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  BA
                </div>
                <div>
                  <p className="font-medium">Bách Nguyễn</p>
                  <p className="text-xs text-gray-500">Frontend Developer</p>
                </div>
                <button className="bg-gray-300 py-1 px-3 hover:bg-gray-500 rounded-3xl ">
                  <EllipsisOutlined></EllipsisOutlined>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Task Table */}
      <section className="px-6 pb-6 w-4/6 mx-auto">
        <div className="bg-white shadow rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Danh Sách Nhiệm Vụ</h3>
            <div className="flex gap-2">
              <select className="border px-2 py-1 rounded">
                <option>Sắp xếp theo</option>
                <option>Ưu tiên</option>
                <option>Hạn chót</option>
              </select>
              <input
                type="text"
                placeholder="Tìm kiếm nhiệm vụ"
                className="border rounded px-3 py-1 w-[300px]"
              />
            </div>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left ">Tên Nhiệm Vụ</th>
                <th className="p-2 text-center">Người Phụ Trách</th>
                <th className="p-2 text-center">Ưu Tiên</th>
                <th className="p-2 text-center">Ngày Bắt Đầu</th>
                <th className="p-2 text-center">Hạn Chót</th>
                <th className="p-2 text-center">Tiến độ</th>
                <th className="p-2 text-center pr-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <>
                  <tr key={section} className="bg-gray-50 font-semibold">
                    <td colSpan={7} className="p-2">
                      ▼ {section}
                    </td>
                  </tr>
                  {tasks
                    .filter((t) => t.section === section)
                    .map((t) => (
                      <tr key={t.id} className="border-b">
                        <td className="p-2 text-left">{t.name}</td>
                        <td className="p-2 text-center">{t.assignee}</td>
                        <td className="p-2 flex justify-center items-center">
                          {renderPriority(t.priority)}
                        </td>
                        <td className="p-2 text-center text-[#0D6EFD]">
                          {t.startDate}
                        </td>
                        <td className="p-2 text-center text-[#0D6EFD]">
                          {t.deadline}
                        </td>
                        <td className="p-2 flex justify-center items-center">
                          {renderStatus(t.status)}
                        </td>
                        <td className="p-2 pr-2 text-center space-x-2">
                          <button
                            onClick={() => handleEditTask(t)}
                            className="bg-yellow-400 text-black px-3 py-1 rounded"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteClick(t)}
                            className="bg-red-500 text-white px-3 py-1 rounded"
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleSaveTask}
        existingTasks={tasks.map((t) => t.name)}
        editTask={selectedTask}
      />
      <ConfirmDeleteTask
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xoá nhiệm vụ"
        message={`Bạn có chắc chắn muốn xoá nhiệm vụ "${
          taskToDelete?.name || ""
        }" không?`}
      />
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 Quản Lý Dự Án Nhóm. All rights reserved.
      </footer>
    </div>
  );
};

export default ProjectDetail;
