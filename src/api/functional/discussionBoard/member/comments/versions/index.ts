import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IPageIDiscussionBoardCommentVersion } from "../../../../../structures/IPageIDiscussionBoardCommentVersion";
import { IDiscussionBoardCommentVersion } from "../../../../../structures/IDiscussionBoardCommentVersion";

/**
 * List all edit versions of a specific comment (from
 * discussion_board_comment_versions).
 *
 * Fetch the complete version history of a specific comment, identified by its
 * unique commentId. The returned data includes all revisions, editors (by
 * member), timestamp of each version's creation, and content snapshot per
 * version. This enables members to review or roll back their own edits, while
 * also allowing moderators and admins to audit the editing history for
 * moderation and compliance purposes.
 *
 * Security measures restrict access such that only the comment author, admins,
 * or moderators may view this audit trail. The endpoint maps directly to the
 * comment versioning mechanism described in the Prisma schema, where each
 * comment can have many versions stored in the
 * discussion_board_comment_versions table. Error scenarios are handled for
 * cases where the comment does not exist, no versions are found, or the caller
 * lacks permissions.
 *
 * @param props.connection
 * @param props.commentId Unique identifier (UUID) of the target comment whose
 *   version history is requested.
 * @path /discussionBoard/member/comments/:commentId/versions
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function index(
  connection: IConnection,
  props: index.Props,
): Promise<index.Response> {
  return true === connection.simulate
    ? index.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...index.METADATA,
          path: index.path(props),
          status: null,
        },
      );
}
export namespace index {
  export type Props = {
    /**
     * Unique identifier (UUID) of the target comment whose version history
     * is requested.
     */
    commentId: string & tags.Format<"uuid">;
  };
  export type Response = IPageIDiscussionBoardCommentVersion;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/member/comments/:commentId/versions",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/member/comments/${encodeURIComponent(props.commentId ?? "null")}/versions`;
  export const random = (): IPageIDiscussionBoardCommentVersion =>
    typia.random<IPageIDiscussionBoardCommentVersion>();
  export const simulate = (
    connection: IConnection,
    props: index.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: index.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("commentId")(() => typia.assert(props.commentId));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random();
  };
}

/**
 * Create a new version (edit) for a comment
 * (discussion_board_comment_versions).
 *
 * Append a new version (edit) to a given comment, recording a full snapshot of
 * the edited content, the editor's member ID, and the event timestamp. Only the
 * comment's author, admins, or moderators are permitted to create new comment
 * versions. The operation ensures version sequence continuity and updates the
 * current visible content of the parent comment accordingly.
 *
 * Error handling covers failed permission checks, missing parent comment, and
 * validation failures (e.g., empty or excessively long content). The version
 * record created in discussion_board_comment_versions is also referenced for
 * audit and potential future rollbacks.
 *
 * @param props.connection
 * @param props.commentId Unique identifier (UUID) of the comment being edited
 *   (parent for version creation).
 * @param props.body The new version's content snapshot and editor information.
 * @path /discussionBoard/member/comments/:commentId/versions
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function create(
  connection: IConnection,
  props: create.Props,
): Promise<create.Response> {
  return true === connection.simulate
    ? create.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...create.METADATA,
          path: create.path(props),
          status: null,
        },
        props.body,
      );
}
export namespace create {
  export type Props = {
    /**
     * Unique identifier (UUID) of the comment being edited (parent for
     * version creation).
     */
    commentId: string & tags.Format<"uuid">;

    /** The new version's content snapshot and editor information. */
    body: IDiscussionBoardCommentVersion.ICreate;
  };
  export type Body = IDiscussionBoardCommentVersion.ICreate;
  export type Response = IDiscussionBoardCommentVersion;

  export const METADATA = {
    method: "POST",
    path: "/discussionBoard/member/comments/:commentId/versions",
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
    `/discussionBoard/member/comments/${encodeURIComponent(props.commentId ?? "null")}/versions`;
  export const random = (): IDiscussionBoardCommentVersion =>
    typia.random<IDiscussionBoardCommentVersion>();
  export const simulate = (
    connection: IConnection,
    props: create.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: create.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("commentId")(() => typia.assert(props.commentId));
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
    return random();
  };
}

