function ValidateEmail(mail) {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(mailformat)) {
        return (true);
    }
    return (false);
}

const validatePayload = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
};

const validateName = async (req, res, next) => {
    const { displayName } = req.body;
    if (!displayName || displayName.length < 8) {
        return res.status(400).json({
            message: '"displayName" length must be at least 8 characters long',
        });
    }
    next();
};

const validateEmail = async (req, res, next) => {
    const { email } = req.body;
    if (!email || ValidateEmail(email) === false) {
        return res.status(400).json({
            message: '"email" must be a valid email',
        });
    }
    next();
};

const validatePassword = async (req, res, next) => {
    const { password } = req.body;
    if (!password || password.length < 6) {
        return res.status(400).json({
            message: '"password" length must be at least 6 characters long',
        });
    }
    next();
};
module.exports = { validatePayload, validateName, validateEmail, validatePassword };