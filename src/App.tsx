import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme/theme-provider"
import AppLayout from "./components/layouts/AppLayout"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
