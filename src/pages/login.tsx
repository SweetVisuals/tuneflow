import { AuthContainer } from "../components/auth/auth-container"
import { useNavigate } from "react-router-dom"

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    navigate('/?tab=discover')
  }

  return (
    <AuthContainer 
      className="w-full max-w-md mx-auto my-10"
      onLoginSuccess={handleLoginSuccess}
    />
  )
}
