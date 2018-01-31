import swal from 'sweetalert';

// eslint-disable-next-line import/prefer-default-export
export const error = ({ text }) =>
  swal({
    title: 'Ooops!!',
    text,
    icon: 'error',
    button: 'Ok',
  });
