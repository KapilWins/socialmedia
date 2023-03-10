import * as IFacebookPostsService from "./facebook/IFacebookPostsService";
import * as IInstagramService from "./instagram/IInstagramPostsService";
import * as IYoutubeService from "./youtube/IYoutubePostsService";

import FacebookPostsService from "./facebook/facebookPosts.Service";
import InstagramPostsService from "./instagram/instagramPosts.Service";
import YoutubePostsService from "./youtube/youtubePosts.Service";

export interface IAppServiceProxy {
	facebookPosts: IFacebookPostsService.IFacebookPostsServiceAPI;
	instagramPosts: IInstagramService.IInstagramPostsServiceAPI;
	youtubePosts: IYoutubeService.IYoutubePostsServiceAPI;
}

class AppServiceProxy implements IAppServiceProxy {
	public facebookPosts: IFacebookPostsService.IFacebookPostsServiceAPI;
	public instagramPosts: IInstagramService.IInstagramPostsServiceAPI;
	public youtubePosts: IYoutubeService.IYoutubePostsServiceAPI;

	constructor() {
		this.facebookPosts = new FacebookPostsService(this);
		this.instagramPosts = new InstagramPostsService(this);
		this.youtubePosts = new YoutubePostsService(this);
	}
}

export default new AppServiceProxy();
