import { AuthProvider } from "./auth";
import { AppRouter } from "./router/AppRouter";


export default function HeoesApp() {
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}