/**
 * Search and paginate comment versions for a specific comment
 * (discussion_board_comment_versions).
 *
 * Retrieve a filtered, sorted, and paginated list of version records for a
 * specific comment. Search parameters allow filtering by editor_member_id,
 * creation date range, or content keywords, and results can be sorted by
 * created_at or version number. This operation empowers both advanced users
 * (members, admins, moderators) and analytics/reporting modules to efficiently
 * query comment edit histories for compliance and transparency.
 *
 * The Prisma schema's design ensures that discussion_board_comment_versions
 * maintains 3NF with clear separation of audit, member, and content fields.
 * Pagination ensures that long edit histories do not overload the client or UI,
 * and security restrictions guarantee only authorized actors can utilize
 * advanced search.
 *
 * @param props.connection
 * @param props.commentId Unique identifier (UUID) of the comment whose versions
 *   are being searched.
 * @param props.body Search and pagination criteria (editor filter, date range,
 *   content, page, etc) for comment version listing.
 * @path /discussionBoard/member/comments/:commentId/versions
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function search(
  connection: IConnection,
  props: search.Props,
): Promise<search.Response> {
  return true === connection.simulate
    ? search.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...search.METADATA,
          path: search.path(props),
          status: null,
        },
        props.body,
      );
}
export namespace search {
  export type Props = {
    /**
     * Unique identifier (UUID) of the comment whose versions are being
     * searched.
     */
    commentId: string & tags.Format<"uuid">;

    /**
     * Search and pagination criteria (editor filter, date range, content,
     * page, etc) for comment version listing.
     */
    body: IDiscussionBoardCommentVersion.IRequest;
  };
  export type Body = IDiscussionBoardCommentVersion.IRequest;
  export type Response = IPageIDiscussionBoardCommentVersion;

  export const METADATA = {
    method: "PATCH",
    path: "/discussionBoard/member/comments/:commentId/versions",
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
    `/discussionBoard/member/comments/${encodeURIComponent(props.commentId ?? "null")}/versions`;
  export const random = (): IPageIDiscussionBoardCommentVersion =>
    typia.random<IPageIDiscussionBoardCommentVersion>();
  export const simulate = (
    connection: IConnection,
    props: search.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: search.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("commentId")(() => typia.assert(props.commentId));
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
    return random();
  };
}

/**
 * Get a specific comment version by versionId
 * (discussion_board_comment_versions).
 *
 * Fetch and return a specific comment version associated with a commentId and
 * versionId. The API provides a complete snapshot of the comment content as it
 * was at the time of that version, including precise information on the member
 * who performed the edit, and when it was made. This supports both end-user
 * edit history navigation and staff audit purposes.
 *
 * Role-based access control ensures only the comment author, moderators, or
 * admins may view version details. Any attempt to access a non-existent or
 * unauthorized version returns an appropriate error message, maintaining data
 * protection and integrity.
 *
 * @param props.connection
 * @param props.commentId Unique identifier (UUID) of the comment that owns the
 *   version.
 * @param props.versionId Unique identifier (UUID) of the exact comment version
 *   to retrieve.
 * @path /discussionBoard/member/comments/:commentId/versions/:versionId
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function at(
  connection: IConnection,
  props: at.Props,
): Promise<at.Response> {
  return true === connection.simulate
    ? at.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...at.METADATA,
          path: at.path(props),
          status: null,
        },
      );
}
export namespace at {
  export type Props = {
    /** Unique identifier (UUID) of the comment that owns the version. */
    commentId: string & tags.Format<"uuid">;

    /** Unique identifier (UUID) of the exact comment version to retrieve. */
    versionId: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardCommentVersion;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/member/comments/:commentId/versions/:versionId",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/member/comments/${encodeURIComponent(props.commentId ?? "null")}/versions/${encodeURIComponent(props.versionId ?? "null")}`;
  export const random = (): IDiscussionBoardCommentVersion =>
    typia.random<IDiscussionBoardCommentVersion>();
  export const simulate = (
    connection: IConnection,
    props: at.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: at.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("commentId")(() => typia.assert(props.commentId));
      assert.param("versionId")(() => typia.assert(props.versionId));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return random();
  };
}
