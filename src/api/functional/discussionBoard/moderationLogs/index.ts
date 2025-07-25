import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IDiscussionBoardModerationLog } from "../../../structures/IDiscussionBoardModerationLog";
import { IPageIDiscussionBoardModerationLog } from "../../../structures/IPageIDiscussionBoardModerationLog";

/**
 * Create a new moderation log entry (discussion_board_moderation_logs table).
 *
 * This endpoint allows authorized moderators and administrators to record a new
 * moderation action, such as hiding, deleting, or warning on threads, posts, or
 * comments. It must reference an existing moderator, specify action type,
 * associated resource, and timestamp.
 *
 * Implements audit and compliance requirements by creating an immutable record
 * in discussion_board_moderation_logs. Input validation ensures foreign keys
 * (moderator_id, thread_id, post_id, comment_id) reference valid and accessible
 * entities.
 *
 * Access is restricted to moderators and admins. All attempts to create log
 * entries are themselves logged for compliance.
 *
 * @param props.connection
 * @param props.body Details for the new moderation log entry to be created.
 * @path /discussionBoard/moderationLogs
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function post(
  connection: IConnection,
  props: post.Props,
): Promise<post.Response> {
  return true === connection.simulate
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
    /** Details for the new moderation log entry to be created. */
    body: IDiscussionBoardModerationLog.ICreate;
  };
  export type Body = IDiscussionBoardModerationLog.ICreate;
  export type Response = IDiscussionBoardModerationLog;

  export const METADATA = {
    method: "POST",
    path: "/discussionBoard/moderationLogs",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/moderationLogs";
  export const random = (): IDiscussionBoardModerationLog =>
    typia.random<IDiscussionBoardModerationLog>();
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
    return random();
  };
}

/**
 * Retrieve a paginated list of discussion board moderation logs
 * (discussion_board_moderation_logs table).
 *
 * This endpoint retrieves a paginated list of moderation log entries for the
 * discussion board. Designed for use by moderators or administrators, it
 * enables efficient review of moderation actions based on filters such as
 * moderator, action type, or target content (thread, post, comment).
 *
 * The endpoint references the discussion_board_moderation_logs table as
 * outlined in the Prisma DB schema. It supports audit and compliance
 * requirements by exposing a detailed history of moderator actions (e.g., hide,
 * delete, warn) with ability to search by timestamp, action type, or target
 * identifier.
 *
 * Security: Authorization is required—only users with moderator or
 * administrator privileges can access this endpoint. Sensitive moderation
 * details are only visible to authorized roles, and all access is logged per
 * non-functional requirements.
 *
 * Validation: All search, filter, and pagination parameters are validated for
 * type and range. The response includes data, total count, and relevant paging
 * information.
 *
 * Business logic: Used for compliance, transparency, and support of audit
 * workflows. This endpoint is typically accompanied by detail, creation, and
 * update endpoints for moderation logs.
 *
 * @param props.connection
 * @param props.body Search and pagination/filter options for querying
 *   moderation logs.
 * @path /discussionBoard/moderationLogs
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function patch(
  connection: IConnection,
  props: patch.Props,
): Promise<patch.Response> {
  return true === connection.simulate
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
    /** Search and pagination/filter options for querying moderation logs. */
    body: IDiscussionBoardModerationLog.IRequest;
  };
  export type Body = IDiscussionBoardModerationLog.IRequest;
  export type Response = IPageIDiscussionBoardModerationLog;

  export const METADATA = {
    method: "PATCH",
    path: "/discussionBoard/moderationLogs",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/moderationLogs";
  export const random = (): IPageIDiscussionBoardModerationLog =>
    typia.random<IPageIDiscussionBoardModerationLog>();
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
    return random();
  };
}

