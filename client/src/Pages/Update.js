import { useParams } from 'react-router-dom';
import  WorkoutsForm  from '../Components/UpdateWorkout'
const Update = () => {
    const { id } = useParams();
    return (
        <div>
            <WorkoutsForm id={id} />
        </div>
    )
}

export default Update