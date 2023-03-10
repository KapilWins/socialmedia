import proxy from "../../service/appServiceProxy";
import * as IInstagramPostsService from "../../service/instagram/IInstagramPostsService";

export default {
	Query: {
		async instagramPosts(parent, args) {
			const request: IInstagramPostsService.IGetInstagramPostsRequest = {};
			let response: IInstagramPostsService.IGetInstagramPostsResponse;
			try {
				response = await proxy.instagramPosts.instagramPosts(request);
			} catch (e) {
				throw e;
			}
			return response?.data;
		},
	},
};
