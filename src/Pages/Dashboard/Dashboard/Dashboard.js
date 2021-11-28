import { Switch, Route, useRouteMatch, Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import AddProduct from '../AddProduct/AddProduct'
import ManageOrders from '../ManageOrders/ManageOrders';
import DashboardHome from '../DashboardHome/DashboardHome'
import NotFound from '../../NotFound/NotFound';
import MyOrders from '../MyOrders/MyOrders';
import ManageProduct from '../ManageProduct/ManageProduct';
import MakeReview from '../MakeReview/MakeReview';
import Pay from '../Pay/Pay';
import Home from '../../Home/Home/Home';
import useAuth from '../../../hooks/useAuth';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 275;

function Dashboard(props) {
    const { logOut, admin } = useAuth();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    let { path, url } = useRouteMatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="mt-4">
            <Toolbar />

            <ListItem button>
                <Link className="list-group-item w-100 text-success" to="/"><HomeIcon /><span className="ms-2 fw-bold">Home</span></Link>
            </ListItem>

            {admin ? <>
                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/makeadmin`}><AdminPanelSettingsIcon /><span className="ms-2 fw-bold">Make Admin</span></Link>
                </ListItem>

                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/addproduct`}><AddCircleIcon /><span className="ms-2 fw-bold">Add Product</span></Link>
                </ListItem>

                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/manageorders`}><NoteAltIcon /><span className="ms-2 fw-bold">Manage Orders</span></Link>
                </ListItem>

                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/manageproduct`}><ListAltIcon /><span className="ms-2 fw-bold">Manage Products</span></Link>
                </ListItem>
            </> : <>
                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/myorders`}><ShoppingCartIcon /><span className="ms-2 fw-bold">My Orders</span></Link>
                </ListItem>

                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/makereview`}><ReviewsIcon /><span className="ms-2 fw-bold">Make Review</span></Link>
                </ListItem>

                <ListItem button>
                    <Link className="list-group-item w-100 text-secondary" to={`${url}/pay`}><LocalAtmIcon /><span className="ms-2 fw-bold">Pay</span></Link>
                </ListItem>
            </>}

            <Divider className="my-3" />

            <ListItem button onClick={logOut} className="border w-50 mx-auto text-danger">
                <MeetingRoomIcon />
                <span className="ms-2 fw-bold">Logout</span>
            </ListItem>


        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                style={{ backgroundColor: "teal", color: "white" }}
                position="fixed"
                // sx={{
                //     width: { sm: `calc(100% - ${drawerWidth}px)` },
                //     ml: { sm: `${drawerWidth}px` },
                // }}
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        Welcome to Your Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

                <Switch>
                    <Route exact path={path}>
                        <DashboardHome />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route path={`${path}/makeadmin`}>
                        <MakeAdmin />
                    </Route>

                    <Route path={`${path}/addproduct`}>
                        <AddProduct />
                    </Route>

                    <Route path={`${path}/manageorders`}>
                        <ManageOrders />
                    </Route>

                    <Route path={`${path}/myorders`}>
                        <MyOrders />
                    </Route>

                    <Route path={`${path}/manageproduct`}>
                        <ManageProduct />
                    </Route>

                    <Route path={`${path}/makereview`}>
                        <MakeReview />
                    </Route>

                    <Route path={`${path}/pay`}>
                        <Pay />
                    </Route>

                    <Route path={`${path}/*`}>
                        <NotFound />
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
