import proxy from "../../service/appServiceProxy";
import * as IYoutubePostsService from "../../service/youtube/IYoutubePostsService";

export default {
	Query: {
		async youtubePosts(parent, args) {
			const request: IYoutubePostsService.IGetYoutubePostsRequest = {};
			let response: IYoutubePostsService.IGetYoutubePostsResponse;
			try {
				response = await proxy.youtubePosts.youtubePosts(request);
			} catch (e) {
				throw e;
			}
			return response?.data;
		},
	},
};
