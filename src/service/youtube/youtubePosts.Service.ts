import StatusCodeEnum from "../../utils/enum/StatusCodesEnum";
import * as IYoutubePostsService from "./IYoutubePostsService";
import { IAppServiceProxy } from "../appServiceProxy";
import { toError } from "../../utils/interface/common";
import { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } from "../../env";
import axios from "axios";

export default class YoutubePostsService implements IYoutubePostsService.IYoutubePostsServiceAPI {
	private proxy: IAppServiceProxy;

	constructor(proxy: IAppServiceProxy) {
		this.proxy = proxy;
	}

	/**
	 * Get youtube posts
	 */
	public youtubePosts = async (
		request: IYoutubePostsService.IGetYoutubePostsRequest,
	): Promise<IYoutubePostsService.IGetYoutubePostsResponse> => {
		const response: IYoutubePostsService.IGetYoutubePostsResponse = {
			status: StatusCodeEnum.UNKNOWN_CODE,
		};

		let youtubePosts;
		try {
			youtubePosts = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50&key=${YOUTUBE_API_KEY}`,
			);
		} catch (e) {
			console.error(e);
			response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
			response.error = toError(e.message);
			return response;
		}

		response.status = StatusCodeEnum.OK;
		response.data = youtubePosts?.data?.items;

		return response;
	};
}
