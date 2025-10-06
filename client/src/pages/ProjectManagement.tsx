import { useState } from "react";
import Pagination from "../components/Pagination";
import ProjectModal from "../components/ProjectModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

interface Project {
  id: number;
  name: string;
  description?: string;
}

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: "Xây dựng website thương mại điện tử" },
    { id: 2, name: "Phát triển ứng dụng di động" },
    { id: 3, name: "Quản lý dữ liệu khách hàng" },
    { id: 4, name: "Xây dựng website thương mại điện tử" },
    { id: 5, name: "Phát triển ứng dụng di động" },
    { id: 6, name: "Quản lý dữ liệu khách hàng" },
    { id: 7, name: "Xây dựng website thương mại điện tử" },
    { id: 8, name: "Phát triển ứng dụng di động" },
    { id: 9, name: "Quản lý dữ liệu khách hàng" },
  ]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const pageSize = 5;

  const filtered = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / pageSize);
  const displayed = filtered.slice((page - 1) * pageSize, page * pageSize);

  // ✅ Lưu dự án mới hoặc sửa
  const handleSave = (project: Project) => {
    if (project.id) {
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, ...project } : p))
      );
    } else {
      const newProject = {
        id: projects.length + 1,
        name: project.name,
        description: project.description,
      };
      setProjects([...projects, newProject]);
    }
  };

  // ✅ Mở modal xác nhận xoá
  const handleDeleteClick = (id: number) => {
    setSelectedProject(id);
    setConfirmOpen(true);
  };

  // ✅ Xác nhận xoá
  const confirmDelete = () => {
    if (selectedProject !== null) {
      setProjects((prev) => prev.filter((p) => p.id !== selectedProject));
    }
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-[Poppins]">
      {/* HEADER */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">Quản Lý Dự Án</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline font-medium">
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

      {/* MAIN */}
      <main className="flex-1 flex justify-center items-start py-10">
        <div className="bg-white shadow-md rounded-lg w-3/4 p-6">
          <h2 className="text-xl font-bold mb-4">Quản Lý Dự Án Nhóm</h2>

          {/* THANH TÌM KIẾM + THÊM */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => {
                setEditProject(null);
                setIsModalOpen(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Thêm Dự Án
            </button>

            <input
              type="text"
              placeholder="Tìm kiếm dự án"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 w-1/3"
            />
          </div>

          {/* BẢNG DỰ ÁN */}
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-gray-900 text-white text-sm">
                <th className="py-2 px-3 text-center w-16 border-b border-gray-300">
                  ID
                </th>
                <th className="py-2 px-3 text-left border-b border-gray-300">
                  Tên Dự Án
                </th>
                <th className="py-2 px-3 text-center border-b border-gray-300 w-52">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody>
              {displayed.map((p, index) => (
                <tr
                  key={p.id}
                  className={`text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-2 px-3 text-center border-b border-gray-200">
                    {p.id}
                  </td>
                  <td className="py-2 px-3 text-left border-b border-gray-200">
                    {p.name}
                  </td>
                  <td className="py-2 px-3 text-center border-b border-gray-200">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditProject(p);
                          setIsModalOpen(true);
                        }}
                        className="bg-yellow-400 text-black px-5 py-1 rounded shadow hover:bg-yellow-500 transition"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteClick(p.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                      <button className="bg-blue-600 text-white px-5 py-1 rounded shadow hover:bg-blue-700 transition">
                        Chi tiết
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* MODAL XÁC NHẬN XOÁ */}
          <ConfirmDeleteModal
            isOpen={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={confirmDelete}
            title="Xác nhận xoá dự án"
            message="Bạn có chắc chắn muốn xoá dự án này không?"
          />

          {/* MODAL THÊM/SỬA */}
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            existingProjects={projects.map((p) => p.name)}
            editProject={editProject}
          />

          {/* PHÂN TRANG */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        © 2025 Quản Lý Dự Án Nhóm. All rights reserved.
      </footer>
    </div>
  );
};

export default ProjectManagement;
