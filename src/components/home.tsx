/** @jsxImportSource @emotion/react */
import {
  Avatar,
  Box,
  Button,
  css,
  darken,
  IconButton,
  List,
  ListItemIcon,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDefault } from "../contexts/DefaultContext";
import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useSignOut } from "react-supabase";
export function Home() {
  const { group } = useDefault();
  const navigate = useNavigate();
  const [{ error, fetching }, signOut] = useSignOut();

  //   const theme = useTheme();

  return (
    <Box
      css={css`
        display: flex;
        align-items: stretch;
        height: 100vh;
      `}
    >
      <Paper
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            padding: 1rem 2rem;
            min-width: 250px;
          `}
        >
          <Typography variant="h5" fontWeight={800}>
            IoT Sandbox
          </Typography>
          <Typography variant="subtitle1">Hosted by {group}</Typography>
        </div>
        <List>
          <MenuItem selected>
            <ListItemIcon>
              <CloudQueueRoundedIcon />
            </ListItemIcon>
            Devices
          </MenuItem>
          <MenuItem disabled>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>
            Stats
          </MenuItem>
        </List>
        <Box
          css={css`
            margin-top: auto;
            padding: 1rem;
          `}
        >
          <Button
            onClick={() => {
              signOut();
            }}
            color="error"
            size="small"
            variant="outlined"
          >
            Log out
          </Button>
        </Box>
      </Paper>
      <Dash />
    </Box>
  );
}

type DeviceType = {
  name: string;
  state: boolean;
  lastUpdated: string;
  id: string;
};
function Dash() {
  const [devices, setDevices] = useState<DeviceType[]>([]);
  const theme = useTheme();
  return (
    <Box
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
      `}
    >
      {/* dash header */}
      <Box
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div
          css={css`
            padding: 1rem 2rem;
            min-width: 250px;
          `}
        >
          <Typography variant="h5" fontWeight={800}>
            Devices{" "}
            <IconButton
              onClick={() =>
                setDevices((ds) => [
                  ...ds,
                  {
                    name: `Switch ${ds.length + 1}`,
                    state: true,
                    lastUpdated: "last updated 2mins ago",
                    id: nanoid(),
                  },
                ])
              }
            >
              <AddRoundedIcon />
            </IconButton>
          </Typography>
          <Typography variant="subtitle1">{devices.length} devices</Typography>
        </div>
        <div
          css={css`
            padding: 0 2rem;
          `}
        >
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>A</Avatar>
        </div>
      </Box>
      {/* dash body */}
      <Box
        css={css`
          height: 100%;
          overflow-y: scroll;
        `}
      >
        {!devices.length ? (
          <Box
            css={css`
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Box
              css={css`
                max-width: 400px;
                margin-bottom: 200px;
                background: ${darken(theme.palette.primary.main, 0.85)};
                border: 2px solid ${theme.palette.primary.main};
                border-radius: 1rem;
                padding: 2rem 4rem;
                min-width: 800px;
                min-height: 400px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              `}
            >
              <Typography variant="h5" fontWeight={800}>
                No Devices
              </Typography>
              <Typography variant="subtitle1" mb={1}>
                add new device to add to this list
              </Typography>
              <Button
                variant="contained"
                sx={{ borderRadius: 42 }}
                size="large"
                onClick={() => {
                  setDevices((ds) => [
                    ...ds,
                    {
                      name: `Switch ${ds.length + 1}`,
                      state: true,
                      lastUpdated: "last updated 2mins ago",
                      id: nanoid(),
                    },
                  ]);
                }}
              >
                add device
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            css={css`
              display: flex;
              padding: 1rem 2rem;
              gap: 1rem;
              flex-wrap: wrap;
            `}
          >
            {devices.map((device) => (
              <Box
                css={css`
                  background: ${darken(theme.palette.primary.main, 0.85)};
                  border: 2px solid ${theme.palette.primary.main};
                  border-radius: 1rem;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 2rem;
                `}
              >
                <Typography variant="h5">{device.name}</Typography>
                <Typography variant="h1">
                  {device.state ? "ON" : "OFF"}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() =>
                    setDevices((ds) =>
                      ds.map((d) => {
                        if (d.id === device.id) {
                          d.state = !d.state;
                        }
                        return d;
                      })
                    )
                  }
                >
                  Toggle
                </Button>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
