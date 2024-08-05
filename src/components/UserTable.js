import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, TableSortLabel, Avatar, TablePagination, Box, Select, MenuItem, FormControl, InputLabel, IconButton, Typography
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


const UserTable = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [page, setPage] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedGender, setSelectedGender] = useState('');

  // Fetch data from API
  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => setUsers(response.data.users))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle country filter change
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  // Handle gender filter change
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  // Filter users 
  const filteredUsers = () => {
    return users.filter(user => {
      return (selectedCountry === '' || user.address.country === selectedCountry) &&
             (selectedGender === '' || user.gender === selectedGender);
    });
  };

  // Sort users 
  const sortedUsers = () => {
    return filteredUsers().sort((a, b) => {
      if (orderBy === 'fullName') {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;
        if (nameA < nameB) return order === 'asc' ? -1 : 1;
        if (nameA > nameB) return order === 'asc' ? 1 : -1;
        return 0;
      }

      if (orderBy === 'demography') {
        const demoA = `${a.gender}/${a.age}`;
        const demoB = `${b.gender}/${b.age}`;
        if (demoA < demoB) return order === 'asc' ? -1 : 1;
        if (demoA > demoB) return order === 'asc' ? 1 : -1;
        return 0;
      }

      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  // Paginate users
  const paginatedUsers = sortedUsers().slice(page * 10, page * 10 + 10);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 2 }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
          Employees
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedCountry}
              onChange={handleCountryChange}
              label="Country"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {Array.from(new Set(users.map(user => user.address.country))).map(country => (
                <MenuItem key={country} value={country}>{country}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={selectedGender}
              onChange={handleGenderChange}
              label="Gender"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {Array.from(new Set(users.map(user => user.gender))).map(gender => (
                <MenuItem key={gender} value={gender}>{gender}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2, margin: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell
                sortDirection={orderBy === 'id' ? order : false}
                sx={{ padding: '8px 16px' }}
              >
                <TableSortLabel
                  active={true}  
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={() => handleRequestSort('id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ padding: '8px 16px' }}>Image</TableCell>
              <TableCell
                sortDirection={orderBy === 'fullName' ? order : false}
                sx={{ padding: '8px 16px' }}
              >
                <TableSortLabel
                  active={true} 
                  direction={orderBy === 'fullName' ? order : 'asc'}
                  onClick={() => handleRequestSort('fullName')}
                >
                  Full Name
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={orderBy === 'demography' ? order : false}
                sx={{ padding: '8px 16px' }}
              >
                <TableSortLabel
                  active={true}  
                  direction={orderBy === 'demography' ? order : 'asc'}
                  onClick={() => handleRequestSort('demography')}
                >
                  Demography
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ padding: '8px 16px' }}>Designation</TableCell>
              <TableCell sx={{ padding: '8px 16px' }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell sx={{ padding: '8px 16px' }}>{user.id}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.image} />
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{user.gender}/{user.age}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>{user.company.title}</TableCell>
                <TableCell sx={{ padding: '8px 16px' }}>
                  {user.address.state}, {user.address.country}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={filteredUsers().length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={() => {}}
          sx={{
            '.MuiTablePagination-selectLabel, .MuiTablePagination-select': {
              display: 'none',
            },
          }}
        />
      </TableContainer>
    </Box>
  );
};

export default UserTable;
