import CasinoIcon from "@mui/icons-material/Casino";
import { styled } from "@mui/system";

const RotatingIcon = styled(CasinoIcon)({
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
});

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <RotatingIcon style={{ fontSize: 50 }} />
    </div>
  );
}
