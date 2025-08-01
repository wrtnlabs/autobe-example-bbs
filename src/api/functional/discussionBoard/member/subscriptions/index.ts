import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IPageIDiscussionBoardSubscription } from "../../../../structures/IPageIDiscussionBoardSubscription";
import { IDiscussionBoardSubscription } from "../../../../structures/IDiscussionBoardSubscription";

/**
 * Get a paginated summary list of all subscriptions, with support for
 * filtering, sorting, and pagination.
 *
 * Retrieves a paginated summary listing of all discussion board subscriptions,
 * showing which members are subscribed to which topics or threads. Used by
 * admins for engagement analytics and by users to review their own
 * subscriptions.
 *
 * Supports filtering and sorting by subscriber, target type, or activation
 * status, and includes all attributes from the table such as notification
 * method, creation date, and related references. Only accessible to the
 * subscription owner or to admins for full audit.
 *
 * @param props.connection
 * @path /discussionBoard/member/subscriptions
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function index(connection: IConnection): Promise<index.Response> {
  return true === connection.simulate
    ? index.simulate(connection)
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
          path: index.path(),
          status: null,
        },
      );
}
export namespace index {
  export type Response = IPageIDiscussionBoardSubscription.ISummary;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/member/subscriptions",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/member/subscriptions";
  export const random = (): IPageIDiscussionBoardSubscription.ISummary =>
    typia.random<IPageIDiscussionBoardSubscription.ISummary>();
  export const simulate = (_connection: IConnection): Response => {
    return random();
  };
}

/**
 * Create a new thread/topic subscription for notification delivery to a user.
 *
 * Allows a user to create a new subscription (to a topic or thread) to receive
 * notifications about discussions. Requires specifying subscriber_id,
 * target_type (thread/topic), target_id, delivery method, and whether the
 * subscription is active.
 *
 * Admins can create subscriptions for any user; authenticated members can
 * create only their own subscriptions. All operations are logged for engagement
 * and delivery analytics.
 *
 * For listing or reading subscriptions, use GET, PATCH, or GET
 * /subscriptions/{subscriptionId}.
 *
 * @param props.connection
 * @param props.body Details of the subscription to create, including
 *   subscriber, target, notification method, and activation status.
 * @path /discussionBoard/member/subscriptions
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
          path: create.path(),
          status: null,
        },
        props.body,
      );
}
export namespace create {
  export type Props = {
    /**
     * Details of the subscription to create, including subscriber, target,
     * notification method, and activation status.
     */
    body: IDiscussionBoardSubscription.ICreate;
  };
  export type Body = IDiscussionBoardSubscription.ICreate;
  export type Response = IDiscussionBoardSubscription;

  export const METADATA = {
    method: "POST",
    path: "/discussionBoard/member/subscriptions",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/member/subscriptions";
  export const random = (): IDiscussionBoardSubscription =>
    typia.random<IDiscussionBoardSubscription>();
  export const simulate = (
    connection: IConnection,
    props: create.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: create.path(),
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
 * Search, filter, and paginate subscriptions with moderation and member scoping
 * enforced.
 *
 * Enables users and admins to search subscriptions using advanced filters
 * around user, target type (thread/topic), notification method, or activity.
 * Enforces that non-admin users can only see their own subscriptions.
 *
 * Result includes all attributes used for managing or auditing subscription
 * relationships, supporting engagement analysis and notification delivery
 * controls. Accessible to authenticated users for personal management and to
 * admins for system-wide auditing.
 *
 * @param props.connection
 * @param props.body Filter, pagination, and sort criteria for advanced
 *   subscription listing.
 * @path /discussionBoard/member/subscriptions
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
          path: search.path(),
          status: null,
        },
        props.body,
      );
}
export namespace search {
  export type Props = {
    /**
     * Filter, pagination, and sort criteria for advanced subscription
     * listing.
     */
    body: IDiscussionBoardSubscription.IRequest;
  };
  export type Body = IDiscussionBoardSubscription.IRequest;
  export type Response = IPageIDiscussionBoardSubscription;

