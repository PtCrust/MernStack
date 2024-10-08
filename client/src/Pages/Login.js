import { useState } from "react"
import { useLogin } from "../Hooks/useLogin"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, isLoading, login } = useLogin();

    const handelSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }

    return (
        <form className="login" onSubmit={handelSubmit}>
            <h3>Login</h3>

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
            <button type="submit" disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login
