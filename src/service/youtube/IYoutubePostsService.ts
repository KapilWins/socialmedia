import { IResponse } from "../../utils/interface/common";

export interface IYoutubePostsServiceAPI {
	youtubePosts(request: IGetYoutubePostsRequest): Promise<IGetYoutubePostsResponse>;
}

/********************************************************************************
 *  Get YoutubePosts
 ********************************************************************************/
export interface IGetYoutubePostsRequest {}

export interface IGetYoutubePostsResponse extends IResponse {
	data?: [];
}
