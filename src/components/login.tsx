/** @jsxImportSource @emotion/react */
import {
  Box,
  Container,
  TextField,
  Typography,
  useTheme,
  css,
  Button,
  darken,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "react-supabase";
import { useDefault } from "../contexts/DefaultContext";
import { useEffect } from "react";

export function Login() {
  const theme = useTheme();
  const { group } = useDefault();
  const [signin, setSignin] = useState<boolean>(true);
  const navigate = useNavigate();
  const [{ error, fetching, session, user }, signIn] = useSignIn();
  const [signupProps, signUp] = useSignUp();

  const [creds, setCreds] = useState({ email: "", password: "" });

  useEffect(() => {
    console.log(error, fetching, session, user);
    if (error || signupProps.error) {
      alert(error?.message || signupProps.error?.message);
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [error, fetching, navigate, session, user, signupProps]);

  return (
    <Container
      css={css`
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100vh;
      `}
    >
      <Box
        css={css`
          background: ${darken(theme.palette.primary.main, 0.85)};
          border: 2px solid ${theme.palette.primary.main};
          border-radius: 1rem;
          padding: 2rem 4rem;
          min-width: 800px;
          min-height: 400px;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
        `}
      >
        <Box
          css={css`
            flex: 1;
            display: flex;
            /* align-items: center; */
            justify-content: center;
            flex-direction: column;
            border-right: 1px solid ${theme.palette.divider};
          `}
        >
          <Typography variant="h5" fontWeight={800}>
            IoT Sandbox
          </Typography>
          <Typography variant="subtitle1">Hosted by {group}</Typography>
          <Box>
            <TextField
              onChange={(e) =>
                setCreds((v) => ({ ...v, email: e.target.value }))
              }
              variant="standard"
              label="email"
              type={"email"}
            />
            <TextField
              onChange={(e) =>
                setCreds((v) => ({ ...v, password: e.target.value }))
              }
              variant="standard"
              label={signin ? "password" : "Create password"}
              type={signin ? "password" : "email"}
            />
            <div
              css={css`
                display: flex;

                margin-top: 1rem;
              `}
            >
              <Button
                disabled={!(creds.email && creds.password)}
                css={css`
                  border-radius: 42px;
                `}
                variant="outlined"
                onClick={(e) => {
                  if (signin) {
                    signIn(creds, { redirectTo: "/dashboard" });
                    return;
                  }
                  signUp(creds, { redirectTo: "/dashboard" });
                }}
              >
                {signin ? "sign in" : "sign up"}
              </Button>

              <Button onClick={() => setSignin((s) => !s)}>
                {signin ? "sign up" : "sign in"}
              </Button>
            </div>
          </Box>
        </Box>

        <Box
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <Button
            color="success"
            variant="contained"
            sx={{ borderRadius: 42 }}
            size="large"
            onClick={() => {
              // signIn({ provider: "google" }).then(() => console.log("auth"));
            }}
          >
            Sign in with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
