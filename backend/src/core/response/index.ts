import { Response } from "express";
import { ResponseStatus, StatusCode } from "./enums";

abstract class ApiResponse {
  constructor(
    protected statusCode: StatusCode,
    protected status: ResponseStatus,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: { [key: string]: string }
  ): Response {
    for (const [key, value] of Object.entries(headers)) res.append(key, value);
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(
    res: Response,
    headers: { [key: string]: string } = {}
  ): Response {
    return this.prepare<ApiResponse>(res, this, headers);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === "undefined") delete clone[i];
    return clone;
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotFoundResponse extends ApiResponse {
  constructor(message = "Not Found") {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<NotFoundResponse>(res, this, headers);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = "Bad Parameters") {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = "Internal Error") {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(
        StatusCode.INVALID_ACCESS_TOKEN,
        ResponseStatus.UNAUTHORIZED,
        message,
    );
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction;
    return super.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}
