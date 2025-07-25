import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IDiscussionBoardMember } from "../../../structures/IDiscussionBoardMember";
import { IPageIDiscussionBoardMember } from "../../../structures/IPageIDiscussionBoardMember";

/**
 * Register a new member account (discussion_board_members).
 *
 * Creates a new user/member account entity, capturing username, email, password
 * hash, display name, optional profile image, and activation state. The
 * operation validates username/email uniqueness, password policy, and possibly
 * sends notification on register. The endpoint enforces privacy compliance, and
 * only exposes non-sensitive fields to non-admins. On creation, it returns the
 * member entity and relevant audit data. Supports onboarding, staff/manual
 * registration, or migration flows.
 *
 * @param props.connection
 * @param props.body Registration data for a new member
 *   (discussion_board_members).
 * @path /discussionBoard/members
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
    /** Registration data for a new member (discussion_board_members). */
    body: IDiscussionBoardMember.ICreate;
  };
  export type Body = IDiscussionBoardMember.ICreate;
  export type Response = IDiscussionBoardMember;

  export const METADATA = {
    method: "POST",
    path: "/discussionBoard/members",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/members";
  export const random = (): IDiscussionBoardMember =>
    typia.random<IDiscussionBoardMember>();
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
 * List members with search/pagination (discussion_board_members).
 *
 * Returns a list of registered member accounts, filtered and paginated
 * according to admin/mod/search criteria. Fields returned match atomic
 * properties in the normalized discussion_board_members schema. Supports query
 * on username, display name, email, activation state, registration date, and
 * more. Only staff with member management rights can access this endpoint.
 * Privacy and data protection rules apply. Designed for use in admin
 * dashboards, moderation panels, and analytics tools.
 *
 * @param props.connection
 * @param props.body Member search/filter parameters for paginated list.
 * @path /discussionBoard/members
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
    /** Member search/filter parameters for paginated list. */
    body: IDiscussionBoardMember.IRequest;
  };
  export type Body = IDiscussionBoardMember.IRequest;
  export type Response = IPageIDiscussionBoardMember;

  export const METADATA = {
    method: "PATCH",
    path: "/discussionBoard/members",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/members";
  export const random = (): IPageIDiscussionBoardMember =>
    typia.random<IPageIDiscussionBoardMember>();
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
 * Get member details by ID (discussion_board_members).
 *
 * Retrieves the property set for an identified member by their account UUID.
 * This is used by admins, moderators, or service agents to view user profile,
 * email, roles, active state, and history in the system. Only privileged staff
 * or the member themselves (if viewing own account) may invoke. Audit trail and
 * privacy protection apply; sensitive data is excluded according to role
 * context. Pulls strictly from the atomic 3NF schema.
 *
 * @param props.connection
 * @param props.id UUID of the member entity/account.
 * @path /discussionBoard/members/:id
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
    /** UUID of the member entity/account. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardMember;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/members/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/members/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardMember =>
    typia.random<IDiscussionBoardMember>();
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
 * Update member profile/account by ID (discussion_board_members).
 *
 * Updates the entity properties of a member (identified by UUID). Admins and
 * (for self-profile) members may invoke the API, provided validation, password
 * policy, and uniqueness rules are enforced. Changes audit timestamps and, as
 * business logic permits, restricts updates to allowed fields per role. The
 * operation references the 3NF schema for members and checks data integrity
 * prior to write. Also ensures role privilege checks if updating
 * roles/activation.
 *
 * @param props.connection
 * @param props.id UUID of the member/account to update.
 * @param props.body Member profile update payload.
 * @path /discussionBoard/members/:id
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
    /** UUID of the member/account to update. */
    id: string & tags.Format<"uuid">;

    /** Member profile update payload. */
    body: IDiscussionBoardMember.IUpdate;
  };
  export type Body = IDiscussionBoardMember.IUpdate;
  export type Response = IDiscussionBoardMember;

  export const METADATA = {
    method: "PUT",
    path: "/discussionBoard/members/:id",
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
    `/discussionBoard/members/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): IDiscussionBoardMember =>
    typia.random<IDiscussionBoardMember>();
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
 * Soft-delete a discussion board member (discussion_board_members).
 *
 * This API endpoint allows administrators to soft-delete a member, marking
 * their profile as deleted without removing posts, votes, or other associated
 * records. The endpoint enforces RBAC: only administrators are authorized. When
 * a delete request arrives, the system checks if the target member exists and
 * is not already deleted. The member's deleted_at field is set to the current
 * timestamp, and their account is deactivated (is_active becomes false for
 * audit/traceability). Attempting to delete an already-deleted or non-existent
 * member returns a suitable error. In case a member is involved in ongoing
 * moderation actions, the soft-delete ensures compliance logs are preserved.
 * Deletion triggers a background notification (eventual consistency) to purge
 * session data and prevent future logins. If the member had moderator/admin
 * privileges, related records in those tables are also soft-deleted.
 *
 * @param props.connection
 * @param props.id Target member's ID (UUID) to delete.
 * @path /discussionBoard/members/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function eraseById(
  connection: IConnection,
  props: eraseById.Props,
): Promise<void> {
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
    /** Target member's ID (UUID) to delete. */
    id: string & tags.Format<"uuid">;
  };

  export const METADATA = {
    method: "DELETE",
    path: "/discussionBoard/members/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/members/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (): void => typia.random<void>();
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
    return random();
  };
}
