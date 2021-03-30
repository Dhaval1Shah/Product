import React from 'react';
import { withStyles, makeStyles, useTheme, lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import FontAwesomeIconComponent from '../Layouts/FontAwesomeIconComponent';
import Typography from '@material-ui/core/Typography';

export default function TableComponent(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState(props.tableTh[0]);
  const [orderBy, setOrderBy] = React.useState(props.tableTh[0]);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.tableData.length - page * rowsPerPage);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getActionBtns = (props, row) => {
    return <div>
      <Grid container spacing="{3}">
        {(props.actionBtns.indexOf('update') > -1) ? <Grid item xs="{12}"> <IconButton variant="contained" color="primary" onClick={(e) => { (props.openPopUpUpdate !== false) ? props.openPopUpUpdate(row) : props.history.push(props.updateRoute + '/' + row.id) }}><Tooltip title="Update" aria-label="Update"><FontAwesomeIconComponent classes="fa fa-edit" colorName="primary" fontSize={"small"} /></Tooltip></IconButton> </Grid> : ""}
        {(props.actionBtns.indexOf('delete') > -1) ? <Grid item xs="{12}"> <IconButton variant="contained" color="primary" onClick={(e) => { props.removeRow(row.id) }}><Tooltip title="Delete" aria-label="Delete"><FontAwesomeIconComponent classes="fa fa-trash" colorName="primary" fontSize={"small"} /></Tooltip></IconButton> </Grid> : ""}
      </Grid>
    </div>
  };

  let th = [];

  let td = [];
  let tr = [];
  if (Object.keys(props.tableData).length > 0) {
    let tableRows = props.tableData;
    if (rowsPerPage > 0) {
      tableRows = props.tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
    tableRows = stableSort(tableRows, getComparator(order, orderBy))
    Object.keys(tableRows).forEach((key) => {
      Object.keys(tableRows[key]).forEach((i) => {
        if (props.colNameToShow.indexOf(i) > -1) {
          td.push(<TableCell align="left">{tableRows[key][i]}</TableCell>)
        }
      })
      td.push(<TableCell align="left">{getActionBtns(props, tableRows[key])}</TableCell>)
      tr.push(<StyledTableRow key={key}>{td}</StyledTableRow>);
      td = [];
    })

    if (emptyRows > 0) {
      tr.push(<TableRow style={{ height: 67 * emptyRows }}> <TableCell colSpan={Object.keys(props.tableTh).length} /> </TableRow>)
    }
  } 
  else {
    td.push(<TableCell colSpan={Object.keys(props.tableTh).length} align="center">No data found</TableCell>)
    tr.push(<StyledTableRow key={1}>{td}</StyledTableRow>);
  }

  return (
    <TableContainer component={Paper} style={{ marginBottom: '5%' }}>
      <Typography variant="h2">Manage {props.modelName}</Typography>
      <Button variant="contained" color="primary" style={{ float: "right", margin: "22px" }} onClick={(e) => { (props.openPopUp !== false) ? props.openPopUp() : props.history.push(props.addRoute) }}>Add</Button>
      <Table className={classes.table} aria-label="customized table" style={{ tableLayout: 'fixed', width: '100%' }}>
        <TableHead>
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={props.tableTh.length}
            tableTh={props.tableTh}
          />
        </TableHead>
        <TableBody>
          {tr}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  head: {
    backgroundColor: '#1B6E95',
    color: '#fff',
    margin: '0 auto',
    '& th': {
      color: '#fff',
    },
    '& th > span:hover': {
      color: '#fff',
    },
    '& th:hover': {
      color: '#fff',
    },
    '& th:active': {
      color: '#fff',
    },
    '& th > span:active': {
      color: '#fff',
    }
  }
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = () => {
    onChangePage(0);
  };

  const handleBackButtonClick = () => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => () => {
    onRequestSort(property);
  };

  return (
    <TableRow className={classes.head}>
      {props.tableTh.map((headCell) => (
        <TableCell
          key={headCell.id}
          align={headCell.numeric ? 'right' : 'left'}
          padding="10%"
          maxWidth="300px"
          whiteSpace="normal"
          sortDirection={orderBy === headCell.id ? order : false}
        >
          {
            (headCell.sortable === true) ? <TableSortLabel
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {(orderBy === headCell.id) ? (
                <span className={classes.visuallyHidden}>
                </span>
              ) : null}
            </TableSortLabel> : headCell.label
          }
        </TableCell>
      ))}
    </TableRow>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};