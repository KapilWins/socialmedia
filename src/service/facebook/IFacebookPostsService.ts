import { IResponse } from "../../utils/interface/common";

export interface IFacebookPostsServiceAPI {
	facebookPosts(request: IGetFacebookPostsRequest): Promise<IGetFacebookPostsResponse>;
}

/********************************************************************************
 *  Get FacebookPosts
 ********************************************************************************/
export interface IGetFacebookPostsRequest {}

export interface IGetFacebookPostsResponse extends IResponse {
	data?: [];
}
