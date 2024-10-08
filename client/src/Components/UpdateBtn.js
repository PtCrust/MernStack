import React from 'react'

const UpdateBtn = (params) => {
    const handelSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/workouts/${params._id}`,{
            method: 'Patch',
            body: JSON.stringify(params),
            headers: {'Content-Type': 'application/json'},
        })

    }
    return (
        <form onSubmit={handelSubmit}>
            <button type='submit'>Update</button>
        </form>
    )
}

export default UpdateBtn
