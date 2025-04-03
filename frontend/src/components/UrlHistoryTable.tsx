import React, { useState } from 'react';
import CopyButton from './CopyButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import EditModal from './EditModal';
import { useUrlContext } from '../context/UrlContext';
import type { IUrlEntry } from '../types';

interface UrlHistoryTableProps {
  urls: IUrlEntry[];
}

const UrlHistoryTable: React.FC<UrlHistoryTableProps> = ({ urls }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentShortenCode, setCurrentShortenCode] = useState<string | null>(null);
  const { deleteShortenUrl, copyShortenUrl, editShortenUrl } = useUrlContext();

  return (
    <div className="overflow-y-auto max-h-96 overflow-x-hidden">
      <table className="w-full table-fixed border-collapse bg-white shadow-md rounded-2xl overflow-hidden">
        <thead className="bg-blue-600 text-white sticky top-0 z-10">
          <tr>
            <th className="p-4 text-center border-b border-blue-700 w-1/3">Origin</th>
            <th className="p-4 text-center border-b border-blue-700 w-1/6">Short</th>
            <th className="p-4 text-center border-b border-blue-700 w-1/6">Count</th>
            <th className="p-4 text-center border-b border-blue-700 w-1/3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr
              key={index}
              className="hover:bg-blue-50 transition-all duration-200 border-b border-gray-200"
            >
              <td className="p-4 break-words text-sm text-gray-800">
                <a
                  href={url.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {url.original_url}
                </a>
              </td>
              <td className="p-4 text-center text-pink-600 font-mono text-sm">{url.short_code}</td>
              <td className="p-4 text-right font-semibold text-gray-700 text-sm">
                {url.click_count}
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end items-center gap-2">
                  <CopyButton onClick={() => copyShortenUrl(url.short_code)} />
                  <EditButton
                    onClick={() => {
                      setCurrentShortenCode(url.short_code);
                      setIsEditing(true);
                    }}
                    iconOnly
                  />
                  <DeleteButton
                    onClick={() => deleteShortenUrl(url.short_code)}
                    iconOnly
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentShortenCode && (
        <EditModal
          currentCode={currentShortenCode}
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          onSubmit={(newCode) => {
            editShortenUrl(currentShortenCode, newCode);
          }}
        />
      )}

    </div>
  );
};

export default React.memo(UrlHistoryTable);
