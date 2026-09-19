import { useContext } from "react"
import { ThemeContext } from "../contexts/ThemeContexts"


export function useTheme(){
    const [isDark, setIsDrak] = useContext(ThemeContext)
    return [isDark, setIsDrak]
}