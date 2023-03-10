import proxy from "../../service/appServiceProxy";
import * as IFacebookPostsService from "../../service/facebook/IFacebookPostsService";

export default {
	Query: {
		async facebookPosts(parent, args) {
			const request: IFacebookPostsService.IGetFacebookPostsRequest = {};
			let response: IFacebookPostsService.IGetFacebookPostsResponse;
			try {
				response = await proxy.facebookPosts.facebookPosts(request);
			} catch (e) {
				throw e;
			}
			return response?.data;
		},
	},
};
