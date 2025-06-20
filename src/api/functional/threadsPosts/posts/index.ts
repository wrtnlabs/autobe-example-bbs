import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IPost } from "../../../structures/IPost";
import { IPageIPost } from "../../../structures/IPageIPost";

/**
 * Create a new post in ThreadsPosts.posts.
 *
 * This endpoint allows a registered user to create a new post (i.e., reply or
 * first post) within a given thread. The request body specifies content and
 * references the target thread. After creation, the system must validate thread
 * existence, creator identity, and content rules (e.g., length, moderation
 * filtering).
 *
 * Upon success, the created post is returned. Creation is logged for moderation
 * and audit. Invalid or unauthorized attempts yield an error. This operation is
 * tightly related to post list, update, and thread detail endpoints.
 *
 * @param props.body Data required for creating a new post.
 * @path /threadsPosts/posts
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function post(
  connection: IConnection,
  props: post.Props,
): Promise<post.Response> {
  return !!connection.simulate
    ? post.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...post.METADATA,
          path: post.path(),
          status: null,
        },
        props.body,
      );
}
export namespace post {
  export type Props = {
    /** Data required for creating a new post. */
    body: IPost.ICreate;
  };
  export type Body = IPost.ICreate;
  export type Response = IPost;

  export const METADATA = {
    method: "POST",
    path: "/threadsPosts/posts",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/threadsPosts/posts";
  export const random = (g?: Partial<typia.IRandomGenerator>): IPost =>
    typia.random<IPost>(g);
  export const simulate = (
    connection: IConnection,
    props: post.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: post.path(),
      contentType: "application/json",
    });
    try {
      assert.body(() => typia.assert(props.body));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * List and search posts with pagination from ThreadsPosts.posts.
 *
 * Retrieves a paginated list of posts, with support for search criteria
 * (keyword, thread ID, creator, flags), sorting (newest, most voted), and
 * client-driven pagination. Posts are the main content entity within threads,
 * each representing a user contribution. Hidden or deleted posts are excluded
 * or restricted based on user permissions and moderation status.
 *
 * Supports unauthenticated access (with limited results) and full access for
 * registered users. Moderators/admins may have expanded view for hidden/deleted
 * content. Enforces business rules regarding pagination limits and query
 * structure. Returns metadata for client navigation along with basic post
 * summaries. Related endpoints include post detail, create, update, and delete
 * APIs.
 *
 * @param props.body Query parameters for post search, filter, and pagination.
 * @path /threadsPosts/posts
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function patch(
  connection: IConnection,
  props: patch.Props,
): Promise<patch.Response> {
  return !!connection.simulate
    ? patch.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...patch.METADATA,
          path: patch.path(),
          status: null,
        },
        props.body,
      );
}
export namespace patch {
  export type Props = {
    /** Query parameters for post search, filter, and pagination. */
    body: IPost.IRequest;
  };
  export type Body = IPost.IRequest;
  export type Response = IPageIPost.ISummary;

  export const METADATA = {
    method: "PATCH",
    path: "/threadsPosts/posts",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/threadsPosts/posts";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IPageIPost.ISummary => typia.random<IPageIPost.ISummary>(g);
  export const simulate = (
    connection: IConnection,
    props: patch.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: patch.path(),
      contentType: "application/json",
    });
    try {
      assert.body(() => typia.assert(props.body));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * Get details of a post from ThreadsPosts.posts by ID.
 *
 * This endpoint returns full details for a single post, including metadata
 * (creator, thread association, timestamps), moderation status, and content
 * versioning references. Posts are referenced by the thread and are the core
 * unit of user contributions in the board.
 *
 * Requires validation of post existence, permissions, and that post is not
 * deleted or hidden, unless accessed by privileged users. Responds with the
 * entire post object, including relationships, for display. Nonexistent or
 * unauthorized access requests result in an error. This endpoint is related to
 * listing, creation, update, and delete APIs for posts.
 *
 * @param props.id Unique identifier of the post to fetch.
 * @path /threadsPosts/posts/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function getById(
  connection: IConnection,
  props: getById.Props,
): Promise<getById.Response> {
  return !!connection.simulate
    ? getById.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...getById.METADATA,
          path: getById.path(props),
          status: null,
        },
      );
}
export namespace getById {
  export type Props = {
    /** Unique identifier of the post to fetch. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IPost;

  export const METADATA = {
    method: "GET",
    path: "/threadsPosts/posts/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/threadsPosts/posts/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): IPost =>
    typia.random<IPost>(g);
  export const simulate = (
    connection: IConnection,
    props: getById.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: getById.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("id")(() => typia.assert(props.id));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * Update post content or metadata in ThreadsPosts.posts by ID.
 *
 * Permits a post owner or authorized moderator to update a post’s
 * non-relational attributes (content, possibly moderation flags). All updates
 * are versioned through 'post_edits', preserving the full history for audit and
 * moderation. The endpoint verifies post existence, authorization, and
 * validates new content per content rules.
 *
 * Update actions are recorded, and the updated post object is returned.
 * Attempts to update a deleted or hidden post, or by unauthorized users, result
 * in an error. Closely related to post creation, versioning (edits), and
 * listing endpoints.
 *
 * @param props.id Unique identifier of the post to update.
 * @param props.body Fields to update for the post, including edit content.
 * @path /threadsPosts/posts/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function putById(
  connection: IConnection,
  props: putById.Props,
): Promise<putById.Response> {
  return !!connection.simulate
    ? putById.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...putById.METADATA,
          path: putById.path(props),
          status: null,
        },
        props.body,
      );
}
export namespace putById {
  export type Props = {
    /** Unique identifier of the post to update. */
    id: string & tags.Format<"uuid">;

    /** Fields to update for the post, including edit content. */
    body: IPost.IUpdate;
  };
  export type Body = IPost.IUpdate;
  export type Response = IPost;

  export const METADATA = {
    method: "PUT",
    path: "/threadsPosts/posts/:id",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Omit<Props, "body">) =>
    `/threadsPosts/posts/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): IPost =>
    typia.random<IPost>(g);
  export const simulate = (
    connection: IConnection,
    props: putById.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: putById.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("id")(() => typia.assert(props.id));
      assert.body(() => typia.assert(props.body));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}

/**
 * Delete (soft-delete) a post from ThreadsPosts.posts by ID.
 *
 * This endpoint allows the owner of the post or authorized moderators to delete
 * (soft-delete) a post, which flags the post as deleted but keeps its data for
 * audit and possible restoration. Associated comments and votes are also
 * retained. Deleted posts are omitted from standard queries to regular users.
 *
 * The operation checks that the post exists and has not already been deleted;
 * unauthorized attempts are rejected. Soft deletion is logged and integrated
 * with moderation workflow. Related endpoints are post creation, update, and
 * detail APIs. Recovery may require admin intervention.
 *
 * @param props.id Unique identifier of the post to delete.
 * @path /threadsPosts/posts/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function eraseById(
  connection: IConnection,
  props: eraseById.Props,
): Promise<void> {
  return !!connection.simulate
    ? eraseById.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...eraseById.METADATA,
          path: eraseById.path(props),
          status: null,
        },
      );
}
export namespace eraseById {
  export type Props = {
    /** Unique identifier of the post to delete. */
    id: string & tags.Format<"uuid">;
  };

  export const METADATA = {
    method: "DELETE",
    path: "/threadsPosts/posts/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/threadsPosts/posts/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): void =>
    typia.random<void>(g);
  export const simulate = (
    connection: IConnection,
    props: eraseById.Props,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: eraseById.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("id")(() => typia.assert(props.id));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
