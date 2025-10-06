import React from "react";

interface ConfirmDeleteTaskProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmDeleteTask: React.FC<ConfirmDeleteTaskProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận xoá nhiệm vụ",
  message = "Bạn có chắc chắn muốn xoá nhiệm vụ này không?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[400px]">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4 text-gray-700">{message}</div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t p-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteTask;
