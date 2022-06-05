/** @jsxImportSource @emotion/react */
import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { DarkThemeOptions, Globals, LightThemeOptions } from "../theme";
import { DebugModeContextProvider } from "./DebugModeContext";

interface IDefaultContext {
  group: "G42" | "B33";
  setGroup: React.Dispatch<React.SetStateAction<"G42" | "B33">>;
}

export const DefaultContext = createContext<IDefaultContext>(
  {} as IDefaultContext
);

export const useDefault = () => useContext(DefaultContext);

const darkTheme = createTheme(DarkThemeOptions);
const lightTheme = createTheme(LightThemeOptions);

export function DefaultContextProvider({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  const [theme, setTheme] = useState(darkTheme);

  const [group, setGroup] = useState<"G42" | "B33">("B33");
  useEffect(() => {
    // @ts-ignore
    document.title = `${group} | IoT Sandbox`;
  }, [group]);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "d" && e.ctrlKey) {
        setTheme((t) => {
          if (t.palette.mode === "dark") {
            return lightTheme;
          }
          return darkTheme;
        });
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Globals />
      <DefaultContext.Provider value={{ group, setGroup }}>
        <DebugModeContextProvider>{children}</DebugModeContextProvider>
      </DefaultContext.Provider>
    </ThemeProvider>
  );
}
