
import { Stack, Box } from "@mui/material";

export function CenterWrapper(props) {
  const boxStyling = {
    maxWidth: props.theWidth ? "lg" : "sm",
    width: props.theWidth ? props.theWidth : "70vw",
  }
  return (
      <Stack alignItems="center">
        <Box sx={ boxStyling }>
          {props.children}

        </Box>
      </Stack>
  )
}