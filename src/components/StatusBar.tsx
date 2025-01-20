import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";

export default function StatusBar() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex mr-6">
        <GroupIcon className="w-6 h-6 mr-2" /> 14
      </div>

      <div className="flex">
        <HomeIcon className="w-6 h-6 mr-2" /> -5403.123
      </div>
    </div>
  );
}
