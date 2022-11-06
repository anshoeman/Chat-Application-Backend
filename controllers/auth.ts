import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
// import { StreamChat } from 'stream-chat'
import { connect } from 'getstream/lib/connect'
import crypto from 'crypto'
const StreamChat = require('stream-chat').StreamChat;
const api_key: any = "chj58swusav2"
const api_secret: any = "gpn8qkhkc3e775cqhw3jenhtus8d7m6rws6sm8hq5xpsejudp7vsxaqsnn4tpsbs"
const app_id: any = "1218057"

const signUp = async (req: Request, res: Response) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: 'User not found' });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
}

export { login, signUp }