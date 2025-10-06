import { useState, useEffect } from "react";

interface Project {
  id?: number;
  name: string;
  image?: File | null;
  description: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  existingProjects: string[];
  editProject?: Project | null;
}

const ProjectModal = ({
  isOpen,
  onClose,
  onSave,
  existingProjects,
  editProject,
}: Props) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editProject) {
      setProjectName(editProject.name);
      setDescription(editProject.description);
    } else {
      setProjectName("");
      setDescription("");
      setImage(null);
    }
    setError("");
  }, [editProject, isOpen]);

  const handleSave = () => {
    // kiểm tra trùng tên
    if (
      !editProject &&
      existingProjects.some(
        (name) => name.toLowerCase() === projectName.toLowerCase()
      )
    ) {
      setError("Tên danh mục đã tồn tại");
      return;
    }

    if (projectName.trim() === "") {
      setError("Vui lòng nhập tên dự án");
      return;
    }

    const newProject: Project = {
      id: editProject?.id,
      name: projectName,
      image,
      description,
    };
    onSave(newProject);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-[450px]">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">
            {editProject ? "Sửa dự án" : "Thêm dự án"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          <div>
            <label className="block font-medium mb-1">Tên dự án</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setError("");
              }}
              className={`w-full border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200`}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Hình ảnh dự án</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mô tả dự án</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 h-20 resize-none focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Huỷ
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
