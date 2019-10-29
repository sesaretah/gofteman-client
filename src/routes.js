import HomePage from './containers/HomePage.jsx';
import AboutPage from './containers/AboutPage';
import FormPage from './containers/FormPage';

import DocumentForm from './containers/DocumentForm';
import DocumentList from './containers/DocumentList';
import DocumentShow from './components/documents/show';
import DocumentIndex from './components/documents/index';
import DocumentCreate from './components/documents/create';
import DocumentUpdate from './components/documents/update';


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

import AuxiliaryTable from './components/auxiliaryTables/index';
import AuxiliaryForm from './components/auxiliaryTables/create';
import AuxiliaryUpdate from './components/auxiliaryTables/update';
import AuxiliaryTableShow from './components/auxiliaryTables/show';



import WorkflowIndex from './components/workflows/index';
import WorkflowCreate from './components/workflows/create';
import WorkflowUpdate from './components/workflows/update';
import WorkflowShow from './components/workflows/show';




import WorkflowTableIndex from './components/workflow_tables/index';
import WorkflowTableCreate from './components/workflow_tables/create';

import Login from './components/users/Login';
import SignUp from './components/users/SignUp';

import DynamicRoutePage from './containers/DynamicRoutePage';
import NotFoundPage from './containers/NotFoundPage';
import PanelLeftPage from './containers/PanelLeftPage';
import PanelRightPage from './containers/PanelRightPage';

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
    path: '/panel-left/',
    component: PanelLeftPage,
  },
  {
    path: '/panel-right/',
    component: PanelRightPage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/document_list/',
    component: DocumentList,
  },
  {
    path: '/document_form/',
    component: DocumentForm,
  },
  {
    path: '/auxiliaryTables/',
    component: AuxiliaryTable,
  },
  {
    path: '/auxiliaryTables/new',
    component: AuxiliaryForm,
  },
  {
    path: '/auxiliaryTables/:auxiliaryTableId/edit',
    component: AuxiliaryUpdate,
  },
  {
    path: '/auxiliaryTables/:auxiliaryTableId',
    component: AuxiliaryTableShow,
  },
  {
    path: '/workflows/',
    component: WorkflowIndex,
  },
  {
    path: '/workflows/:workflowId/edit',
    component: WorkflowUpdate,
  },
  {
    path: '/workflows/new',
    component: WorkflowCreate,
  },
  {
    path: '/workflows/:workflowId',
    component: WorkflowShow,
  },
  {
    path: '/workflow_tables/',
    component: WorkflowTableIndex,
  },
  {
    path: '/documents/',
    component: DocumentIndex,
  },
  {
    path: '/documents/:documentId/edit',
    component: DocumentUpdate,
  },
  {
    path: '/documents/new',
    component: DocumentCreate,
  },
  {
    path: '/documents/:documentId',
    component: DocumentShow,
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
    path: '/workflow_tables/',
    component: WorkflowTableIndex,
  },
  {
    path: '/workflow_tables/new',
    component: WorkflowTableCreate,
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
