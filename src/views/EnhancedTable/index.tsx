import React from 'react';
import clsx from 'clsx';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import LinkIcon from '@material-ui/icons/Link';
import { APIService } from '../../services/api';
import { Avatar } from '@material-ui/core';
import CustomInput from '../../components/CustomInput/CustomInput';

interface Data {
    id:number;
    name:string;
    owner:any;
    default_branch:string;
    created_at:string;
    pushed_at:string;
    stargazers_count:number;
    watchers_count:number;
    html_url:string;
}

function createData(
    id:number,
    name:string,
    owner:any,
    default_branch:string,
    created_at:string,
    pushed_at:string,
    stargazers_count:number,
    watchers_count:number,
    html_url:string
): Data {
  return { id, name, owner, default_branch, created_at, pushed_at, stargazers_count, watchers_count, html_url };
}

const api = new APIService()
let rows:any[] = []

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: HeadCell[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name' },
  { id: 'owner', label: 'Owner' },
  { id: 'default_branch', label: 'Default Branch' },
  { id: 'created_at', label: 'Created At' },
  { id: 'pushed_at', label: 'Latest Pushed' },
  { id: 'stargazers_count', label: 'Stargazers' },
  { id: 'watchers_count', label: 'Watchers' },
  { id: 'html_url', label: 'Link' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">#</TableCell>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.id =='id' ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);
interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const [showFilterTab, setFilterTab] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const classes = useToolbarStyles();
  const { numSelected } = props;

  const showFilters = (e:any)=>{
    setFilterTab(!showFilterTab)
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        Repositories
      </Typography>
      {numSelected>0?<Typography className={classes.title} color="inherit" variant="subtitle1" component="span">
        {numSelected} selected
      </Typography>:null}
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list" onClick={showFilters}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      {showFilterTab?<CustomInput
        labelText="Search:"
        id="filter"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          type:"filter",
          onChange:(e:any)=>{ setFilter(e.currentTarget.value) },
          onBlur:(e:any)=>{ setFilter(e.currentTarget.value) }
        }}
      />:null}
      
    </Toolbar>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [rows, setRows] = React.useState<Data[]>([]);
  const [orderBy, setOrderBy] = React.useState<keyof Data>('created_at');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    if(rows.length==0){
        api.getRepos().then((res:any)=>{
          let repos:any = res
          let _temp:Data[] = []
          repos.map((item:any, index:any, list:any)=>{
              _temp.push(createData(item.id, item.name, item.owner, item.default_branch, item.created_at, item.pushed_at, item.stargazers_count, item.watchers_count, item.html_url))
          })
          setRows(_temp)
        }).catch(err=>console.error(err))
    }

    return (
    <div className={classes.root}>
        <Typography variant="h4">Decathlon</Typography>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
              <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size='small'
              aria-label="enhanced table"
              >
              <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
              />
              <TableBody>
                  {rows.length==0?null:stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row:any, index) => {
                      const isItemSelected = isSelected(row.name)
                      const labelId = `enhanced-table-checkbox-${index}`
                      let date = new Date(row.created_at).toLocaleString(), pusheddate = new Date(row.pushed_at).toLocaleString()
                      
                      return (
                      <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                      >
                          <TableCell padding="checkbox">
                              {(page*rowsPerPage)+index+1}
                          </TableCell>
                          <TableCell padding="checkbox">
                          <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                          />
                          </TableCell>
                          <TableCell component="th" id={labelId} scope="row" padding="none"> {row.id}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell><Avatar alt={row.owner.name} src={row.owner.avatar_url} /></TableCell>
                          <TableCell>{row.default_branch}</TableCell>
                          <TableCell>{date}</TableCell>
                          <TableCell>{pusheddate}</TableCell>
                          <TableCell>{row.stargazers_count}</TableCell>
                          <TableCell>{row.watchers_count}</TableCell>
                          <TableCell>
                              <a href={row.html_url} target="_blank" onClick={(e)=>{e.stopPropagation()}}>
                                  <IconButton aria-label="link list">
                                      <LinkIcon />
                                  </IconButton>
                              </a>
                          </TableCell>
                      </TableRow>
                      );
                  })}
                  {emptyRows > 0 && (
                  <TableRow style={{ height: 33 * emptyRows }}>
                      <TableCell colSpan={10} />
                  </TableRow>
                  )}
              </TableBody>
              </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
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
