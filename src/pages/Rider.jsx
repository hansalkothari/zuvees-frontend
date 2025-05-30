import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Box, CircularProgress, Alert, FormControl, Select, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function RiderDashboard() {
  const [rider, setRider] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('email'); // Ideally use a Google Sign-In
    async function fetchOrders() {
      try {
        setLoading(true);
        const res = await axios.get(`https://zuvees-backend-l2o0.onrender.com/api/rider/orders/${email}`);
        setOrders(res.data.orders);
        setRider({ email });
      } catch (err) {
        console.error('Failed to fetch rider orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`https://zuvees-backend-l2o0.onrender.com/api/admin/orders/${orderId}`, { status: newStatus });
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Failed to update order status:', err);
    }
  };

  const columns = [
    { field: '_id', headerName: 'Order ID', width: 250 },
    { field: 'customerEmail', headerName: 'Customer Email', width: 250 },
    { field: 'address', headerName: 'Address', width: 300 },
    { field: 'contactNumber', headerName: 'Contact', width: 180 },
    {
      field: 'products', headerName: 'Products', width: 400,
      renderCell: (params) => {
        return params.row.products.map((p, i) => (
          <div key={i}>
            {p.name} - {p.selectedColor}, {p.selectedSize}, Qty: {p.quantity}
          </div>
        ));
      }
    },
    {
      field: 'status', headerName: 'Status', width: 220,
      renderCell: (params) => (
          <FormControl fullWidth>
            <Select
              size="small"
              value={params.row.status}
              onChange={(e) => updateOrderStatus(params.row._id, e.target.value)}
            >
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="undelivered">Undelivered</MenuItem>
            </Select>
          </FormControl> 
      )
    }
  ];

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" my={4} align="center">Rider Dashboard</Typography>
      {orders.length === 0 ? (
        <Alert severity="info">No orders assigned yet.</Alert>
      ) : (
        <Box sx={{ height: '80vh', width: '100%' }}>
          <DataGrid
            rows={orders.map(order => ({ ...order, id: order._id }))}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20]}
            disableSelectionOnClick
            getRowHeight={() => 'auto'}
          />
        </Box>
      )}
    </Container>
  );
}
