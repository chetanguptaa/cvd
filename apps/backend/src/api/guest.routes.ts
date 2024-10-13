import { Request, Response, Router } from "express";

const guestRouter: Router = Router();

guestRouter.get("", async (req: Request, res: Response) => {
  try {
    return res.status(200).json(req.guest);
  } catch (error) {
    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

export default guestRouter;
