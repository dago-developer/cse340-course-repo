/**
 * Flash Message Middleware
 *
 * Provides temporary message storage that survives redirects but is consumed on render.
 * Messages are stored in the session and organized by type.
 */

const flashMiddleware = (req, res, next) => {
    req.flash = function(type, message) {

        if (!req.session.flash) {
            req.session.flash = {
                success: [],
                error: [],
                warning: [],
                info: []
            };
        }

        // SETTING: store a message
        if (type && message) {
            if (!req.session.flash[type]) {
                req.session.flash[type] = [];
            }

            req.session.flash[type].push(message);
            return;
        }

        // GETTING ONE TYPE
        if (type && !message) {
            const messages = req.session.flash[type] || [];

            req.session.flash[type] = [];

            return messages;
        }

        // GETTING ALL
        const allMessages = req.session.flash;

        req.session.flash = {
            success: [],
            error: [],
            warning: [],
            info: []
        };

        return allMessages;
    };

    next();
};

const flashLocals = (req, res, next) => {
    res.locals.flash = req.flash;
    next();
};

const flash = (req, res, next) => {
    flashMiddleware(req, res, () => {
        flashLocals(req, res, next);
    });
};

export default flash;