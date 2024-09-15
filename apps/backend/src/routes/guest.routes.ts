import { Request, Response, Router } from "express";

const guestRouter: Router = Router();

guestRouter.get("", async (req: Request, res: Response) => {
  return res.status(200).json(req.guest);
});

export default guestRouter;
