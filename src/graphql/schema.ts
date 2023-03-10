import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import facebookPostsResolvers from "./resolvers/facebookPosts.resolvers";
import InstagramPostsResolvers from "./resolvers/instagramPosts.resolvers";
import YoutubePostsResolvers from "./resolvers/youtubePosts.resolvers";

const typeDefs = gql`
	######################################################################
	# Facebook
	######################################################################
	type FacebookPosts {
		message: String
		picture: String
		created_time: String
		name: String
		permalink_url: String
	}
	######################################################################
	# Instagram
	######################################################################
	type InstagramPosts {
		id: String
		username: String
		media_url: String
		caption: String
		timestamp: String
		permalink: String
		media_type: String
		thumbnail_url: String
	}
	######################################################################
	# Youtube
	######################################################################
	type YoutubePosts {
		id: YoutubeId
		snippet: YoutubeSnippet
	}
	type YoutubeId {
		videoId: String
	}
	type YoutubeSnippet {
		publishedAt: String
		title: String
		thumbnails: YoutubeThumbnails
		channelTitle: String
	}
	type YoutubeThumbnails {
		default: YoutubeUrl
		high: YoutubeUrl
	}
	type YoutubeUrl {
		url: String
	}
	######################################################################
	# Spotify
	######################################################################
	type PlaylistItems {
		total: Int
		items: [Playlist]
	}
	type Playlist {
		description: String
		id: String
		type: String
		name: String
		images: [Image]
		external_urls: Url
		owner: Owner
		tracks: Tracks
		total_tracks: Int
		release_date: String
	}
	type Album {
		album_type: String
		external_urls: Url
		id: String
		images: [Image]
		label: String
		name: String
		release_date: String
		type: String
		total_tracks: Int
		tracks: Tracks
	}
	type Image {
		height: Int
		width: Int
		url: String
	}
	type Track {
		id: String
		duration_ms: Int
		name: String
		type: String
		external_urls: Url
		album: Album
	}
	type Items {
		added_at: String
		track: Track
	}
	type Tracks {
		total: Int
		track: [Track]
		items: [Items]
	}
	type Owner {
		display_name: String
		id: String
		external_urls: Url
	}
	type Url {
		spotify: String
	}

	######################################################################
	# Apple Music
	######################################################################
	type AppleMusic {
		id: String
		attributes: Attributes
		relationships: Relationships
	}
	type Attributes {
		description: Description
		name: String
		lastModifiedDate: String
		url: String
		albumName: String
		artistName: String
		durationInMillis: Int
	}
	type Description {
		standard: String
	}
	type Relationships {
		tracks: TrackData
	}
	type TrackData {
		data: [AppleTracks]
	}
	type AppleTracks {
		type: String
		id: String
		attributes: Attributes
	}
	######################################################################
	# Query & Mutation
	######################################################################
	type Query {
		#Facebook
		facebookPosts: [FacebookPosts]

		#Instagram
		instagramPosts: [InstagramPosts]

		#Youtube
		youtubePosts: [YoutubePosts]
	}
`;

export const resolvers = merge(
	facebookPostsResolvers,
	InstagramPostsResolvers,
	YoutubePostsResolvers,
);
export const executableSchema = makeExecutableSchema({
	resolvers: { ...resolvers },
	typeDefs,
});
