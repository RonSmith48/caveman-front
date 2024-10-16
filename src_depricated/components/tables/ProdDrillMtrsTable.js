import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const renderConstAttributes = (drill) => {
  const attributes = [
    {
      title: 'Non Productive Mtrs',
      data: drill.headings[0].oredrv.mtrs,
      css: drill.headings[0].oredrv.css
    },
    {
      title: 'Servicing (hrs)',
      data: drill.headings[1].oredrv.hrs,
      css: drill.headings[1].oredrv.css
    },
    {
      title: 'Un-planned Maint (hrs)',
      data: drill.headings[2].oredrv.hrs,
      css: drill.headings[2].oredrv.css
    }
  ];

  return (
    <>
      {attributes
        .filter((attribute) => attribute.data['15'] !== 0)
        .map((attribute) => (
          <TableRow key={attribute.title}>
            <TableCell key="0" style={{ paddingTop: '1px', paddingBottom: '1px', backgroundColor: '#f7f7f7' }}>
              {attribute.title}
            </TableCell>
            {Object.keys(attribute.data).map((key) => (
              <TableCell
                key={key}
                align="center"
                className={attribute.css[key]}
                style={{ paddingTop: '1px', paddingBottom: '1px', backgroundColor: '#f7f7f7' }}
              >
                {attribute.data[key] !== 0 ? attribute.data[key] : ''}
              </TableCell>
            ))}
          </TableRow>
        ))}
    </>
  );
};

const renderRemainingAttributes = (drill, isCollapsed, toggleCollapse) => {
  const remainingAttributes = drill.headings.slice(3).map((heading) => ({
    title: heading.name,
    total_mtrs: heading.oredrv['prod total mtrs'].mtrs,
    css: heading.oredrv['prod total mtrs'].css,
    man_mtrs: heading.oredrv['man mtrs'].mtrs,
    man_css: heading.oredrv['man mtrs'].css,
    auto_mtrs: heading.oredrv['auto mtrs'].mtrs,
    auto_css: heading.oredrv['auto mtrs'].css
  }));

  return (
    <>
      {remainingAttributes.map((attribute, index) => (
        <React.Fragment key={attribute.title}>
          <TableRow>
            <TableCell>
              <Button onClick={() => toggleCollapse(index)}>{isCollapsed ? attribute.title : attribute.title}</Button>
            </TableCell>
            {Object.keys(attribute.total_mtrs).map((key) => (
              <React.Fragment key={key}>
                <TableCell key={key} align="center" className={attribute.css[key]} style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                  {attribute.total_mtrs[key] !== 0 ? attribute.total_mtrs[key] : ''}
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
          {isCollapsed && renderCollapsedAttributes(attribute)}
        </React.Fragment>
      ))}
    </>
  );
};

const renderCollapsedAttributes = (drive) => {
  const manAttributes = [
    {
      title: 'Man Mtrs',
      data: drive.man_mtrs,
      css: drive.man_css
    },
    {
      title: 'Auto Mtrs',
      data: drive.auto_mtrs,
      css: drive.auto_css
    }
  ];
  const columnKeys = Array.from({ length: 15 }, (_, index) => (index + 1).toString());

  return (
    <>
      {manAttributes.map((attribute) => (
        <TableRow key={attribute.title}>
          <TableCell style={{ paddingTop: '1px', paddingBottom: '1px', backgroundColor: '#FDF5E6' }}>{attribute.title}</TableCell>
          {columnKeys.map((key) => (
            <TableCell
              key={key}
              align="center"
              className={attribute.css[key]}
              style={{ paddingTop: '1px', paddingBottom: '1px', backgroundColor: '#FDF5E6' }}
            >
              {attribute.data[key] !== 0 ? attribute.data[key] : ''}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

const renderTableBody = (drillMtrs, isCollapsed, toggleCollapse) => {
  return drillMtrs.map((drill, index) => (
    <React.Fragment key={index}>
      <TableRow>
        <TableCell
          align="left"
          colSpan="16"
          style={{ fontWeight: 'bold', backgroundColor: '#e9e9e9', color: 'black', paddingTop: '0px', paddingBottom: '0px' }}
        >
          {drill.drillname}
        </TableCell>
      </TableRow>
      <React.Fragment key={drill.drillname}>
        {renderRemainingAttributes(drill, isCollapsed, toggleCollapse)}
        {renderConstAttributes(drill)}
      </React.Fragment>
    </React.Fragment>
  ));
};

const PDrillActualsTable = ({ data }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  if (!data || !data.drill_mtrs) {
    return null;
  }

  const drillMtrs = data.drill_mtrs;
  const dates = data['day month dates'];

  const renderHeaderCells = () => {
    const headerCells = [];
    const headerLineTwo = [];

    headerCells.push(
      <TableCell key="heading" align="left" padding="normal" rowSpan={2}>
        Heading
      </TableCell>
    );

    for (let i = 0; i < 7; i++) {
      headerCells.push(
        <TableCell key={`mon-${i}`} align="center" padding="none" colSpan={2}>
          {`${dates[i]}`}
        </TableCell>
      );

      headerLineTwo.push(
        <>
          <TableCell key={`ds-${i}`} align="center" padding="none">
            DS
          </TableCell>
          <TableCell key={`ns-${i}`} align="center" padding="none">
            NS
          </TableCell>
        </>
      );
    }

    headerCells.push(
      <TableCell key="totals" align="center" padding="normal" rowSpan={2}>
        WTD
        <br />
        Total
      </TableCell>
    );

    return [headerCells, headerLineTwo];
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>{renderHeaderCells()[0]}</TableRow>
          <TableRow>{renderHeaderCells()[1]}</TableRow>
        </TableHead>
        <TableBody>{renderTableBody(drillMtrs, isCollapsed, toggleCollapse)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PDrillActualsTable;
