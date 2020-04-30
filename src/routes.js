import HomePage from './containers/layouts/HomePage.jsx';
import NotFoundPage from './containers/layouts/NotFoundPage';
import PanelRightPage from './containers/layouts/PanelRightPage';



import RoleShow from './components/roles/show';
import RoleIndex from './components/roles/index';
import RoleCreate from './components/roles/create';
import RoleUpdate from './components/roles/update';


import TagShow from './components/tags/show';
import TagIndex from './components/tags/index';
import TagCreate from './components/tags/create';
import TagUpdate from './components/tags/update';

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

import TodoCreate from './components/todos/create';
import TodoUpdate from './components/todos/update';

import TimeSheetShow from './components/time_sheets/show';
import TimeSheetIndex from './components/time_sheets/index';
import TimeSheetCreate from './components/time_sheets/create';
import TimeSheetUpdate from './components/time_sheets/update';


import ProfileShow from './components/profiles/show';
import ProfileIndex from './components/profiles/index';
import ProfileCreate from './components/profiles/create';
import ProfileUpdate from './components/profiles/update';

import ReportShow from './components/reports/show';
import ReportIndex from './components/reports/index';
import ReportCreate from './components/reports/create';
import ReportUpdate from './components/reports/update';

import GroupShow from './components/groups/show';
import GroupIndex from './components/groups/index';
import GroupCreate from './components/groups/create';
import GroupUpdate from './components/groups/update';

import SettingUpdate from './components/settings/update';

import Login from './components/users/Login';
import SignUp from './components/users/SignUp';
import Verification from './components/users/Verification';


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
    path: '/settings/',
    component: SettingUpdate,
  },

  {
    path: '/groups/',
    component: GroupIndex,
  },
  {
    path: '/groups/:groupId/edit',
    component: GroupUpdate,
  },
  {
    path: '/groups/new',
    component: GroupCreate,
  },
  {
    path: '/groups/:groupId',
    component: GroupShow,
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
    path: '/time_sheets/',
    component: TimeSheetIndex,
  },
  {
    path: '/time_sheets/:timeSheetId/edit',
    component: TimeSheetUpdate,
  },
  {
    path: '/time_sheets/new',
    component: TimeSheetCreate,
  },
  {
    path: '/time_sheets/:timeSheetId',
    component: TimeSheetShow,
  },


  {
    path: '/reports/',
    component: ReportIndex,
  },
  {
    path: '/reports/:reportId/edit',
    component: ReportUpdate,
  },
  {
    path: '/reports/new/:callerType/:callerId',
    component: ReportCreate,
  },
  {
    path: '/reports/:reportId',
    component: ReportShow,
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
    path: '/todos/:todoId/edit',
    component: TodoUpdate,
  },
  {
    path: '/todos/new/:workId',
    component: TodoCreate,
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
