import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import JournalIcon from '@material-ui/icons/Message';
import SettingsIcon from '@material-ui/icons/Settings';
import SurveyIcon from '@material-ui/icons/Assignment';
import PatternIcon from '@material-ui/icons/AllInclusive';
import InfoIcon from '@material-ui/icons/DonutSmall';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'recompose';

const categories = [
  {
    id: 'Menu',
    children: [
      { id: 'Home', icon: <HomeIcon />, link: '/', sublink: '/event' },
      {
        id: 'Add Entry',
        icon: <JournalIcon />,
        link: '/addEntry',
        sublink: '/entries',
      },
      {
        id: 'Add Survey',
        icon: <SurveyIcon />,
        link: '/addSurvey',
        sublink: '/surveys',
      },
      {
        id: 'Thought Patterns',
        icon: <PatternIcon />,
        link: '/patterns',
        sublink: null,
      },
      {
        id: 'Account',
        icon: <SettingsIcon />,
        link: '/settings',
        sublink: null,
      },
      // { id: 'About', icon: <InfoIcon />, link: '/about'}
    ],
  },
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  list: {
    marginTop: '20px',
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {
  const {
    classes,
    location: { pathname },
    staticContext,
    ...other
  } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          className={clsx(classes.firebase, classes.item, classes.itemCategory)}
        >
          Cerebral
        </ListItem>
        <ListItem
          className={clsx(classes.item, classes.itemCategory)}
          component={Link}
          to="/about"
        >
          <ListItemIcon className={classes.itemIcon}>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            About
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <div className={classes.list}>
              {children.map(({ id: childId, icon, link, sublink }) => (
                <ListItem
                  key={childId}
                  button
                  component={Link}
                  to={link}
                  className={clsx(
                    classes.item,
                    (pathname === link || pathname === sublink) &&
                      classes.itemActiveItem
                  )}
                >
                  <ListItemIcon className={classes.itemIcon}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              ))}
            </div>
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withRouter, withStyles(styles))(Navigator);
