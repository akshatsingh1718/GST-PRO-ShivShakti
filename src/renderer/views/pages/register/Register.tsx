import React from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import {
  useForm,
  SubmitHandler,
  useFormState,
  useWatch,
} from 'react-hook-form';
import {
  // Controller,
  TextAutocomplete,
  AvatarAutocomplete,
  CustomTextField,
  CustomSelect,
} from 'renderer/components/CustomInputs';
import { createOrUpdateUser } from 'renderer/utils/api.utils';

const Controller = ({ control, register, name, rules, render, onChange }) => {
  const value = useWatch({
    control,
    name,
  });

  const { errors } = useFormState({
    control,
    name,
  });

  const props = register(name, rules);

  const onChangeFun = (newValue) => {
    onChange && onChange(newValue);
    props.onChange({
      target: {
        name,
        value: newValue,
      },
    });
  };

  return render({
    value,
    name: props.name,
    error: errors[name],
    onChange: onChangeFun,
    onBlur: props.onBlur,
  });
};

const Register = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const onSubmit = (user) => {
    console.log(user);
    createOrUpdateUser({ user }).then((resp) => {
      console.log(resp);
    });
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <Controller
                      {...{
                        control,
                        register,
                        name: 'username',
                        rules: {
                          required: {
                            value: true,
                            message: 'username required.',
                          },
                        },
                        render: (props) => (
                          <CustomTextField label="username" {...props} />
                        ),
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      {...{
                        control,
                        register,
                        name: 'name',
                        rules: {
                          required: {
                            value: true,
                            message: 'name required.',
                          },
                        },
                        render: (props) => (
                          <CustomTextField label="name" {...props} />
                        ),
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <Controller
                      {...{
                        control,
                        register,
                        name: 'password',
                        rules: {
                          required: {
                            value: true,
                            message: 'password required.',
                          },
                        },
                        render: (props) => (
                          <CustomTextField label="password" {...props} />
                        ),
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <Controller
                      {...{
                        control,
                        register,
                        name: 'password',
                        rules: {
                          required: {
                            value: true,
                            message: 'password required.',
                          },
                        },
                        render: (props) => (
                          <CustomTextField label="password" {...props} />
                        ),
                      }}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit(onSubmit)}>
                      Create Account
                    </CButton>
                    <Link to="/login">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        login
                      </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
