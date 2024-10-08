import { Link } from "react-router-dom"
import { useAuthContext } from "../Hooks/useAuthContext"
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext"
// to make date looks better Ex: 2 days ago! date-fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContext"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const { isLightTheme ,dark ,light } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
  

    const handelDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`,
            },
        });
        const jsonData = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: jsonData });
        }
    };

 
    return (
        <div className="workout-details" style={{background:theme.bg, color: theme.syntax  }} key={workout._id}>
            <h4>{workout.title}</h4>
            <p style={{ color: theme.syntax  }}><strong>Reps: </strong>{workout.reps}</p>
            <p style={{ color: theme.syntax  }}><strong>Load: </strong>{workout.load}</p>
            <p style={{ color: theme.syntax  }}>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            {/* <hr /> */}
            <div className="actions">
                <span className="material-symbols-outlined deleteBtn" onClick={handelDelete}>Delete</span>
                <Link to={`/update/${workout._id}`}><span className="material-symbols-outlined">build</span></Link>

            </div>
        </div>
    )
}

export default WorkoutDetails
