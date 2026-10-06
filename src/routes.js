import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm,
    projectValidation
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    showEditCategoryForm,
    processEditCategoryForm,
    categoryValidation
} from './controllers/categories.js';

import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Home page
router.get('/', showHomePage);

// Organizations
router.get('/organizations', showOrganizationsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post(
    '/edit-organization/:id',
    organizationValidation,
    processEditOrganizationForm
);

// Route to handle new organization form submission
router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Projects
router.get('/projects', showProjectsPage);

// Project details
router.get('/project/:id', showProjectDetailsPage);

// Route to display the new project form
router.get('/new-project', showNewProjectForm);

// Route to handle the new project form submission
router.post(
    '/new-project',
    projectValidation,
    processNewProjectForm
);

// Route to display the edit project form
router.get('/edit-project/:id', showEditProjectForm);

// Route to handle the edit project form submission
router.post(
    '/edit-project/:id',
    projectValidation,
    processEditProjectForm
);

// Categories
router.get('/categories', showCategoriesPage);

// Route to display the new category form
router.get('/new-category', showNewCategoryForm);

// Route to handle the new category form submission
router.post(
    '/new-category',
    categoryValidation,
    processNewCategoryForm
);

// Category details
router.get('/category/:id', showCategoryDetailsPage);

// Route to display the edit category form
router.get('/edit-category/:id', showEditCategoryForm);

// Route to handle the edit category form submission
router.post(
    '/edit-category/:id',
    categoryValidation,
    processEditCategoryForm
);

// Assign categories to a project
router.get(
    '/assign-categories/:projectId',
    showAssignCategoriesForm
);

router.post(
    '/assign-categories/:projectId',
    processAssignCategoriesForm
);

// Error test route
router.get('/test-error', testErrorPage);

export default router;