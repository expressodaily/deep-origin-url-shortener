import React from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
  onClick: () => void;
  iconOnly?: boolean;
  label?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onClick,
  iconOnly = true,
  label = 'Delete',
}) => {
  return (
    <button
      onClick={onClick}
      title="Delete"
      className={`flex items-center gap-2 ${iconOnly
        ? 'p-2 bg-red-100 hover:bg-red-200 rounded-full'
        : 'bg-red-500 hover:bg-red-600 text-white rounded-lg px-3 py-2'
        }`}
    >
      <Trash2 className={iconOnly ? 'w-5 h-5 text-red-600' : 'w-4 h-4'} />
      {!iconOnly && <span>{label}</span>}
    </button>
  );
};

export default React.memo(DeleteButton);
