import express from 'express';

import { showHomePage } from './controllers/index.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage
} from './controllers/organizations.js';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Home page
router.get('/', showHomePage);

// Organizations
router.get('/organizations', showOrganizationsPage);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// Projects
router.get('/projects', showProjectsPage);

// Project details
router.get('/project/:id', showProjectDetailsPage);

// Categories
router.get('/categories', showCategoriesPage);

// Error test route
router.get('/test-error', testErrorPage);

export default router;