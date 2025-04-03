import { Pencil } from 'lucide-react';

interface EditButtonProps {
  onClick: () => void;
  iconOnly?: boolean;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, iconOnly = false }) => (
  <button
    onClick={onClick}
    className="text-yellow-600 hover:text-yellow-800 p-2 transition"
    title="Edit"
  >
    {iconOnly ? <Pencil size={16} /> : 'Edit'}
  </button>
);

export default EditButton;
