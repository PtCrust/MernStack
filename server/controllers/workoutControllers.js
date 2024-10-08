const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//-------------------- Setup the Functions ------------------//
// GET all workouts
const getAllWorkouts = async (req, res) => {

    const user_id = req.user._id;

    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(workouts);
};
// GET a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Workout not found !' });
    }

    const workout = await Workout.findById(id);

    res.status(200).json(workout);
};
// CREATE a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    // handel Error Message
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill all required fields', emptyFields });
    }

    try {
        const user_id = req.user._id

        const workout = await Workout.create({ title, reps, load, user_id })
        res.status(200).json(workout)
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// DELETE a single workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Workout not found !' });
    }
    const workout = await Workout.findByIdAndDelete({ _id: id });
    if (!workout) {
        return res.status(404).json({ message: 'Workout not found!' });
    }
    res.status(200).json(workout);
};

// UPDATE a single workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'Workout not found !' });
    }
    const workout = await Workout.findOneAndUpdate({ _id: id },
        {
            ...req.body
        });
    if (!workout) {
        return res.status(404).json({ message: 'Workout not found!' });
    }
    
    res.status(200).json({ message: "wourkout updated successfully!", workout })
}

module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}