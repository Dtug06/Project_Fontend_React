import { useState } from "react";

interface Task {
  id: number;
  name: string;
  project: string;
  priority: "Thấp" | "Trung bình" | "Cao";
  startDate: string;
  deadline: string;
  status: "Đúng tiến độ" | "Có rủi ro" | "Trễ hạn";
}

const MyTasks = () => {
  const [expanded, setExpanded] = useState<string[]>(["Xây dựng website thương mại điện tử"]);

  const toggleProject = (project: string) => {
    setExpanded((prev) =>
      prev.includes(project)
        ? prev.filter((p) => p !== project)
        : [...prev, project]
    );
  };

  const tasks: Task[] = [
    {
      id: 1,
      name: "Soạn thảo đề cương dự án",
      project: "Xây dựng website thương mại điện tử",
      priority: "Thấp",
      startDate: "02-24",
      deadline: "02-27",
      status: "Đúng tiến độ",
    },
    {
      id: 2,
      name: "Soạn thảo đề cương dự án",
      project: "Xây dựng website thương mại điện tử",
      priority: "Trung bình",
      startDate: "02-24",
      deadline: "02-27",
      status: "Có rủi ro",
    },
    {
      id: 3,
      name: "Soạn thảo đề cương dự án",
      project: "Xây dựng website thương mại điện tử",
      priority: "Cao",
      startDate: "02-24",
      deadline: "02-27",
      status: "Trễ hạn",
    },
    {
      id: 4,
      name: "Lên lịch họp kickoff",
      project: "Phát triển ứng dụng di động",
      priority: "Thấp",
      startDate: "02-24",
      deadline: "02-27",
      status: "Có rủi ro",
    },
  ];

  const projects = Array.from(new Set(tasks.map((t) => t.project)));

  const renderPriority = (priority: Task["priority"]) => {
    const color =
      priority === "Thấp"
        ? "bg-cyan-100 text-cyan-600"
        : priority === "Trung bình"
        ? "bg-yellow-100 text-yellow-600"
        : "bg-red-100 text-red-600";
    return <span className={`px-2 py-1 rounded text-sm ${color}`}>{priority}</span>;
  };

  const renderStatus = (status: Task["status"]) => {
    const color =
      status === "Đúng tiến độ"
        ? "bg-green-100 text-green-600"
        : status === "Có rủi ro"
        ? "bg-orange-100 text-orange-600"
        : "bg-red-100 text-red-600";
    return <span className={`px-2 py-1 rounded text-sm ${color}`}>{status}</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Quản Lý Dự Án</h1>
        <nav className="space-x-4">
          <a href="/projects" className="hover:underline">
            Dự Án
          </a>
          <a href="/my-tasks" className="hover:underline opacity-60">
            Nhiệm Vụ của tôi
          </a>
          <a href="/login" className="hover:underline">
            Đăng Xuất
          </a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 w-3/5 mx-auto">
        <h2 className="text-xl font-semibold mb-4">Quản lý nhiệm vụ</h2>

        <div className="bg-white rounded shadow p-4">
          {/* Header của bảng */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold">Danh Sách Nhiệm Vụ</h3>
            <div className="flex gap-2">
              <select className="border rounded px-2 py-1 text-sm">
                <option>Sắp xếp theo</option>
                <option>Ưu tiên</option>
                <option>Hạn chót</option>
              </select>
              <input
                type="text"
                placeholder="Tìm kiếm nhiệm vụ"
                className="border rounded px-3 py-1 text-sm w-[250px]"
              />
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-sm">
                <th className="p-2 text-left">Tên Nhiệm Vụ</th>
                <th className="p-2 text-center">Độ ưu tiên</th>
                <th className="p-2 text-center">Trạng thái</th>
                <th className="p-2 text-center">Ngày Bắt Đầu</th>
                <th className="p-2 text-center">Hạn Chót</th>
                <th className="p-2 text-center">Tiến độ</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <>
                  <tr
                    key={project}
                    className="font-semibold bg-gray-50 cursor-pointer"
                    onClick={() => toggleProject(project)}
                  >
                    <td colSpan={6} className="p-2 text-left">
                      {expanded.includes(project) ? "▼" : ">"} {project}
                    </td>
                  </tr>
                  {expanded.includes(project) &&
                    tasks
                      .filter((t) => t.project === project)
                      .map((t) => (
                        <tr key={t.id} className="border-b hover:bg-gray-50">
                          <td className="p-2 pl-8 text-left text-sm">
                            {t.name}
                          </td>
                          <td className="p-2 text-center">{renderPriority(t.priority)}</td>
                          <td className="p-2 text-center">
                            {t.status === "Đúng tiến độ"
                              ? "In progress 📝"
                              : t.status === "Có rủi ro"
                              ? "In progress 📝"
                              : "Pending ⏳"}
                          </td>
                          <td className="p-2 text-center text-[#0D6EFD]">
                            {t.startDate}
                          </td>
                          <td className="p-2 text-center text-[#0D6EFD]">
                            {t.deadline}
                          </td>
                          <td className="p-2 text-center">{renderStatus(t.status)}</td>
                        </tr>
                      ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 Quản Lý Dự Án Nhóm. All rights reserved.
      </footer>
    </div>
  );
};

export default MyTasks;
