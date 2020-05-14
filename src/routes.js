import HomePage from './containers/layouts/HomePage.jsx';
import NotFoundPage from './containers/layouts/NotFoundPage';
import PanelRightPage from './containers/layouts/PanelRightPage';






import TagShow from './components/tags/show';
import TagIndex from './components/tags/index';
import TagCreate from './components/tags/create';
import TagUpdate from './components/tags/update';









import ProfileShow from './components/profiles/show';
import ProfileIndex from './components/profiles/index';
import ProfileCreate from './components/profiles/create';
import ProfileUpdate from './components/profiles/update';




import Login from './components/users/Login';
import LoginJwt from './components/users/LoginJwt';
import SignUp from './components/users/SignUp';
import Verification from './components/users/Verification';
import NotificationIndex from './components/notifications/index';


export default [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/sign_up/',
    component: SignUp,
  },
  {
    path: '/verification/:email',
    component: Verification,
  },
  {
    path: '/login_jwt/:token',
    component: LoginJwt,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },

  {
    path: '/notifications/',
    component: NotificationIndex,
  },

  {
    path: '/tags/',
    component: TagIndex,
  },
  {
    path: '/tags/:tagId/edit',
    component: TagUpdate,
  },
  {
    path: '/tags/new',
    component: TagCreate,
  },
  {
    path: '/tags/:tagId',
    component: TagShow,
  },


  {
    path: '/profiles/',
    component: ProfileIndex,
  },
  {
    path: '/profiles/:profileId/edit',
    component: ProfileUpdate,
  },
  {
    path: '/profiles/new',
    component: ProfileCreate,
  },
  {
    path: '/profiles/:profileId',
    component: ProfileShow,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