  export const METADATA = {
    method: "PATCH",
    path: "/discussionBoard/member/subscriptions",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/discussionBoard/member/subscriptions";
  export const random = (): IPageIDiscussionBoardSubscription =>
    typia.random<IPageIDiscussionBoardSubscription>();
  export const simulate = (
    connection: IConnection,
    props: search.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: search.path(),
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
 * Retrieve details of a specific subscription for the owner or auditing admin.
 *
 * Fetches the complete record for a single subscription entry given its
 * subscriptionId. Shows all properties, including subscriber, target type and
 * id, notification method, timestamps, and status.
 *
 * Non-admin users may access only their own subscription details, with full
 * access given to admins for system-wide audit and support. Related activity
 * (such as notification history) is discoverable from associated endpoints.
 *
 * For modification, use the PUT endpoint. For deletion, use DELETE.
 *
 * @param props.connection
 * @param props.subscriptionId Unique identifier of the target subscription
 *   record.
 * @path /discussionBoard/member/subscriptions/:subscriptionId
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
    /** Unique identifier of the target subscription record. */
    subscriptionId: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardSubscription;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/member/subscriptions/:subscriptionId",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/member/subscriptions/${encodeURIComponent(props.subscriptionId ?? "null")}`;
  export const random = (): IDiscussionBoardSubscription =>
    typia.random<IDiscussionBoardSubscription>();
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
      assert.param("subscriptionId")(() => typia.assert(props.subscriptionId));
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
 * Update an existing user’s subscription, modifying notification method or
 * active status.
 *
 * Updates a subscription record with new details, such as delivery method,
 * activation status, or (if supported) target updates. Only the subscription
 * owner (member) or an admin may update the record. Modifications are
 * audit-logged as per board compliance and notification reliability tracking.
 *
 * Incorrect or unauthorized update attempts are rejected and audit-logged for
 * security compliance. Related notifications and engagement stats automatically
 * reflect updates.
 *
 * @param props.connection
 * @param props.subscriptionId Unique identifier for the subscription to update.
 * @param props.body Details for updating the subscription, including new
 *   delivery method, status, or target assignment.
 * @path /discussionBoard/member/subscriptions/:subscriptionId
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function update(
  connection: IConnection,
  props: update.Props,
): Promise<update.Response> {
  return true === connection.simulate
    ? update.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...update.METADATA,
          path: update.path(props),
          status: null,
        },
        props.body,
      );
}
export namespace update {
  export type Props = {
    /** Unique identifier for the subscription to update. */
    subscriptionId: string & tags.Format<"uuid">;

    /**
     * Details for updating the subscription, including new delivery method,
     * status, or target assignment.
     */
    body: IDiscussionBoardSubscription.IUpdate;
  };
  export type Body = IDiscussionBoardSubscription.IUpdate;
  export type Response = IDiscussionBoardSubscription;

  export const METADATA = {
    method: "PUT",
    path: "/discussionBoard/member/subscriptions/:subscriptionId",
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
    `/discussionBoard/member/subscriptions/${encodeURIComponent(props.subscriptionId ?? "null")}`;
  export const random = (): IDiscussionBoardSubscription =>
    typia.random<IDiscussionBoardSubscription>();
  export const simulate = (
    connection: IConnection,
    props: update.Props,
  ): Response => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: update.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("subscriptionId")(() => typia.assert(props.subscriptionId));
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
 * Permanently delete a specific subscription to stop all future notifications.
 * Hard delete—no soft delete capability.
 *
 * Deletes a user's subscription to a topic or thread, permanently removing the
 * record from the system. This is a hard delete, not soft delete, since there
 * is no deleted_at field on the table.
 *
 * Allowed for the subscription owner or an admin only. Deletion events are
 * audit logged. Access is denied for unauthorized users, and failed attempts
 * are recorded for security monitoring.
 *
 * For modifying, see PUT. For viewing related notifications or logs, see
 * respective endpoints.
 *
 * @param props.connection
 * @param props.subscriptionId Unique identifier of the subscription to delete.
 * @path /discussionBoard/member/subscriptions/:subscriptionId
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function erase(
  connection: IConnection,
  props: erase.Props,
): Promise<void> {
  return true === connection.simulate
    ? erase.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...erase.METADATA,
          path: erase.path(props),
          status: null,
        },
      );
}
export namespace erase {
  export type Props = {
    /** Unique identifier of the subscription to delete. */
    subscriptionId: string & tags.Format<"uuid">;
  };

  export const METADATA = {
    method: "DELETE",
    path: "/discussionBoard/member/subscriptions/:subscriptionId",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/member/subscriptions/${encodeURIComponent(props.subscriptionId ?? "null")}`;
  export const random = (): void => typia.random<void>();
  export const simulate = (
    connection: IConnection,
    props: erase.Props,
  ): void => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: erase.path(props),
      contentType: "application/json",
    });
    try {
      assert.param("subscriptionId")(() => typia.assert(props.subscriptionId));
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
