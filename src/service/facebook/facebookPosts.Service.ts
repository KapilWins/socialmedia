import StatusCodeEnum from "../../utils/enum/StatusCodesEnum";
import * as IFacebookPostsService from "./IFacebookPostsService";
import { IAppServiceProxy } from "../appServiceProxy";
import { toError } from "../../utils/interface/common";
import { FACEBOOK_ACCESS_TOKEN } from "../../env";
import { FB } from "fb";

export default class FacebookPostsService
	implements IFacebookPostsService.IFacebookPostsServiceAPI
{
	private proxy: IAppServiceProxy;

	constructor(proxy: IAppServiceProxy) {
		this.proxy = proxy;
	}

	/**
	 * Get facebook posts
	 */
	public facebookPosts = async (
		request: IFacebookPostsService.IGetFacebookPostsRequest,
	): Promise<IFacebookPostsService.IGetFacebookPostsResponse> => {
		const response: IFacebookPostsService.IGetFacebookPostsResponse = {
			status: StatusCodeEnum.UNKNOWN_CODE,
		};

		let facebookPosts;
		try {
			FB.setAccessToken(FACEBOOK_ACCESS_TOKEN);
			const oldFacebookPosts = await FB.api(
				"/100855119579857/feed/?fields=id,from,message,full_picture,shares,created_time,permalink_url",
			);
			facebookPosts = oldFacebookPosts?.data.map((data) => {
				return { picture: data?.full_picture, name: data?.from?.name, ...data };
			});
		} catch (e) {
			console.error(e);
			response.status = StatusCodeEnum.INTERNAL_SERVER_ERROR;
			response.error = toError(e.message);
			return response;
		}
		response.status = StatusCodeEnum.OK;
		response.data = facebookPosts;

		return response;
	};
}
