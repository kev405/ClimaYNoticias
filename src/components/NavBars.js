import React, { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
  });

const NavBars = (props) => {

        const classes = useStyles();
        const routes = ["/News", "/Weather", "/History"]

        return (
            <Fragment>
        <Paper square className={classes.root}>
                <Tabs
                    value={props.history.location.pathname}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon tabs example"
                >   
                        <Tab 
                        label="News" 
                        value={routes[0]} 
                        component={Link} 
                        to={routes[0]} 
                        />
                        <Tab 
                        label="Weather" 
                        value={routes[1]} 
                        component={Link} 
                        to={routes[1]}
                        />
                        <Tab 
                        label="History" 
                        value={routes[2]} 
                        component={Link} 
                        to={routes[2]}
                        />
                </Tabs>
        </Paper>
        </Fragment>
        )
}

export default NavBars;