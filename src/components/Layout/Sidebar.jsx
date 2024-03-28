import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import StarsIcon from "@mui/icons-material/Stars";
import CategoryIcon from "@mui/icons-material/Category";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MuiDrawer from "@mui/material/Drawer";
import {
  styled,
  Toolbar,
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const drawerWidth = 240;
const menu = [
  { title: "Dahboard", icon: <DashboardIcon />, path: "/stock/dashboard" },
  { title: "Products", icon: <InventoryIcon />, path: "/stock/products" },
  { title: "Sales", icon: <ReceiptIcon />, path: "/stock/sales" },
  { title: "Purchases", icon: <ShoppingCartIcon />, path: "/stock/purchases" },
  { title: "Firms", icon: <AccountBalanceIcon />, path: "/stock/firms" },
  { title: "Brands", icon: <StarsIcon />, path: "/stock/brands" },
  { title: "Categories", icon: <CategoryIcon />, path: "/stock/categories" },
];

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: "#1976D2",
    boxSizing: "border-box",
    display: 'block',
    marginRight:"5rem",
    transition: theme.transitions.create("width"),
    ...(!open && {
      width: theme.spacing(7),
      overflowX: "hidden",
      transition: theme.transitions.create("width"),
      
    }),
  },
}));

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  return (
    <Drawer open={sidebarOpen} variant="permanent" marginRight="5rem" >
      <Toolbar />

      <List sx={{ color: "white" }} component="nav">
        {/* Admin ListItem */}
        {sessionStorage.getItem("admin") && (
          <Link
            href="https://26222.fullstack.clarusway.com/admin/"
            target="__blank"
            sx={{ color: "white" }}
          >
            <ListItemButton title="Admin Panel">
              <ListItemIcon sx={{ color: "white" }}>
                <AdminPanelSettingsIcon />{" "}
              </ListItemIcon>
              <ListItemText primary="Admin Panel" />
            </ListItemButton>
          </Link>
        )}

        {menu.map((item, index) => (
          <ListItemButton
            key={index}
            title={item.title}
            component={NavLink}
            to={item.path}
          >
            <ListItemIcon sx={{ color: "white" }}> {item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;