/**
 * Get detailed information for a specific moderation log entry
 * (discussion_board_moderation_logs table).
 *
 * This endpoint fetches detailed information for a single moderation log entry
 * identified by its unique UUID. It allows authorized users—moderators and
 * administrators—to view full context of a specific moderation action,
 * including which moderator initiated the action, the type of action taken,
 * target resource (thread, post, comment), and timestamp.
 *
 * The endpoint is mapped to the discussion_board_moderation_logs schema. Audit
 * and transparency are ensured by exposing all immutable record fields.
 * Sensitive content is only shown to users with elevated permissions.
 *
 * Access control: Restricted to moderator and administrator roles. All access
 * is logged for traceability. If the specified log does not exist or is not
 * accessible due to permissions, an appropriate error is returned.
 *
 * @param props.connection
 * @param props.id Unique identifier of the moderation log entry to retrieve.
 * @path /discussionBoard/moderationLogs/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function getById(
  connection: IConnection,
  props: getById.Props,
): Promise<getById.Response> {
  return true === connection.simulate
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
    /** Unique identifier of the moderation log entry to retrieve. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardModerationLog;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/moderationLogs/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/moderationLogs/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardModerationLog =>
    typia.random<IDiscussionBoardModerationLog>();
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
    return random();
  };
}

/**
 * Update a moderation log entry by ID (discussion_board_moderation_logs table).
 *
 * Allows moderators and administrators to update an existing moderation log
 * entry, such as adding missing context, correcting an action reason, or
 * amending the action details. Full auditing is enforced for changes. The
 * update operation is restricted to authorized roles and requires the entry's
 * UUID.
 *
 * All updates are validated and tracked for compliance, supporting mandatory
 * audit logging and transparency. Update attempts are permission checked and
 * logged for traceability.
 *
 * @param props.connection
 * @param props.id Unique identifier of the moderation log entry to update.
 * @param props.body Fields to update in the moderation log entry.
 * @path /discussionBoard/moderationLogs/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function putById(
  connection: IConnection,
  props: putById.Props,
): Promise<putById.Response> {
  return true === connection.simulate
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
    /** Unique identifier of the moderation log entry to update. */
    id: string & tags.Format<"uuid">;

    /** Fields to update in the moderation log entry. */
    body: IDiscussionBoardModerationLog.IUpdate;
  };
  export type Body = IDiscussionBoardModerationLog.IUpdate;
  export type Response = IDiscussionBoardModerationLog;

  export const METADATA = {
    method: "PUT",
    path: "/discussionBoard/moderationLogs/:id",
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
    `/discussionBoard/moderationLogs/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardModerationLog =>
    typia.random<IDiscussionBoardModerationLog>();
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
    return random();
  };
}

/**
 * Delete a moderation log entry by ID (discussion_board_moderation_logs table).
 *
 * Enables moderators and administrators to delete a moderation log entry,
 * typically for GDPR compliance or error correction in audit trails. Requires
 * UUID of the target entry. Deletions are soft by default to satisfy audit and
 * regulatory requirements—actual erasure is not typically performed without
 * elevated clearance.
 *
 * Enforced role authorization, all access and deletion events are logged.
 * Attempting to delete entries without appropriate privileges or for entries
 * that do not exist results in a meaningful error.
 *
 * @param props.connection
 * @param props.id Unique identifier of the moderation log entry to delete.
 * @path /discussionBoard/moderationLogs/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function eraseById(
  connection: IConnection,
  props: eraseById.Props,
): Promise<eraseById.Response> {
  return true === connection.simulate
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
    /** Unique identifier of the moderation log entry to delete. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardModerationLog.IDeleteResult;

  export const METADATA = {
    method: "DELETE",
    path: "/discussionBoard/moderationLogs/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/moderationLogs/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardModerationLog.IDeleteResult =>
    typia.random<IDiscussionBoardModerationLog.IDeleteResult>();
  export const simulate = (
    connection: IConnection,
    props: eraseById.Props,
  ): Response => {
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
    return random();
  };
}
