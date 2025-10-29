import { LogOut, X } from 'lucide-react';

interface LogoutConfirmationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
}

export default function LogoutConfirmationPopup({
  isOpen,
  onClose,
  onConfirm,
  userName = 'Admin'
}: LogoutConfirmationPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000027] backdrop-blur-xs flex items-center justify-center p-4 z-999">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 py-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <LogOut className="w-6 h-6 text-red-600" />
          </div>
        </div>
        <div className="px-6 pb-6">
          <p className="text-gray-700 text-center">
            Are you sure you want to logout <span className="font-semibold">{userName}</span>?
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 cursor-pointer px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}