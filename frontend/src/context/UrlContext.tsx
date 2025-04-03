import React, { createContext, useContext, useEffect, useState } from "react";
import type { IUrlEntry } from "../types";
import {
  copyUrl,
  deleteUrl,
  editUrl,
  fetchUrlHistory,
} from "../api/urlHistory";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface UrlContextProps {
  urls: IUrlEntry[];
  loading: boolean;
  error: string;
  success: boolean;
  shortUrl: string;
  setUrls: React.Dispatch<React.SetStateAction<IUrlEntry[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setShortUrl: React.Dispatch<React.SetStateAction<string>>;
  copyShortenUrl: (shortCode: string) => Promise<void>;
  editShortenUrl: (oldCode: string, newCode: string) => Promise<void>;
  deleteShortenUrl: (shortCode: string) => Promise<void>;
}

const UrlContext = createContext<UrlContextProps | undefined>(undefined);

export const UrlProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [urls, setUrls] = useState<IUrlEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shortUrl, setShortUrl] = useState("");

  const email = localStorage.getItem("email")!;
  const token = localStorage.getItem("token")!;

  const deleteShortenUrl = async (shortCode: string) => {
    try {
      await deleteUrl(shortCode, token);
      setUrls((prev) => prev.filter((url) => url.short_code !== shortCode));
      alert("Shorten Url deleted successfully!");
    } catch (err) {
      console.log("Error while deleting shorten url", err);
      alert("Error while deleting shorten url");
    }
  };

  const copyShortenUrl = async (shortCode: string) => {
    try {
      await navigator.clipboard.writeText(
        `${API_BASE_URL}/shortenurl/${shortCode}`
      );
      const response = await copyUrl(shortCode);
      const { click_count } = response;
      setUrls((prev) =>
        prev.map((url) =>
          url.short_code === shortCode ? { ...url, click_count } : url
        )
      );
      alert("Shorten Url copied successfully!");
    } catch (err) {
      console.log("Error while copying shorten url", err);
      alert("Error while copying shorten url");
    }
  };

  const editShortenUrl = async (oldCode: string, newCode: string) => {
    try {
      await editUrl(oldCode, newCode);
      setUrls((prev) =>
        prev.map((url) =>
          url.short_code === oldCode ? { ...url, short_code: newCode } : url
        )
      );
      alert("Shorten Url updated successfully!");
    } catch (err) {
      console.log("Error while editing shorten url", err);
      alert("Error while editing shorten url");
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError("");

      try {
        const history = await fetchUrlHistory(email, token);
        setUrls(history);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [email, token, setUrls, setLoading, setError]);

  return (
    <UrlContext.Provider
      value={{
        urls,
        loading,
        error,
        success,
        shortUrl,
        setUrls,
        setLoading,
        setError,
        setSuccess,
        setShortUrl,
        copyShortenUrl,
        editShortenUrl,
        deleteShortenUrl,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export const useUrlContext = (): UrlContextProps => {
  const context = useContext(UrlContext);
  if (!context) {
    throw new Error("useUrlContext must be used within a UrlProvider");
  }
  return context;
};
