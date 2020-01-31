import HomePage from './containers/layouts/HomePage.jsx';
import NotFoundPage from './containers/layouts/NotFoundPage';
import PanelRightPage from './containers/layouts/PanelRightPage';


import MetaShow from './components/metas/show';
import MetaIndex from './components/metas/index';
import MetaCreate from './components/metas/create';
import MetaUpdate from './components/metas/update';


import PostShow from './components/posts/show';
import PostIndex from './components/posts/index';
import PostCreate from './components/posts/create';
import PostUpdate from './components/posts/update';

import ChannelShow from './components/channels/show';
import ChannelIndex from './components/channels/index';
import ChannelCreate from './components/channels/create';
import ChannelUpdate from './components/channels/update';

import RoleShow from './components/roles/show';
import RoleIndex from './components/roles/index';
import RoleCreate from './components/roles/create';
import RoleUpdate from './components/roles/update';


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
    path: '/metas/',
    component: MetaIndex,
  },
  {
    path: '/metas/:metaId/edit',
    component: MetaUpdate,
  },
  {
    path: '/metas/new',
    component: MetaCreate,
  },
  {
    path: '/metas/:metaId',
    component: MetaShow,
  },

  {
    path: '/posts/',
    component: PostIndex,
  },
  {
    path: '/posts/:postId/edit',
    component: PostUpdate,
  },
  {
    path: '/posts/new',
    component: PostCreate,
  },
  {
    path: '/posts/:postId',
    component: PostShow,
  },

  {
    path: '/channels/',
    component: ChannelIndex,
  },
  {
    path: '/channels/:channelId/edit',
    component: ChannelUpdate,
  },
  {
    path: '/channels/new',
    component: ChannelCreate,
  },
  {
    path: '/channels/:channelId',
    component: ChannelShow,
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
