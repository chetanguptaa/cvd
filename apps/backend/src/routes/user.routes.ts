import { Request, Response, Router } from "express";

const userRouter: Router = Router();

userRouter.get("", (req: Request, res: Response) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({
      error: "some error occoured, please try again later",
    });
  }
});

export default userRouter;
