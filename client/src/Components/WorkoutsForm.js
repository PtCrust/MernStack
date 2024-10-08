import { useContext, useState } from "react"
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext"
import { useAuthContext } from "../Hooks/useAuthContext"
import { ThemeContext } from "../Context/ThemeContext"

const WorkoutsForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext();
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark;



    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in')
            return;
        }

        const workout = { title, reps, load }
        const response = await fetch("/api/workouts", {
            method: 'POST',
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
            dispatch({ type: 'CREATE_WORKOUTS', payload: jsonData })
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit} style={{ background: theme.bg, color: theme.syntax }}>
            <h3>Add a New Workout</h3>

            {/* Title */}
            <label for="title" className="">Excersise Title: </label>
            <input
                type="text"
                id="title"
                value={title}
                placeholder="Ex: Bench"
                className={emptyFields.includes('title') ? "error" : ""}
                onChange={e => setTitle(e.target.value)}
            />

            {/* Reps */}
            <label for="reps" className="">Reps: </label>
            <input
                type="number"
                id="reps"
                value={reps}
                placeholder="Ex: 20"
                className={emptyFields.includes('reps') ? "error" : ""}
                onChange={e => setReps(e.target.value)}
            />

            {/* Load */}
            <label for="load" className="">Load: </label>
            <input
                type="number"
                id="load"
                value={load}
                placeholder="Ex: 12"
                className={emptyFields.includes('load') ? "error" : ""}
                onChange={e => setLoad(e.target.value)}
            />

            <button type="submit">Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutsForm
