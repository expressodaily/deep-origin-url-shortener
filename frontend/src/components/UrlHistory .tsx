import React from 'react';
import { useUrlContext } from '../context/UrlContext';
import UrlHistoryTable from './UrlHistoryTable';

const UrlHistory: React.FC = () => {
  const { error, loading, urls } = useUrlContext();

  return (
    <div className="flex-1 bg-gray-100 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📜 URL History</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : urls.length > 0 ? (
        <UrlHistoryTable urls={urls} />
      ) : (
        <p className="text-gray-500">No history available. Start shortening URLs!</p>
      )}
    </div>
  )
};

export default React.memo(UrlHistory);
