import express from "express";
import { submitBooking,modifyBooking, deleteBooking } from "../controllers/userController.js";

const router = express.Router();

router.post("/submit-booking",submitBooking);
router.post("/modify-booking",modifyBooking);
router.post("/delete-booking",deleteBooking);

export default router;