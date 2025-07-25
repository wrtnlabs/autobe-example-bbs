import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IDiscussionBoardNotification } from "../../../structures/IDiscussionBoardNotification";
import { IPageIDiscussionBoardNotification } from "../../../structures/IPageIDiscussionBoardNotification";

/**
 * Trigger/create a new (manual/system) notification
 * (discussion_board_notifications table).
 *
 * Create a manual/system notification event sent directly to a user.
 *
 * This endpoint is reserved primarily for administrative/system use cases such
 * as broadcasts, moderator/civil warnings, or test notifications. Only
 * privileged roles can trigger arbitrary notifications. Not used for ordinary
 * comment/reply notifications, which are handled automatically in business
 * logic. Body must specify recipient, type, preview, URL, etc, as per the
 * Prisma comments.
 *
 * Validation rules:
 *
 * - Recipient_member_id and type (category) are required
 * - Manual trigger_actor_id is optional (may be null/system)
 * - Follows all audit and security logging rules.
 *
 * Related endpoints:
 *
 * - PATCH /discussionBoard/notifications (list)
 * - GET /discussionBoard/notifications/{id}
 * - PUT /discussionBoard/notifications/{id} to update read state
 * - DELETE /discussionBoard/notifications/{id} to remove/delete notification
 *
 * All input must be validated for user existence and permission.
 *
 * @param props.connection
 * @param props.body Notification creation payload.
 * @path /discussionBoard/notifications
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
    /** Notification creation payload. */
    body: IDiscussionBoardNotification.ICreate;
  };
  export type Body = IDiscussionBoardNotification.ICreate;
  export type Response = IDiscussionBoardNotification;

  export const METADATA = {
    method: "POST",
    path: "/discussionBoard/notifications",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/notifications";
  export const random = (): IDiscussionBoardNotification =>
    typia.random<IDiscussionBoardNotification>();
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
 * Search and paginate notifications (discussion_board_notifications) for the
 * logged-in user.
 *
 * List and search all notification events for the currently logged-in user.
 *
 * The endpoint supports pagination and filtering, including by read/unread
 * status, notification type, time range, and text search on content_preview.
 * Returns a paginated, sorted list of notifications (unread first, then by most
 * recent as default). This complies with F07 (user notification UX) and privacy
 * requirements so that users can only access their own notifications.
 *
 * Supports advanced sorting and filtering as described in the schema, including
 * delivered_at and created_at. If a notification is deleted (soft-delete), it
 * will not show in standard results unless explicitly filtered.
 *
 * Related API:
 *
 * - GET /discussionBoard/notifications/{id} for notification details
 * - POST /discussionBoard/notifications for manual notification triggers (e.g.,
 *   admin scanning)
 * - PUT /discussionBoard/notifications/{id} for marking as read
 * - DELETE /discussionBoard/notifications/{id} for deleting a notification
 *
 * Role: All authenticated members; administrators/moderators may have
 * additional filters/privilege.
 *
 * @param props.connection
 * @param props.body Search and pagination parameters for notification list.
 * @path /discussionBoard/notifications
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
    /** Search and pagination parameters for notification list. */
    body: IDiscussionBoardNotification.IRequest;
  };
  export type Body = IDiscussionBoardNotification.IRequest;
  export type Response = IPageIDiscussionBoardNotification;

  export const METADATA = {
    method: "PATCH",
    path: "/discussionBoard/notifications",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/notifications";
  export const random = (): IPageIDiscussionBoardNotification =>
    typia.random<IPageIDiscussionBoardNotification>();
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
 * Get a single notification (discussion_board_notifications) by ID for the
 * logged-in user.
 *
 * Retrieve detailed information about a single notification for the requesting
 * user by notification ID.
 *
 * The endpoint validates that the authenticated user is the notification's
 * recipient and enforces privacy and role-based access per requirements.
 * Returns the notification if accessible.
 *
 * Dependencies:
 *
 * - Only return notification if not deleted (deleted_at null) and the user is the
 *   recipient.
 *
 * Related APIs:
 *
 * - PATCH /discussionBoard/notifications for lists
 * - PUT /discussionBoard/notifications/{id} to mark/read/update
 * - DELETE /discussionBoard/notifications/{id} for removal
 *
 * @param props.connection
 * @param props.id Unique notification ID (UUID) to retrieve.
 * @path /discussionBoard/notifications/:id
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
    /** Unique notification ID (UUID) to retrieve. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardNotification;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/notifications/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/notifications/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardNotification =>
    typia.random<IDiscussionBoardNotification>();
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
 * Update (e.g., mark as read) a notification (discussion_board_notifications)
 * by ID.
 *
 * Update mutable fields of notification for the user, by notification ID.
 *
 * Only allowed fields (e.g., 'read', delivered_at, content_preview) can be
 * changed; other fields are fixed after creation. Used mostly for marking
 * notifications as read or updating admin/moderation previews after action
 * taken. Path parameter is the notification's UUID. Must enforce
 * role/ownership/authorization. Audit logging for admin/mod actions, especially
 * if they change notification for another user.
 *
 * Related APIs:
 *
 * - PATCH /discussionBoard/notifications (list)
 * - GET /discussionBoard/notifications/{id}
 * - DELETE /discussionBoard/notifications/{id}
 *
 * Requires strong security and role/ownership checks. Deleted notifications
 * (with deleted_at set) are not modifiable.
 *
 * @param props.connection
 * @param props.id Notification unique ID (UUID) to update.
 * @param props.body Notification update payload (fields allowed: read,
 *   delivered_at, preview).
 * @path /discussionBoard/notifications/:id
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
    /** Notification unique ID (UUID) to update. */
    id: string & tags.Format<"uuid">;

    /**
     * Notification update payload (fields allowed: read, delivered_at,
     * preview).
     */
    body: IDiscussionBoardNotification.IUpdate;
  };
  export type Body = IDiscussionBoardNotification.IUpdate;
  export type Response = IDiscussionBoardNotification;

  export const METADATA = {
    method: "PUT",
    path: "/discussionBoard/notifications/:id",
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
    `/discussionBoard/notifications/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardNotification =>
    typia.random<IDiscussionBoardNotification>();
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
 * Soft-delete a notification (discussion_board_notifications) by ID for the
 * user.
 *
 * Soft-delete (remove) a notification by ID for the user.
 *
 * Only the notification's recipient (member), or an authorized admin/moderator
 * (role check required), can use this endpoint. Marks the notification's
 * deleted_at field for audit/compliance. Deleted notifications may not be
 * returned in normal queries or be marked as read. Clients must not physically
 * erase records as per requirements (audit/compliance).
 *
 * Dependencies:
 *
 * - Notification must exist and be active (deleted_at is null)
 * - Audit/compliance log required on delete action
 * - Permanently removes from user UI, but not database
 *
 * Associated endpoints: PATCH for listing, GET for retrieve, PUT for
 * update/read.
 *
 * @param props.connection
 * @param props.id Notification unique ID (UUID) to remove.
 * @path /discussionBoard/notifications/:id
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
    /** Notification unique ID (UUID) to remove. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardNotification;

  export const METADATA = {
    method: "DELETE",
    path: "/discussionBoard/notifications/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/notifications/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardNotification =>
    typia.random<IDiscussionBoardNotification>();
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
