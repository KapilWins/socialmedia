import StatusCodeEnum from "../../utils/enum/StatusCodesEnum";
import * as IInstagramPostsService from "./IInstagramPostsService";
import { IAppServiceProxy } from "../appServiceProxy";
import { toError } from "../../utils/interface/common";
import { INSTAGRAM_ACCESS_TOKEN } from "../../env";
import axios from "axios";

export default class InstagramPostsService
	implements IInstagramPostsService.IInstagramPostsServiceAPI
{
	private proxy: IAppServiceProxy;

	constructor(proxy: IAppServiceProxy) {
		this.proxy = proxy;
	}

	/**
	 * Get instagram posts
	 */
	public instagramPosts = async (
		request: IInstagramPostsService.IGetInstagramPostsRequest,
	): Promise<IInstagramPostsService.IGetInstagramPostsResponse> => {
		const response: IInstagramPostsService.IGetInstagramPostsResponse = {
			status: StatusCodeEnum.UNKNOWN_CODE,
		};

		let instagramPosts;
		try {
			instagramPosts = await axios.get(
				`https://graph.instagram.com/me/media?fields=media_count,username,media_type,permalink,media_url,timestamp,caption,thumbnail_url&&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
			);
		} catch (e) {
			console.error(e);
			response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
			response.error = toError(e.message);
			return response;
		}

		response.status = StatusCodeEnum.OK;
		response.data = instagramPosts?.data?.data;

		return response;
	};
}
