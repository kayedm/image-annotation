import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
const port = 5000;
const SECRET = "secret";
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(cookieParser());

const demoUser = {
    id: 1,
    email: "test@5est.com",
    username: "test",
    password: "1234",
    role: "admin",
}

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    try {
        if (username !== demoUser.username || password !== demoUser.password) {
            return res.status(401).json({message: "Invalid username or password"});
        }
        const token = jwt.sign(
            {
                email: demoUser.email,
                username: demoUser.username,
                userId: demoUser.id,
            },
            SECRET,
            {expiresIn: "1d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24,
        });

        res.json({message: "Login successful"});

    } catch (error) {
        return res.status(500).json({message: "Error"});
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        }
    );
    res.json({message: "Logout successful"});
})

function auth(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: "Not authorized"});
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();

    } catch(e) {
        return res.status(401).json({message: "Unauthorized"});
    }
}

app.get('/me', auth, (req, res) => {
    res.json({user: req.user});
})

app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

app.listen(port, () => {
    console.log(`Server started on port http://localhost:${port}`);
});
