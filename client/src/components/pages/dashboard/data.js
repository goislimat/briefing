import template from '../../../images/icons/template.svg';
import novoQuestionario from '../../../images/icons/novo-questionario.svg';
import editar from '../../../images/icons/editar.svg';
import tutoriais from '../../../images/icons/tutoriais.svg';

export default {
  cards: [
    {
      id: 1,
      color: 'blue',
      image: template,
      title: 'template',
      text: 'Comece um briefing a partir de um modelo pré definido',
      cta: 'começar',
      location: {
        pathname: '/dashboard',
      },
    },
    {
      id: 2,
      color: 'yellow',
      image: novoQuestionario,
      title: 'Novo Questionário',
      text: 'Crie um questionário personalizado do zero',
      cta: 'criar',
      location: {
        pathname: '/dashboard/briefings',
        new: true,
      },
    },
    {
      id: 3,
      color: 'orange',
      image: editar,
      title: 'briefing',
      text: 'Edite um briefing existente',
      cta: 'editar',
      location: {
        pathname: '/dashboard/briefings',
      },
    },
    {
      id: 4,
      color: 'green',
      image: tutoriais,
      title: 'tutoriais',
      text: 'Aprenda o básico sobre construção de marcas de valor com exemplo práticos',
      cta: 'aprender',
      location: {
        pathname: '/dashboard',
      },
    },
  ],
};
