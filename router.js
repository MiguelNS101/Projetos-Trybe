const express = require('express');
const fs = require('fs');
const rTk = require('random-token');

const TALKER_FILE = './talker.json';
const router = express.Router();

// Req 01
router.get('/talker', (_req, res, next) => {
    try {
        const talkerFile = fs.readFileSync(TALKER_FILE);
        return res.status(200).json(JSON.parse(talkerFile));
    } catch (e) {
        next(e);
    }
});

// Req 04
const emailVal = (req, res, next) => {
    const { email } = req.body;
    const mailformat = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/); // Regular Expression Pattern - https://www.w3resource.com/javascript/form/email-validation.php
    if (email === undefined) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    } 
    if (!mailformat.test(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

// Req 04
const passVal = (req, res, next) => {
    const { password } = req.body;
    if (password === undefined) {
        return res.status(400).json({ message: 'O campo "password" é obrigatório' });
    } 
    if (password.length < 6) {
        return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }

    next();
};

// Req 03
router.post('/login', emailVal, passVal, (req, res) => res.status(200).json({ token: rTk(16) }));

// Req 05
const tokenVal = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization === undefined) {
        return res.status(401).json({ message: 'Token não encontrado' });
    } 
    if (authorization.length !== 16) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    next();
};

const nameVal = (req, res, next) => {
    const { name } = req.body;
    if (name === undefined) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    } 
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }

    next();
};

const ageVal = (req, res, next) => {
    const { age } = req.body;
    if (age === undefined) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    } 
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }

    next();
};

const talkVal = (req, res, next) => {
    const { talk } = req.body;
    if (talk === undefined) {
        return res.status(400).json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }
    const { watchedAt, rate } = req.body.talk;
    if (rate === undefined || watchedAt === undefined) {
        return res.status(400).json({ 
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
    }

    next();
};

const rateVal = (req, res, next) => {
    const { rate } = req.body.talk;
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

function isValidDate(dateString) {
    const [day, month, year] = dateString.split('/');
    if ([day, month, year].every((i) => i)) {
        return (day.length === 2 && month.length === 2 && year.length === 4);
    }
    return false;
}

const watchVal = (req, res, next) => {
    const { watchedAt } = req.body.talk;
    const resp = !isValidDate(watchedAt);
    if (resp) {
        return res.status(400).json({ 
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    next();
};

function addTalker(name, age, talk) {
    const data = fs.readFileSync('./talker.json', 'utf8');
    const resp = JSON.parse(data);
    let maxId = 0;
    resp.forEach((element) => {
        if (element.id > maxId) {
            maxId = element.id;
        }
    });
    const id = maxId + 1;
    const registerTalker = {
        id,
        name,
        age,
        talk,
    };
    resp.push(registerTalker);
    fs.writeFileSync(TALKER_FILE, JSON.stringify(resp));
    return registerTalker;
}

router.post('/talker', tokenVal, nameVal, ageVal, talkVal, rateVal, watchVal, (req, res) => {
        const { name, age } = req.body;
        const { watchedAt, rate } = req.body.talk;
        const talk = {
            watchedAt,
            rate,
        };
        const data = addTalker(name, age, talk);
        return res.status(201).json(data);
});
module.exports = router;

// Req 06
function editTalker(registerTalker, id) {
    const data = fs.readFileSync(TALKER_FILE, 'utf8');
    const resp = JSON.parse(data);
    const newList = resp.map((obj) => {
        if (obj.id === id) {
            return registerTalker;
        }
        return obj;
        });
    fs.writeFileSync(TALKER_FILE, JSON.stringify(newList));
    return registerTalker;
}

router.put('/talker/:id', tokenVal, nameVal, ageVal, talkVal, rateVal, watchVal, (req, res) => {
    const { name, age } = req.body;
    const { watchedAt, rate } = req.body.talk;
    const id = parseInt(req.params.id, 10);
    const talk = {
        watchedAt,
        rate,
    };
    const registerTalker = {
        id,
        name,
        age,
        talk,
    };
    const data = editTalker(registerTalker, id);
    return res.status(200).json(data);
});
module.exports = router;

// Req 07
function deleteTalker(id) {
    const data = fs.readFileSync(TALKER_FILE, 'utf8');
    const resp = JSON.parse(data);
    const removeIndex = resp.findIndex((obj) => obj.id === id);
    resp.splice(removeIndex, 1);
    fs.writeFileSync(TALKER_FILE, JSON.stringify(resp));
}

router.delete('/talker/:id', tokenVal, (req, res) => {
    const id = parseInt(req.params.id, 10);
    deleteTalker(id);
    return res.status(204).json();
});
module.exports = router;

// Req 08
function findTalker(search) {
    const data = fs.readFileSync(TALKER_FILE, 'utf8');
    const resp = JSON.parse(data);
    const talker = resp.filter((obj) => obj.name.includes(search));
    return talker;
}

router.get('/talker/search', tokenVal, (req, res) => {
    const { q } = req.query;
    const talker = findTalker(q);
    return res.status(200).json(talker);
});
module.exports = router;

// Req 02
router.get('/talker/:id', (req, res, next) => {
    try {
        const talkerId = parseInt(req.params.id, 10);
        const talkerFile = fs.readFileSync(TALKER_FILE);
        const data = JSON.parse(talkerFile).find((talk) => talk.id === talkerId);
        if (data) return res.status(200).json(data);
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    } catch (e) {
        next(e);
    }
});
