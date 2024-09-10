import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  renderFields: (section: string) => JSX.Element[];
  section: string;
}

const FormModal: React.FC<FormModalProps> = ({ open, onClose, title, renderFields, section }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title} Details</DialogTitle>
      <DialogContent>{renderFields(section)}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
