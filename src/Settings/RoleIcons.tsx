import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { UserRole } from '../factories';

export const roleIcons = {
  [UserRole.Admin]: <AdminPanelSettingsIcon />,
  [UserRole.Editor]: <EditIcon />,
  [UserRole.Maintenance]: <BuildIcon />,
  [UserRole.Engineer]: <EngineeringIcon />,
};
