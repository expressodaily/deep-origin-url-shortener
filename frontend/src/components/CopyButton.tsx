import React from 'react';
import { ClipboardCopy } from 'lucide-react';

interface CopyButtonProps {
  onClick?: () => void;
  iconOnly?: boolean;
  label?: boolean;
}

const CopyButton: React.FC<CopyButtonProps> = ({ onClick, iconOnly, label }) => {
  return (
    <button
      onClick={onClick}
      title="Copy to clipboard"
      className={`flex items-center gap-2 ${iconOnly
        ? 'p-2 bg-blue-100 hover:bg-blue-200 rounded-full'
        : 'bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-3 py-2'
        }`}
    >
      <ClipboardCopy className={iconOnly ? 'w-5 h-5 text-blue-600' : 'w-4 h-4'} />
      {!iconOnly && label && <span>{label}</span>}
    </button>
  );
};

export default React.memo(CopyButton);
