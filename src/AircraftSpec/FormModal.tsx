import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  renderFields: (section: string, subsection?: string) => JSX.Element[];
  section: string;
  subsection?: string;
}

const FormModal: React.FC<FormModalProps> = ({ open, onClose, title, renderFields, section, subsection }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title} Details</DialogTitle>
      <DialogContent>{renderFields(section, subsection)}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
