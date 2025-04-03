import React from "react";
import ShortenUrl from "../components/ShortenUrl";
import UrlHistory from "../components/UrlHistory ";
import { UrlProvider } from "../context/UrlContext";

const UrlShortener: React.FC = () => {
  return (
    <UrlProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white shadow-2xl rounded-2xl p-10 flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-8">
          <ShortenUrl />
          <UrlHistory />
        </div>
      </div>
    </UrlProvider>
  );
};

export default UrlShortener;
