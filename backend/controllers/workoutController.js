const Workout = require('../models/workoutModel');
const mongoose = require('mongoose')

// GET all workouts
module.exports.getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        console.log(error);
    };
};

// GET a single workout
module.exports.getWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Not such workout' });
    try {
        const workout = await Workout.findById(id);
        if (!workout) return res.status(400).json({ error: 'Not such workout' });
        res.status(200).json(workout);
    } catch (error) {
        console.log(error);
    }
};

// CREATE a new workout
module.exports.createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    const emptyFields = [];

    // error handling
    if (!title) emptyFields.push('title');
    if (!reps) emptyFields.push('reps');
    if (!load) emptyFields.push('load');
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a workout
module.exports.deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Not such workout' });
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) return res.status(400).json({ error: 'Not such workout' });
    res.status(200).json(workout);
};

// UPDATE a workout
module.exports.updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Not such workout' });
    const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });
    if (!workout) return res.status(400).json({ error: 'Not such workout' });
    res.status(200).json(workout);
};