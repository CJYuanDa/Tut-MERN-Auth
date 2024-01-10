const express = require('express');
const ctr = require('../controllers/workoutController');
const router = express.Router();

// GET all workouts
router.get('/', ctr.getWorkouts);

// GET a single workout
router.get('/:id', ctr.getWorkout);

// POST a new workout
router.post('/', ctr.createWorkout);

// DELETE a workout
router.delete('/:id', ctr.deleteWorkout);

// UPDATE a workout
router.patch('/:id', ctr.updateWorkout);

module.exports = router;