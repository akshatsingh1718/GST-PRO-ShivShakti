import * as React from 'react';
import { Card, Grid } from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import { SiMicrosoftexcel, SiAdobeacrobatreader } from 'react-icons/si';
import { CWidgetStatsF } from '@coreui/react';
import { createInvoice, getLatestMaster } from 'renderer/utils/api.utils';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
} from '@coreui/react';
import InvoicePDFViewer from 'renderer/components/SimpleInvoicePDf/InvoicePDFViewer';
import CustomDialog from 'renderer/components/CustomDialog';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import Switches, { CustomISOSwitch } from 'renderer/components/CustomSwitch';

const InvoiceDownloadView = ({ invoice }) => {
  const [visible, setVisible] = React.useState(false);
  const [masterDetails, setMasterDetails] = React.useState();
  const [showLogo, setShowLogo] = React.useState(true);

  React.useEffect(() => {
    getLatestMaster({})
      .then((resp) => {
        setMasterDetails(resp.data);
        return null;
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <CustomDialog
        size="lg"
        open={visible}
        setOpen={setVisible}
        titleToolbar={[
          <CustomISOSwitch
            onChecked={() => setShowLogo(false)}
            onUnchecked={() => setShowLogo(true)}
            label="Hide Logo"
          />,
        ]}
        child={
          <InvoicePDFViewer
            invoice={invoice}
            masterDetails={masterDetails}
            showLogo={showLogo}
          />
        }
      />

      <Card
        elevation={3}
        sx={{ p: 1, m: 1 }}
        style={{ height: 500, width: '100%' }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card elevation={3} sx={{ p: 1, mt: 1 }}>
                <h4>Download | Invoice no: {invoice.id}</h4>
                <p>FILTERS..</p>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={3} sx={{ p: 1, mt: 1 }}>
                <h4>Download Detailed invoice</h4>
                <CRow>
                  <CCol xs={12} md={6}>
                    <CWidgetStatsF
                      style={{ cursor: 'pointer' }}
                      onClick={() => createInvoice({ id: invoice?.id })}
                      className="mb-3"
                      color="success"
                      padding={false}
                      icon={
                        <SiMicrosoftexcel
                          size={40}
                          style={{ color: 'white' }}
                        />
                      }
                      title="Donwload as excel file."
                      value="Excel Download"
                    />
                  </CCol>
                  <CCol xs={12} md={6}>
                    <CWidgetStatsF
                      style={{ cursor: 'pointer' }}
                      onClick={() => {}}
                      className="mb-3"
                      color="danger"
                      padding={false}
                      icon={
                        <SiAdobeacrobatreader
                          size={40}
                          style={{ color: 'white' }}
                        />
                      }
                      title="Donwload as PDF file."
                      value="PDF Download"
                    />
                  </CCol>
                </CRow>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={3} sx={{ p: 1, mt: 1 }}>
                <h4>Download Simple invoice</h4>
                <CRow>
                  <CCol xs={12} md={6}>
                    <CWidgetStatsF
                      style={{ cursor: 'pointer' }}
                      onClick={() => alert('EXCL')}
                      className="mb-3"
                      color="success"
                      padding={false}
                      icon={
                        <SiMicrosoftexcel
                          size={40}
                          style={{ color: 'white' }}
                        />
                      }
                      title="Donwload as excel file."
                      value="Excel Download"
                    />
                  </CCol>
                  <CCol xs={12} md={6}>
                    <CWidgetStatsF
                      style={{ cursor: 'pointer' }}
                      onClick={() => setVisible(!visible)}
                      className="mb-3"
                      color="danger"
                      padding={false}
                      icon={
                        <SiAdobeacrobatreader
                          size={40}
                          style={{ color: 'white' }}
                        />
                      }
                      title={<>Donwload as PDF file.</>}
                      value="PDF Download"
                    />
                  </CCol>
                </CRow>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default InvoiceDownloadView;
