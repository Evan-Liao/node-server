import mongoose from 'mongoose';
import { systemConfig as config } from '../config'

let connetTimeout: NodeJS.Timeout;
let reconnetTime: number = 8000;

const DbTools = {
    connectTimes: 8,
    connect(): mongoose.Mongoose {
        if (process.env.NODE_ENV !== 'test') {
            DbTools.mongooseConnect();
        }

        const db = mongoose.connection;
        db.once('error', () => {
            console.error('connect mongodb fail.');
            connetTimeout = setInterval(() => {
                if (DbTools.connectTimes > 0) {
                    console.log(`reconnecting mongodb, remain time ${DbTools.connectTimes}.`);
                    DbTools.mongooseConnect();
                    DbTools.connectTimes --;
                }else {
                    console.error('reconnect mongodb fail.');
                    clearTimeout(connetTimeout);
                }
            }, reconnetTime)
        });

        db.on('open', () => {
            console.log('connect mongodb successfullly.');
            clearTimeout(connetTimeout);
        });

        DbTools.connect = () => {
            return mongoose;
        }

        return mongoose;
    },
    mongooseConnect(): void {
        mongoose.connect(config.dbUrl, {
            useCreateIndex: true, // 创建索引的方式，以避免来自 MongoDB 驱动程序的弃用警告
            useNewUrlParser: true // 使用新的 url parser，以避免来自 MongoDB 驱动程序的弃用警告
        })
    }
}

export default DbTools;