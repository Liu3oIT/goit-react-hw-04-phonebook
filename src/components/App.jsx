import BookPhones from './bookcontact/booksphone';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  return (
    <div>
      <BookPhones />
      <ToastContainer position="top-right" />
    </div>
  );
};
