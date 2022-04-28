import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("FUNCIONA");
});

export default router;
