import express from 'express';
import Call from '../models/call.model';

const router = express.Router();

router.post('/calls', async (req, res) => {
  try {
    const { caller, time, duration } = req.body;

    // Simple create
    const savedCall = await Call.create({
      caller,
      time: new Date(time),
      duration,
    });

    res.status(201).json({
      message: 'Call saved successfully',
      data: savedCall,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server Error',
      error,
    });
  }
});

export default router;