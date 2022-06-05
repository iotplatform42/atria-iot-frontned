/** @jsxImportSource @emotion/react */
import { Button, css, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";

interface IDebugModeContext {
  debug: boolean;
}

const DebugModeContext = createContext<IDebugModeContext>(
  {} as IDebugModeContext
);

export const useDebugMode = () => useContext(DebugModeContext);

export function DebugModeContextProvider({ children }: any) {
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    if (debug) {
      document.designMode = "on";
      // @ts-ignore
      window.debug = true;
    } else {
      document.designMode = "off";
      // @ts-ignore
      window.debug = false;
    }
  }, [debug]);

  useEffect(() => {
    const shortcutHandler = (e: KeyboardEvent) => {
      // double click d
      if (e.key === "D" && e.shiftKey) {
        setDebug((d) => !d);
      }
    };

    window.addEventListener("keydown", shortcutHandler);
    return () => {
      window.removeEventListener("keydown", shortcutHandler);
    };
  }, []);
  const theme = useTheme();
  return (
    <DebugModeContext.Provider value={{ debug }}>
      <AnimatePresence>
        {debug && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            css={css`
              overflow: hidden;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: ${theme.palette.error.main};
            `}
            contentEditable={false}
          >
            <div
              css={css`
                min-width: 1050px;
                padding: 0.8rem 1.6rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <div>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  fontWeight={800}
                >
                  Debug mode
                </Typography>
              </div>
              <div>
                <Button
                  size="small"
                  color="inherit"
                  variant="outlined"
                  onClick={(e) => setDebug(false)}
                >
                  disable
                </Button>
              </div>
            </div>
            {/* <div
              css={css`
                padding-bottom: 8px;
                cursor: pointer;
                a {
                  padding: 0 1rem;
                }
              `}
            >
              <Link color="inherit" href="/">
                /
              </Link>
              <Link color="inherit" href="/pr">
                /pr
              </Link>
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </DebugModeContext.Provider>
  );
}

// var delta = 200;
// var lastKeypressTime = 0;
// function KeyHandler(
//   event: KeyboardEvent,
//   callback: (event: KeyboardEvent) => void
// ) {
//   if (event.key === "d") {
//     var thisKeypressTime = Date.now();
//     if (thisKeypressTime - lastKeypressTime <= delta) {
//       callback(event);
//       // optional - if we'd rather not detect a triple-press
//       // as a second double-press, reset the timestamp
//       thisKeypressTime = 0;
//     }
//     lastKeypressTime = thisKeypressTime;
//   }
// }
