// src/components/Navbar/index.tsx
import { useEffect, useState } from "react"
import NavbarSidebar from "./NavBarSidebar"
import NavbarMobile from "./NavBarMobile"


export function NavbarUser() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // breakpoints 기준
  if (windowWidth < 640) return <NavbarMobile />
  return <NavbarSidebar showLabels={windowWidth >= 1024} />
}
