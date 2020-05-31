import { useTheme } from '@material-ui/core';

export default function useContrastText(color: string | null) {
  const theme = useTheme();
  return theme.palette.getContrastText(
    color ?? theme.palette.background.default
  );
}
