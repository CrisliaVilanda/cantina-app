"use client";

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

//consts
const DEFAULT_THEME = "light"

export function ThemeToggle() {
  const [theme, setTheme] = useState(DEFAULT_THEME)

  useEffect(() => {
    //verifica se o tema está salvo no localStorage
    const savedTheme = localStorage.getItem("theme") || DEFAULT_THEME
    //modificar o tema no estado
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  },[])


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    //grava o tema no localStorage
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark")
  }
    return (

    <Button
      variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "light" ? <Moon className="h-5 w-5" /> :  <Sun className="h-5 w-5" /> }
    </Button>
  )
}