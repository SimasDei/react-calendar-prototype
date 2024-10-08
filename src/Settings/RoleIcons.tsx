import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BuildIcon from '@mui/icons-material/Build';
import EditIcon from '@mui/icons-material/Edit';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { UserRole } from '../utils/factories';

export const roleIcons = {
  [UserRole.Admin]: <AdminPanelSettingsIcon color="primary" />,
  [UserRole.Editor]: <EditIcon color="primary" />,
  [UserRole.Maintenance]: <BuildIcon color="primary" />,
  [UserRole.Engineer]: <EngineeringIcon color="primary" />,
};
