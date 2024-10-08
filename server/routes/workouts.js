const express = require('express');
const { createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutControllers');
const router = express.Router();

const requireAuth = require('../middleware/requireAuth');

//  require auth for all routes
router.use(requireAuth);

//  GET all workouts
router.get('/', getAllWorkouts);

//  GET a single workouts
router.get('/:id', getSingleWorkout);

//  POST a new workout
router.post('/', createWorkout);

//  DELETE a new workout
router.delete('/:id', deleteWorkout);

//  UPDATE a new workout
router.patch('/:id', updateWorkout);

//  Export the router
module.exports = router;