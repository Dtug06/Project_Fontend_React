import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận xoá",
  message = "Bạn chắc chắn muốn xoá dự án này?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-start z-50 pt-20">
      <div className="bg-white rounded-md shadow-lg w-[420px] animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            ✕
          </button>
        </div>

        {/* Nội dung */}
        <div className="p-5 text-gray-700 text-sm">{message}</div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 pb-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#6C757D] text-white hover:bg-gray-300 transition w-[58px] h-[37px]"
          >
            Huỷ
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition w-[58px] h-[37px]"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
