import ShortenedURL from "../../models/shortenedURL/types";
import { ShortenedURLModel } from "../../models/shortenedURL";

async function createUrl( shortenedURL: ShortenedURL,):Promise<ShortenedURL> {
    await ShortenedURLModel.create(shortenedURL);
    return shortenedURL
}

async function findByUrl(url: string): Promise<ShortenedURL | null> {
    
    return ShortenedURLModel.findOne({ original_url: url }).lean().exec();
}

async function findAllUrls(){

    const result = await  ShortenedURLModel.find().lean().exec();
    return result
}

async function findURLByShortCode(short_code: string) {
    const result = await ShortenedURLModel.findOne({short_code: short_code}).lean().exec()
    return result
}

async function fetchURLsByEmail(email: string) {
    try {
        const result = await ShortenedURLModel.find({ email }).lean().exec();
        return result;
    } catch (err) {
        throw new Error(`Failed to fetch URLs for email ${email}`);
    }
}

export {
    createUrl,
    findByUrl,
    findAllUrls,
    findURLByShortCode,
    fetchURLsByEmail
};