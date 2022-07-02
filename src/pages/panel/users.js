import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import "./styles.css";

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 170 },
    { id: 'email', label: 'Correo electronico', minWidth: 100 },
    { id: 'role', label: 'Rol', minWidth: 100 }
  ];
const rows = [];

  function createData(name, email, role) {
    return { name, email, role };
  }
export default function Users(){
    const navigate = useNavigate();
    const getData = () => {
        axios.get('http://127.0.0.1:8000/api/user/')
        .then(res => {
            //rows = [];
            for(let e in res.data.data){
                rows.push(createData(res.data.data[e].name, res.data.data[e].email, res.data.data[e].id));
            }
        }, (error) => {
            localStorage.clear();
        });
    }
    React.useEffect(() => {
        getData();
        if (localStorage.getItem('token') == null) {
            navigate('/');
          }
    });
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    rows.map((row) =>{
        console.log(row);
    });
  return (
    <div className='table-container'>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell component="th" scope="row">{row.email}</TableCell>
              <TableCell component="th" scope="row">{row.role}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
  );
}