import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { AppBreadcrumb } from './index';
import { AppHeaderDropdown } from './header/index';
import logo from '../assets/brand/logo.jpeg';
import { selectUser, logout } from 'renderer/features/userSlice';
import AppHeaderAvatarMenu from './header/AppHeaderAvatarMenu';
import Box from '@mui/material/Box';

const AppHeader = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <Box
            component="img"
            sx={{
              height: 60,
              width: 150,
            }}
            alt="The house from the offer."
            src={logo}
          />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink}>
              Home
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink component={Link} to="/transactions/packet-entry">
              Create Bill
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink component={Link} to="/transactions/packet-entry">
              Create Invoice
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderAvatarMenu />
        </CHeaderNav>
      </CContainer>

      {/* <CHeaderDivider />

      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  );
};

export default AppHeader;
