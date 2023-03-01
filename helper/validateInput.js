// Helper function to validate input data while creating a new deal by admin
export const validateInput = (data)=> {
    if (!data.productName) {
      return 'Name is required';
    }
    if (!data.actualPrice) {
      return 'Actual price is required';
    }
    if (!data.finalPrice) {
      return 'Final price is required';
    }
    if (!data.totalUnits) {
      return 'Total units is required';
    }
    if (!data.availableUnits) {
      return 'Available units is required';
    }
    if (!data.expiryTime) {
      return 'Expiry time is required';
    }
    try {
      const expiryTime = new Date(data.expiryTime);
      if (expiryTime < Date.now()) {
        return 'Expiry time cannot be in the past';
      }
    } catch (error) {
      return 'Invalid expiry time format';
    }
  }