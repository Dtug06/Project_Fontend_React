import React, { useState, useEffect } from "react";

interface Task {
  id?: number;
  name: string;
  assignee: string;
  status: string;
  startDate: string;
  dueDate: string;
  priority: string;
  progress: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  existingTasks: string[];
  editTask?: Partial<Task> | null;
}


const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingTasks,
  editTask,
}) => {
  const [task, setTask] = useState<Task>({
    name: "",
    assignee: "",
    status: "",
    startDate: "",
    dueDate: "",
    priority: "",
    progress: "",
  });

  const [error, setError] = useState("");

 useEffect(() => {
  if (editTask) {
    setTask({
      name: editTask.name || "",
      assignee: editTask.assignee || "",
      status: editTask.status || "",
      startDate: editTask.startDate || "",
      dueDate: editTask.dueDate || "",
      priority: editTask.priority || "",
      progress: editTask.progress || "",
    });
  } else {
    setTask({
      name: "",
      assignee: "",
      status: "",
      startDate: "",
      dueDate: "",
      priority: "",
      progress: "",
    });
  }
  setError("");
}, [editTask, isOpen]);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate tên nhiệm vụ
    if (!task.name.trim()) {
      setError("Tên nhiệm vụ không được để trống");
      return;
    }

    const isDuplicate =
      existingTasks.includes(task.name) && task.name !== editTask?.name;

    if (isDuplicate) {
      setError("Tên nhiệm vụ đã tồn tại");
      return;
    }

    onSave(task);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white h-10/12 rounded-lg shadow-xl w-full max-w-md flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 pt-6 pb-3 border-b">
          <h2 className="text-lg font-semibold">
            {editTask ? "Sửa nhiệm vụ" : "Thêm nhiệm vụ"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Tên nhiệm vụ */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tên nhiệm vụ
            </label>
            <input
              type="text"
              name="name"
              value={task.name}
              onChange={handleChange}
              className={`w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg px-3 py-3`}
              placeholder="Nhập tên nhiệm vụ"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Người phụ trách */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Người phụ trách
            </label>
            <select
              name="assignee"
              value={task.assignee}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Chọn người phụ trách</option>
              <option value="An Nguyễn">An Nguyễn</option>
              <option value="Bách Nguyễn">Bách Nguyễn</option>
              <option value="Linh Phạm">Linh Phạm</option>
            </select>
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              name="status"
              value={task.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Chọn trạng thái nhiệm vụ</option>
              <option value="To do">To do</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Ngày bắt đầu / Hạn cuối */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                Ngày bắt đầu
              </label>
              <input
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 mb-3 py-5"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Hạn cuối</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 mb-3 py-5"
              />
            </div>
          </div>

          {/* Độ ưu tiên */}
          <div>
            <label className="block text-sm font-medium mb-1">Độ ưu tiên</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Chọn độ ưu tiên</option>
              <option value="Cao">Cao</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Thấp">Thấp</option>
            </select>
          </div>

          {/* Tiến độ */}
          <div>
            <label className="block text-sm font-medium mb-1">Tiến độ</label>
            <select
              name="progress"
              value={task.progress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="">Chọn tiến độ</option>
              <option value="Đúng tiến độ">Đúng tiến độ</option>
              <option value="Có rủi ro">Có rủi ro</option>
              <option value="Trễ hạn">Trễ hạn</option>
            </select>
          </div>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-2 px-6 py-4 border-t bg-white sticky bottom-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
