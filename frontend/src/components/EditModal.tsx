import { useState } from 'react';

interface EditModalProps {
  currentCode: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newCode: string) => void;
}

const EditModal: React.FC<EditModalProps> = ({ currentCode, isOpen, onClose, onSubmit }) => {
  const [newCode, setNewCode] = useState(currentCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Short URL</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="border border-gray-300 rounded p-2"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
