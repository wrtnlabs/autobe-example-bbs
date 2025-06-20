import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IUserSettings } from "../../../structures/IUserSettings";
import { IPageIUserSettings } from "../../../structures/IPageIUserSettings";

/**
 * Create new user_settings record (Prisma: user_settings).
 *
 * Creates a record for managing per-user preferences and settings such as
 * language selection, theme (light/dark), notification types/frequency (JSON),
 * and accessibility options (JSON). This operation references the Prisma
 * user_settings table and follows strict business logic to enforce only one
 * record per user (1:1 relationship, unique user_id).
 *
 * Typically used during user registration or when a user customizes their
 * account preferences for the first time. Admins can also create settings for
 * users in support flows. The API requires all atomic, normalized input fields
 * specified in the schema.
 *
 * Related endpoints for retrieval, modification, or deletion are
 * /settings/userSettings PATCH/GET/PUT/DELETE. Errors arise on violation of
 * unique user_id, missing required fields, or unauthorized creation by
 * non-owners/admins.
 *
 * @param props.body Inputs for creation of a user-specific settings record.
 * @path /settings/userSettings
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
    /** Inputs for creation of a user-specific settings record. */
    body: IUserSettings.ICreate;
  };
  export type Body = IUserSettings.ICreate;
  export type Response = IUserSettings;

  export const METADATA = {
    method: "POST",
    path: "/settings/userSettings",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/settings/userSettings";
  export const random = (g?: Partial<typia.IRandomGenerator>): IUserSettings =>
    typia.random<IUserSettings>(g);
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
 * List user_settings records (Prisma: user_settings).
 *
 * Retrieves user_settings for one or multiple users, with optional support for
 * pagination, search, or filtering by user attributes. This operation is
 * essential for both administrative status review and for users wishing to view
 * all their configuration records. The response data includes atomic, per-user
 * preference values (like UI language, theme, notification options), reflecting
 * the normalized structure of the user_settings model.
 *
 * Access may be restricted to the currently authenticated user (for their
 * settings) or to admins (for settings about any user) depending on system
 * policy. The API should validate filters and pagination parameters to maintain
 * efficient queries. Related endpoints allow detailed retrieval, creation,
 * updating, or deletion of individual user settings.
 *
 * This list operation references the user_settings model in the Prisma schema
 * and includes business rules around privacy and security. Combine with
 * /settings/userSettings/{id} GET for individual details.
 *
 * @param props.body Filtering and pagination options for user settings query.
 * @path /settings/userSettings
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
    /** Filtering and pagination options for user settings query. */
    body: IUserSettings.IRequest;
  };
  export type Body = IUserSettings.IRequest;
  export type Response = IPageIUserSettings;

  export const METADATA = {
    method: "PATCH",
    path: "/settings/userSettings",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/settings/userSettings";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IPageIUserSettings => typia.random<IPageIUserSettings>(g);
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
 * Get user_settings by id (Prisma: user_settings).
 *
 * Returns the complete set of personal settings for a given user (by unique
 * settings ID). Primarily accessed by users to fetch or review their
 * configuration, but also available to administrators for support or
 * troubleshooting. The operation retrieves only atomic, non-derived fields, per
 * the design of the user_settings table: UI language, theme, notification
 * options (JSON), accessibility preferences (JSON), and metadata about
 * creation/update times.
 *
 * Business rules may restrict access to this API to the owner and admins only,
 * protecting the privacy of user preferences. If access is unauthorized or the
 * ID does not exist, a suitable error is provided. The endpoint is referenced
 * in flows for profile settings display and account management.
 *
 * Logical relations include the list operation (/settings/userSettings PATCH)
 * and modification endpoints for creation or update.
 *
 * @param props.id Target user_settings record's ID
 * @path /settings/userSettings/:id
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
    /** Target user_settings record's ID */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IUserSettings;

  export const METADATA = {
    method: "GET",
    path: "/settings/userSettings/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/settings/userSettings/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): IUserSettings =>
    typia.random<IUserSettings>(g);
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
 * Update user_settings by id (Prisma: user_settings).
 *
 * Updates an existing user_settings record identified by its unique ID. A user
 * can update configuration such as interface language, color theme,
 * notification preferences (JSON), and accessibility settings (JSON). Business
 * logic ensures only the record owner or an admin can perform this action. All
 * modifications written in compliance with model constraints (unique user_id,
 * only atomic values in each field as per schema).
 *
 * Used primarily during account customization or in self-service flows, but
 * also by admins for support or troubleshooting. The API should validate all
 * fields and update timestamps accordingly. Access is controlled to prevent
 * unauthorized modification.
 *
 * Related endpoints: /settings/userSettings POST (create), PATCH (list/filter),
 * or DELETE (remove) by id.
 *
 * @param props.id Target user_settings record's ID
 * @param props.body Fields to update in the user's preference record.
 * @path /settings/userSettings/:id
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
    /** Target user_settings record's ID */
    id: string & tags.Format<"uuid">;

    /** Fields to update in the user's preference record. */
    body: IUserSettings.IUpdate;
  };
  export type Body = IUserSettings.IUpdate;
  export type Response = IUserSettings;

  export const METADATA = {
    method: "PUT",
    path: "/settings/userSettings/:id",
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
    `/settings/userSettings/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): IUserSettings =>
    typia.random<IUserSettings>(g);
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
 * Delete user_settings by id (Prisma: user_settings).
 *
 * Deletes a specific user_settings record (soft deletion), identified by its
 * unique ID. Used when a user deletes their account, requests settings reset,
 * or is removed by an admin (for support or compliance). The API references the
 * user_settings schema; business logic must ensure only one record exists per
 * user, and enforce per-user access (owner or admin only).
 *
 * Soft deletion sets or clears the record per compliance (may not physically
 * delete in some regimes—mark as deleted instead). Ensures privacy and
 * compliance with data protection requirements. Related endpoints include
 * creation, updating, and searching/listing.
 *
 * If the record is not found or access is forbidden, returns a relevant error
 * code as per business rules.
 *
 * @param props.id Target user_settings record's ID
 * @path /settings/userSettings/:id
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export async function eraseById(
  connection: IConnection,
  props: eraseById.Props,
): Promise<eraseById.Response> {
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
    /** Target user_settings record's ID */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IUserSettings;

  export const METADATA = {
    method: "DELETE",
    path: "/settings/userSettings/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/settings/userSettings/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (g?: Partial<typia.IRandomGenerator>): IUserSettings =>
    typia.random<IUserSettings>(g);
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
    return random(
      "object" === typeof connection.simulate && null !== connection.simulate
        ? connection.simulate
        : undefined,
    );
  };
}
