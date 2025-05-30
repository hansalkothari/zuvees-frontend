import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, CircularProgress, Alert,
  Box, Select, MenuItem, FormControl, InputLabel, Button
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [ordersRes, ridersRes] = await Promise.all([
          axios.get('http://localhost:3000/api/admin/orders'),
          axios.get('http://localhost:3000/api/admin/riders')
        ]);
        setOrders(ordersRes.data.orders);
        setRiders(ridersRes.data.riders);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const updateOrder = async (orderId, updates) => {
    try {
      if (updates.status === 'shipped' && !updates.rider) {
        alert('Please assign a rider after marking the order as shipped.');
      }

      await axios.patch(`http://localhost:3000/api/admin/orders/${orderId}`, updates);
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, ...updates } : order
        )
      );
    } catch (err) {
      console.error(err);
      alert('Failed to update order');
    }
  };
 

  if (loading) return (
    <Container>
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    </Container>
  );

  if (error) return (
    <Container>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  const columns = [
    { field: '_id', headerName: 'Order ID', width: 200 },
    { field: 'customerEmail', headerName: 'Customer', width: 200 },
    {
      field: 'products', headerName: 'Product',
      width: 300,
      renderCell: (params) => {
        const p = params.row.products[0];  // Each order has 1 product
        return `${p.name} - ${p.selectedColor}, ${p.selectedSize}, Qty: ${p.quantity}`;
      }
    },
    {
      field: 'status', headerName: 'Status', width: 180,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            size="small"
            value={params.row.status}
            onChange={(e) => updateOrder(params.row._id, { status: e.target.value })}
          >
            {['ordered', 'placed and paid', 'shipped', 'delivered', 'undelivered'].map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    },
    {
      field: 'rider', headerName: 'Rider', width: 220,
      renderCell: (params) => (
        <FormControl fullWidth>
          <Select
            size="small"
            value={params.row.rider}
            onChange={(e) =>updateOrder(params.row._id, {rider: e.target.value})}
          >
            <MenuItem value="unassigned">Unassigned</MenuItem>
            {riders.map(r => (
              <MenuItem key={r._id} value={r.email}>{r.email}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" my={4} align="center">Admin Dashboard - Orders</Typography>
      <Box height={600}>
        <DataGrid
          rows={orders.map(order => ({ ...order, id: order._id }))}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20]}
          disableSelectionOnClick
          getRowHeight={() => 'auto'}
        />
      </Box>
    </Container>
  );
}
