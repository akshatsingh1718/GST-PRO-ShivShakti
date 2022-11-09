import {
  AiOutlineCaretRight,
  AiOutlineCaretLeft,
  AiOutlineBackward,
  AiOutlineForward,
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineArrowLeft,
  AiOutlineSearch,
  AiFillSliders,
  AiOutlinePrinter,
  AiOutlineSend,
  AiOutlineEdit,
  AiOutlineClose,
  AiOutlineSave,
  AiOutlinePlus,
  AiOutlineUserAdd,
  AiOutlineUser,
  AiOutlineAppstoreAdd,AiOutlineHome
} from 'react-icons/ai';
import { IoReceiptOutline, IoColorWandSharp } from 'react-icons/io5';
import { RiBillLine } from 'react-icons/ri';
import { BsCardImage } from 'react-icons/bs';
import { GrUpdate, GrTransaction } from 'react-icons/gr';
import { BiTransferAlt } from 'react-icons/bi';

export const DeleteIcon = (props) => <AiOutlineDelete size={25} {...props} />;
export const ForwardIcon = (props) => <AiOutlineForward size={25} {...props} />;
export const BackwardIcon = (props) => (
  <AiOutlineBackward size={25} {...props} />
);
export const CaretLeftIcon = (props) => (
  <AiOutlineCaretLeft size={25} {...props} />
);
export const CaretRightIcon = (props) => (
  <AiOutlineCaretRight size={25} {...props} />
);
export const DownloadIcon = (props) => (
  <AiOutlineDownload size={25} {...props} />
);
export const ArrowLeftIcon = (props) => (
  <AiOutlineArrowLeft size={25} {...props} />
);
export const SearchIcon = (props) => <AiOutlineSearch size={25} {...props} />;
export const PrintIcon = (props) => <AiOutlinePrinter size={25} {...props} />;
export const SendIcon = (props) => <AiOutlineSend size={25} {...props} />;
export const EditIcon = (props) => <AiOutlineEdit size={25} {...props} />;
export const CloseIcon = (props) => <AiOutlineClose size={25} {...props} />;
export const SaveIcon = (props) => <AiOutlineSave size={25} {...props} />;
export const ImageIcon = (props) => <BsCardImage size={25} {...props} />;
export const PlusIcon = (props) => <AiOutlinePlus size={25} {...props} />;
export const UpdateIcon = (props) => (
  <GrUpdate size={25} color="white" {...props} />
);
export const TransactionIcon = (props) => (
  <BiTransferAlt size={25} {...props} />
);
export const HomeIcon = (props) => <AiOutlineHome size={25} {...props} />;



// Invoice & Bill Form Icons
export const InvoiceIcon = (props) => <IoReceiptOutline size={25} {...props} />;
export const FilterIcon = (props) => <AiFillSliders size={25} {...props} />;
export const BillIcon = (props) => <RiBillLine size={25} {...props} />;
export const ClearFormIcon = (props) => (
  <IoColorWandSharp size={25} {...props} />
);

// Employee Icons
export const AddEmpIcon = (props) => <AiOutlineUserAdd size={25} {...props} />;
export const EmpIcon = (props) => <AiOutlineUser size={25} {...props} />;

// sidebar
export const ModelOperations = (props) => (
  <AiOutlineAppstoreAdd size={25} {...props} />
);
