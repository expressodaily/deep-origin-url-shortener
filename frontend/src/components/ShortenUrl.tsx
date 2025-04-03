import React, { useState } from "react";
import { useShortenUrl } from "../hooks/useShortenUrl";
import { useUrlContext } from "../context/UrlContext";
import CopyButton from "./CopyButton";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ShortenUrlSection: React.FC = () => {
  const {
    success,
    error,
    shortUrl,
    setError,
    setSuccess,
    setShortUrl,
    setUrls,
  } = useUrlContext();
  const [url, setUrl] = useState("");
  const { handleShortenUrl } = useShortenUrl();

  const email = localStorage.getItem("email")!;
  const token = localStorage.getItem("token")!;

  const validateUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,}(\/[^\s]*)?$/;
    return regex.test(url);
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL.');
      return;
    }

    try {
      const shortCode = await handleShortenUrl(url, email, token);
      setShortUrl(shortCode);
      setSuccess(true);
      setUrls((prev) => [
        ...prev,
        { click_count: 0, short_code: shortCode, original_url: url },
      ]);
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
    }
  };

  return (
    <div className="flex-1">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">URL Shortener</h1>
      <p className="text-gray-600 mb-6">
        Simplify your links and share them effortlessly. Enter a URL below to
        get started.
      </p>
      <form onSubmit={handleShorten} className="space-y-4">
        <input
          type="text"
          placeholder="Enter your URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg py-3"
        >
          Shorten URL
        </button>
      </form>
      {success && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">
            Success! Here's your short URL:
          </p>
          <div className="flex">
            <a
              href={`${API_BASE_URL}/shortenurl/${shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="my-auto text-indigo-600 hover:underline truncate"
            >
              {shortUrl}
            </a>
            <div className="ml-auto">
              <CopyButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortenUrlSection;
