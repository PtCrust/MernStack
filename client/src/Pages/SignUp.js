import { useState } from "react"
import { useSignUp } from "../Hooks/useSignUp"

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, isLoading, signup } = useSignUp();


    const handelSubmit = async (e) => {
        e.preventDefault()
        // console.log(email, password)
        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handelSubmit}>
            <h3>Sign Up</h3>

            {/* Email */}
            <label htmlFor="email" className="">Email: </label>
            <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            {/* Password */}
            <label htmlFor="password" className="">Password: </label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {/* Submit */}
            <button disabled={isLoading} type="submit">Sign Up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp
