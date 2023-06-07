import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TableViewIcon from "@mui/icons-material/TableView";
import { useState } from "react";

interface Props {
  handleGoToRecords: () => void;
  handleGoToMain: () => void;
}

export const NavigationPanel = ({
  handleGoToRecords,
  handleGoToMain,
}: Props) => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon />}
          onClick={handleGoToMain}
        />
        <BottomNavigationAction
          label="View"
          icon={<TableViewIcon />}
          onClick={handleGoToRecords}
        />
      </BottomNavigation>
    </div>
  );
};
