import express, { Request, Response } from "express";
import ShortenedURL from "../../database/models/shortenedURL/types";
import { BadRequestResponse, NotFoundResponse, SuccessResponse } from "../../core/response";
import asyncHandler from "../../helpers/asyncHandler";
import { getshortenedURL, shortenUrl } from "../../app/url-shortner";
import { fetchURLsByEmail, findByUrl } from "../../database/repositories/short";
import { BadRequestError } from "../../core/error";
import { authMiddleware } from "../../middleware/auth";
import jwt from 'jsonwebtoken'
import { ShortenedURLModel } from "../../database/models/shortenedURL";
import limiter from "../../middleware/limiter";

const router = express.Router();


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
router.post('', limiter, authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, url } = req.body;
    if (!email || !url) {
      new BadRequestResponse('Url is required').send(res);
      return;
    }
    const existingUrl = await findByUrl(req.body.url);

    if (existingUrl) {
      throw new BadRequestError('User is already existed!');
    }
    const shortenedURL: ShortenedURL = await shortenUrl(url, email);

    new SuccessResponse('Shorten url created successfully', shortenedURL).send(res);

  } catch (err) {
    throw err;
  }
}));


router.get('', limiter, authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user || !user.email) {
      new BadRequestResponse('User email is missing from token payload').send(res);
      return;
    }

    const token = jwt.sign(
      { email: user.email },
      JWT_SECRET,
      { expiresIn: '10h' }
    );

    const { email } = req.query;
    if (!email) {
      new BadRequestResponse('Email is required to fetch saved URLs').send(res);
      return;
    }

    const data = await fetchURLsByEmail(email as string);

    new SuccessResponse('Shortened URLs retrieved successfully', {
      email: user.email,
      data,
    }).send(res);

  } catch (err) {
    console.error('Error:', err);
    throw err;
  }
}));

router.get('/:short_code', asyncHandler(async (req: Request, res: Response) => {
  try {
    const shortCode = req.params.short_code;

    const url = await getshortenedURL(shortCode);

    if (!url) {
      return res.redirect(301, 'http://localhost:5173/error');
    }

    return res.redirect(301, url.original_url);  

  } catch (err) {
    console.error('Error during redirect handling:', err);
    throw err;
  }
}));


router.patch('/:short_Code/copy', limiter,  asyncHandler(async (req, res) => {
  const { short_Code } = req.params;

  const result = await ShortenedURLModel.findOneAndUpdate(
    { short_code: short_Code },
    { $inc: { click_count: 1 } },
    { new: true }
  );

  if (!result) {
    return new NotFoundResponse('Shortened URL not found').send(res);
  }

  return new SuccessResponse('Click count incremented', { click_count: result.click_count }).send(res);
}));


router.delete('/:short_code', limiter, authMiddleware, asyncHandler(async (req: Request, res: Response) => {
  try {
    const { short_code } = req.params;
    const deleted = await ShortenedURLModel.deleteOne({ short_code });
    new SuccessResponse('Shorten code was deleted successfully', { short_code }).send(res)
  }
  catch (err) {
    console.log(err)
  }
}));

router.put('/:short_code/edit', limiter, asyncHandler(async (req: Request, res: Response) => {
  const { short_code } = req.params;
  const { new_code } = req.body;
  try {
    const urlEntry = await ShortenedURLModel.findOne({ short_code: short_code });

    if (!urlEntry) {
      return res.status(404).json({ message: 'Short URL not found' });
    }

    urlEntry.short_code = new_code;

    await urlEntry.save();

    res.status(200).json({ message: 'Shortened URL updated successfully', updatedEntry: urlEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}))

router.get('/:get-all-urls', asyncHandler(async (req: Request, res: Response) => {
  
}))

export default router;