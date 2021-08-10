import React from 'react';
import PropTypes from 'prop-types';

// import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import tableStyle from '../../assets/jss/material-dashboard-react/components/tableStyle';

function CustomTable({ ...props }: any) {
  const { classes, tableHead, tableData, tableHeaderColor, onSelectRow, onSelectColumn } = props;
  const onRowClick = (e:any, key:any)=>{
    if(onSelectRow) props.onSelectRow(e, key)
  }
  const onColumnClick = (e:any, key:any)=>{
    if(onSelectColumn) props.onSelectColumn(e, key)
  }
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow>
              {tableHead.map((prop: any, key: any) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell} style={{cursor:'pointer'}} key={key} onClick={(e)=> onSelectColumn?onColumnClick(e, key):null}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop: any, key: any) => {
            return (
              <TableRow className={onSelectRow?classes.tableRow:null} key={key} onClick={(e)=> onSelectRow?onRowClick(e, key):null}>
                {prop.map((p: any, k: any) => {
                  return <TableCell className={classes.tableCell} key={k} >{p}</TableCell>
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: 'gray'
};

// CustomTable.propTypes = {
//   classes: PropTypes.object.isRequired,
//   tableHeaderColor: PropTypes.oneOf([
//     'warning',
//     'primary',
//     'danger',
//     'success',
//     'info',
//     'rose',
//     'gray'
//   ]),
//   tableHead: PropTypes.arrayOf(PropTypes.string),
//   tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
//   onRowClick: PropTypes.func
// };

export default withStyles(tableStyle)(CustomTable);
