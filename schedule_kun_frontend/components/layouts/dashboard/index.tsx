import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useState } from 'react';
import useMediaPc from '@/hooks/useMediaPc';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = ({ children }: { children: any }) => {
  const isMediaPc: boolean = useMediaPc();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#24292E' }}>
        <Toolbar>
          {!isMediaPc && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ display: 'flex' }}>
        <Drawer
          anchor="left"
          variant={isMediaPc ? 'permanent' : 'temporary' }
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
          sx={{
            width: 115,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 115,
            },
          }}
        >
          <Toolbar />
          <List>
            <ListItem>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="test" onClick={() => setMenuOpen(false)}/>
            </ListItem>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
