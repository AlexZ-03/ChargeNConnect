import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Grid
} from '@mui/material';

const StationDialog = ({ open, onClose, station, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    pricePerHour: '',
    powerOutput: '',
    available: true,
    description: ''
  });

  useEffect(() => {
    if (station) {
      setFormData({
        name: station.name || '',
        address: station.address || '',
        city: station.city || '',
        state: station.state || '',
        zipCode: station.zipCode || '',
        pricePerHour: station.pricePerHour || '',
        powerOutput: station.powerOutput || '',
        available: station.available ?? true,
        description: station.description || ''
      });
    } else {
      // Reset form when adding new station
      setFormData({
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        pricePerHour: '',
        powerOutput: '',
        available: true,
        description: ''
      });
    }
  }, [station]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData(prev => ({
      ...prev,
      available: e.target.checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      pricePerHour: parseFloat(formData.pricePerHour),
      powerOutput: parseFloat(formData.powerOutput),
      address: formData.address,
      city: formData.city || '',
      state: formData.state || '',
      zipCode: formData.zipCode || ''
    };
    onSubmit(submissionData);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#2A2D3E',
          color: '#FFFFFF'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {station ? 'Edit Station' : 'Add New Station'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="name"
              label="Station Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="address"
              label="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="zipCode"
                  label="ZIP Code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <TextField
              name="powerOutput"
              label="Power Output (kW)"
              type="number"
              value={formData.powerOutput}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="pricePerHour"
              label="Price per Hour (₹)"
              type="number"
              value={formData.pricePerHour}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              name="description"
              label="Description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.available}
                  onChange={handleSwitchChange}
                  name="available"
                  color="primary"
                />
              }
              label="Available"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', p: 2 }}>
          <Button 
            onClick={onClose}
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            variant="contained"
            sx={{ bgcolor: '#0075FF' }}
          >
            {station ? 'Save Changes' : 'Add Station'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StationDialog; 