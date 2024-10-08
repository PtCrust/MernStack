import { useState, useEffect, useContext } from "react"
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext"
import { useAuthContext } from "../Hooks/useAuthContext"
import { Link, useNavigate} from "react-router-dom"
import { ThemeContext } from "../Context/ThemeContext"

const WorkoutsForm = ({ id }) => {

    const { dispatch, workouts } = useWorkoutsContext()
    const { user } = useAuthContext();

    const navigate = useNavigate();

    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;

    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')

    useEffect(() => {
        if (id) {
            const workout = workouts.find((workout) => workout._id === id)
            if (workout) {
                setTitle(workout.title)
                setReps(workout.reps)
                setLoad(workout.load)
            }
        } else {
            setTitle('')
            setReps('')
            setLoad('')
        }

    }, [])


    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return;
        }

        const workout = { title, reps, load }
        const response = await fetch(`/api/workouts/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
        })
        const jsonData = await response.json()
        if (!response.ok) {
            setError(jsonData.error)
            setEmptyFields(jsonData.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'UPDATE_WORKOUTS', payload: jsonData })
            navigate('/')
        }
    }
    return (
        <form className="login" style={{ background: theme.bg, color: theme.syntax }} onSubmit={handleSubmit}>
            <h3>Update a Workout</h3>

            {/* Title */}
            <label for="title" className="">Excersise Title: </label>
            <input
                type="text"
                id="title"
                value={title}
                className={emptyFields.includes('title') ? "error" : ""}
                onChange={e => setTitle(e.target.value)}
            />

            {/* Reps */}
            <label for="reps" className="">Reps: </label>
            <input
                type="number"
                id="reps"
                value={reps}
                className={emptyFields.includes('reps') ? "error" : ""}
                onChange={e => setReps(e.target.value)}
            />

            {/* Load */}
            <label for="load" className="">Load: </label>
            <input
                type="number"
                id="load"
                value={load}
                className={emptyFields.includes('load') ? "error" : ""}
                onChange={e => setLoad(e.target.value)}
            />
            <div className="actionsBtn">
                <button type="submit">Update Workout</button>
                <button><Link to={'/'}>Cancel</Link></button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutsForm
