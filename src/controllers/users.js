
import bcrypt from 'bcrypt';
import { createUser,authenticateUser } from '../models/users.js';


const showUserRegistrationForm = async (req, res) => {
    res.render('register', {
        title: 'Register'
    });
};

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        await createUser(name, email, passwordHash);

        req.flash(
            'success',
            'Registration successful! Please log in.'
        );

        return res.redirect('/');
    } catch (error) {
        console.error('Error registering user:', error);

        req.flash(
            'error',
            'Registration failed. Please check your information and try again.'
        );

        return res.redirect('/register');
    }
};


const showLoginForm = (req, res) => {
    res.render('login', { title: 'Login' });
};

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);

        if (user) {
            req.session.user = user;
            req.flash('success', 'Login successful!');

            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }

            return res.redirect('/dashboard');
        }

        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
    } catch (error) {
        console.error('Error during login:', error);
        req.flash(
            'error',
            'An error occurred during login. Please try again.'
        );

        return res.redirect('/login');
    }
};

const processLogout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error during logout:', error);
            return res.redirect('/');
        }

        return res.redirect('/login');
    });
};


const requireLogin = (req, res, next) => {
    if (!req.session || !req.session.user) {
        req.flash(
            'error',
            'You must be logged in to access that page.'
        );

        return res.redirect('/login');
    }

    next();
};

const requireRole = (role) => {
    return (req, res, next) => {
        // Verify that the user is logged in
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Verify that the user has the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        next();
    };
};


const showDashboard = (req, res) => {
    const user = req.session.user;

    res.render('dashboard', {
        title: 'Dashboard',
        name: user.name,
        email: user.email
    });
};

const findUserByEmail = async (email) => {
    const query = `
        SELECT
            u.user_id,
            u.name,
            u.email,
            u.password_hash,
            r.role_name
        FROM users AS u
        JOIN roles AS r
            ON u.role_id = r.role_id
        WHERE u.email = $1
    `;

    const queryParams = [email];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        return null;
    }

    return result.rows[0];
};


const showUsersPage = async (req, res, next) => {
    try {
        const users = await getAllUsers();

        res.render('users/index', {
            title: 'Registered Users',
            users
        });
    } catch (error) {
        next(error);
    }
};

export {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    findUserByEmail,
    requireRole,
    showUsersPage
};