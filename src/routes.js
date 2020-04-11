import HomePage from './containers/layouts/HomePage.jsx';
import NotFoundPage from './containers/layouts/NotFoundPage';
import PanelRightPage from './containers/layouts/PanelRightPage';



import RoleShow from './components/roles/show';
import RoleIndex from './components/roles/index';
import RoleCreate from './components/roles/create';
import RoleUpdate from './components/roles/update';

import StatusShow from './components/statuses/show';
import StatusIndex from './components/statuses/index';
import StatusCreate from './components/statuses/create';
import StatusUpdate from './components/statuses/update';

import TaskShow from './components/tasks/show';
import TaskIndex from './components/tasks/index';
import TaskCreate from './components/tasks/create';
import TaskUpdate from './components/tasks/update';

import WorkShow from './components/works/show';
import WorkIndex from './components/works/index';
import WorkCreate from './components/works/create';
import WorkUpdate from './components/works/update';

import ProfileShow from './components/profiles/show';
import ProfileIndex from './components/profiles/index';
import ProfileCreate from './components/profiles/create';
import ProfileUpdate from './components/profiles/update';


import Login from './components/users/Login';
import SignUp from './components/users/SignUp';



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
    path: '/panel-right/',
    component: PanelRightPage,
  },


  {
    path: '/roles/',
    component: RoleIndex,
  },
  {
    path: '/roles/:roleId/edit',
    component: RoleUpdate,
  },
  {
    path: '/roles/new',
    component: RoleCreate,
  },
  {
    path: '/roles/:roleId',
    component: RoleShow,
  },

  {
    path: '/statuses/',
    component: StatusIndex,
  },
  {
    path: '/statuses/:statusId/edit',
    component: StatusUpdate,
  },
  {
    path: '/statuses/new',
    component: StatusCreate,
  },
  {
    path: '/statuses/:statusId',
    component: StatusShow,
  },


  {
    path: '/tasks/',
    component: TaskIndex,
  },
  {
    path: '/tasks/:taskId/edit',
    component: TaskUpdate,
  },
  {
    path: '/tasks/new',
    component: TaskCreate,
  },
  {
    path: '/tasks/:taskId',
    component: TaskShow,
  },


  {
    path: '/works/',
    component: WorkIndex,
  },
  {
    path: '/works/:workId/edit',
    component: WorkUpdate,
  },
  {
    path: '/works/new/:taskId',
    component: WorkCreate,
  },
  {
    path: '/works/:workId',
    component: WorkShow,
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
