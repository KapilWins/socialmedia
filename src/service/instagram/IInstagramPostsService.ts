import { IResponse } from "../../utils/interface/common";

export interface IInstagramPostsServiceAPI {
	instagramPosts(request: IGetInstagramPostsRequest): Promise<IGetInstagramPostsResponse>;
}

/********************************************************************************
 *  Get InstagramPosts
 ********************************************************************************/
export interface IGetInstagramPostsRequest {}

export interface IGetInstagramPostsResponse extends IResponse {
	data?: [];
}
