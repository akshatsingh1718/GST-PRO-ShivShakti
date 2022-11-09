export type PacketEntryInputs = {
  id: number;
  destination: string;
  partyName: string;
  docketNo: string;
  description: string;
  weight: number;
  amount: number;
};

export type BillInputs = {
  entryGroupId: number;
  createdAt: Date;
  companyName: string;
  empName: string;
  gstType: string;
  address: string;
  grpName: string;
  department: string;
};

export type MasterDetailsInputs = {
  id: number;
  logo: Array<File>;
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  gstin: string;
  panNo: string;
  ceo: string;
};

export type EmployeeFormInputs = {
  company: string;
  name: string;
  grpName: string;
  empCode: string;
  email: string;
  mobile: string;
  phone: string;
  designation: string;
  department: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
};

export type CompanyFormInputs = {
  name: string;
  code: string;
  email: string;
  mobile: string;
  phone: string;
  grpName: string;
  gstin: string;
  district: string;
  state: string;
  pincode: string;
  address: string;
};

export type LoginFormInputs = {
  username: string;
  password: string;
};

export type LoginModelType = {
  id: number;
  name: string;
  username: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  userType: string;
  lastLogin: string;
  lastLogout: string;
};
