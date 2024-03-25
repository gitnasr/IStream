import {M} from '@/types';
import {ObjectId} from '@/types/utils';
import {User} from '@/models';
import jsonwebtoken from 'jsonwebtoken';
import {vars} from '@/config';

abstract class UserService {
	static User = User;

	static async create(data: M.IUser) {
		return await this.User.create(data);
	}
	static async getOne(query: Partial<M.IUser>) {
		return this.User.findOne(query).populate({path: 'scrapies', options: {limit: 6, sort: {createdAt: -1}}});
	}
	static async UpdateLastActivity(uId: string) {
		return await this.User.findOneAndUpdate({uId}, {lastActivity: new Date()}, {new: true});
	}
	static async PushScrapy(uId: ObjectId, sId: ObjectId) {
		return await this.User.findByIdAndUpdate(
			uId,
			{
				$push: {scrapies: sId}
			},
			{new: true}
		);
	}
	static getToken(uId: ObjectId, username: string) {
		return jsonwebtoken.sign({uId, username}, vars.jwt.auth, {expiresIn: '7d'});
	}
}

export default UserService;
