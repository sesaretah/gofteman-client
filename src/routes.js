import HomePage from './containers/HomePage.jsx';
import AboutPage from './containers/AboutPage';
import FormPage from './containers/FormPage';

import DocumentForm from './containers/DocumentForm';
import DocumentList from './containers/DocumentList';
import DocumentShow from './components/documents/show';
import DocumentIndex from './components/documents/index';
import DocumentCreate from './components/documents/create';
import DocumentUpdate from './components/documents/update';


import AuxiliaryTable from './components/auxiliary_tables/index';
import AuxiliaryForm from './components/auxiliary_tables/create';
import AuxiliaryRecord from './containers/auxiliary_tables/record';


import WorkflowIndex from './components/workflows/index';
import WorkflowCreate from './components/workflows/create';
import WorkflowUpdate from './components/workflows/update';
import WorkflowShow from './components/workflows/show';




import WorkflowTableIndex from './components/workflow_tables/index';
import WorkflowTableCreate from './components/workflow_tables/create';

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
    path: '/auxiliary_tables/',
    component: AuxiliaryTable,
  },
  {
    path: '/auxiliary_tables/new',
    component: AuxiliaryForm,
  },
  {
    path: '/auxiliary_tables/:auxiliaryTableId/edit',
    component: AuxiliaryForm,
  },
  {
    path: '/auxiliary_tables/record/:auxiliaryTableId',
    component: AuxiliaryRecord,
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
