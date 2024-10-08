export const routing = {
  apply: {
    path: '/',
    name: 'apply',
    children: {
      thanks: {
        path: '/thanks',
        name: 'thanks'
      },
      merci: {
        path: '/merci',
        name: 'merci'
      }
    }
  },
  notFound: {
    path: '/:param',
    name: 'notFound',
  }
}