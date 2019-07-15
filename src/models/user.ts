import dbTools from '../utils/dbTools'

const Mongoose = dbTools.connect();

// 创建数据库
const UserSchema = new Mongoose.Schema({
    id: Number,
    username: String,
    password: String
});

// 创建表
const UserCol = Mongoose.model('user', UserSchema);

const UserModel = {
    async add(item: any): Promise<boolean> {
        const user = new UserCol(item);
        user.save(err => {
            if (err) {
                return false;
            }
        });
        return true
    }
}

export default UserModel;

