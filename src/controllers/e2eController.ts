import * as e2eServices from "../services/e2eService";
import { Request, Response } from "express";

export async function clear(req: Request, res: Response) {
  await e2eServices.truncate();
  return res.sendStatus(200);
}