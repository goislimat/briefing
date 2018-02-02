import swal from 'sweetalert';

const successFaces = [
  'ᕕ( ᐛ )ᕗ',
  '(づ｡◕‿‿◕｡)づ',
  '┬─┬⃰͡ (ᵔᵕᵔ͜ )',
  '(｡◕‿◕｡)',
  '☜(⌒▽⌒)☞',
  'ヽ(´▽`)/',
  '（ ^_^）o自自o（^_^ ）',
  'ᕦ(ò_óˇ)ᕤ',
  '⊂(◉‿◉)つ',
  '“ヽ(´▽｀)ノ”',
  '♥‿♥',
  'ԅ(≖‿≖ԅ)',
  '♪♪ ヽ(ˇ∀ˇ )ゞ',
  '(•̀ᴗ•́)و ̑̑',
  '(∩｀-´)⊃━☆ﾟ.*･｡ﾟ',
];

export const error = text =>
  swal({
    title: 'Ooops!!',
    text,
    icon: 'error',
    button: 'Ok',
  });

export const success = title =>
  swal({
    title,
    text: successFaces[Math.floor(Math.random() * successFaces.length)],
    icon: 'success',
    timer: 1500,
    buttons: false,
  });
