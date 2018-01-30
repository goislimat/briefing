import swal from 'sweetalert';

export const error = ({ text }) =>
  swal({
    title: 'Ooops!!',
    text,
    icon: 'error',
    button: 'Ok',
  });

export const success = ({ text }) => {};
