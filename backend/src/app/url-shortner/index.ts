import ShortenedURL from "../../database/models/shortenedURL/types";
import { findAllUrls, findByUrl, findURLByShortCode, createUrl } from "../../database/repositories/short";
import crypto from "crypto";
 

const generateUniqueShortCode = (longUrl: string): string => {
    const hash = crypto.createHash("sha256").update(longUrl).digest("hex");

    const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = parseInt(hash.slice(0, 8), 16); 
    let shortCode = "";

    do {
        shortCode = charset[num % 62] + shortCode;
        num = Math.floor(num / 62);
    } while (num > 0);

    return shortCode.slice(0, 8); 
};


export const shortenUrl = async (url: string, email: string): Promise<ShortenedURL> => {
    const short_code = generateUniqueShortCode(url); 
    const existingUrl: ShortenedURL | null = await findByUrl(url);
    if (existingUrl) {
        return existingUrl;
    }

    const expires_at = new Date();
    expires_at.setDate(new Date().getDate() + 3000);

    const shortenedURL: ShortenedURL = await createUrl({
        original_url: url,
        short_code: short_code,
        email: email,
        expires_at: expires_at,
    });

    return shortenedURL;
};

export const getshortenedURLs = async() : Promise<ShortenedURL[]> => {
    return await findAllUrls(); 
}

export const getshortenedURL = async(short_code: string) : Promise<ShortenedURL | null> => {
    return await findURLByShortCode(short_code); 
}
