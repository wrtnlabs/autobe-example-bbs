import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IAttendanceAuthSession } from "../../../../structures/IAttendanceAuthSession";
import { IPageIAttendanceAuthSession } from "../../../../structures/IPageIAttendanceAuthSession";

/**
 * Creates a new authentication session (issues token/records login state).
 *
 * Creates a new authentication session record in attendance_auth_session when a
 * user logs in to an application, issues a new access/refresh token, or
 * registers a device. Ensures proper linkage to the user's authentication
 * account, keeps all relevant session metadata (user agent, IP, etc.), and
 * enforces session token uniqueness and security lifetime. Used in every
 * successful login event, including social or local logins. Creation is logged
 * for audit/monitoring purposes. Requires authentication and proper token
 * flows.
 *
 * @param props.connection
 * @param props.body Session creation payload (account linkage, token,
 *   timestamps, device/IP metadata).
 * @path /attendance/auth/sessions
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
    /**
     * Session creation payload (account linkage, token, timestamps,
     * device/IP metadata).
     */
    body: IAttendanceAuthSession.ICreate;
  };
  export type Body = IAttendanceAuthSession.ICreate;
  export type Response = IAttendanceAuthSession;

  export const METADATA = {
    method: "POST",
    path: "/attendance/auth/sessions",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/attendance/auth/sessions";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceAuthSession => typia.random<IAttendanceAuthSession>(g);
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
 * Retrieves a paginated list of authentication sessions with search/filter
 * support.
 *
 * Retrieves a paginated list of issued authentication sessions from
 * attendance_auth_session, with support for filtering (e.g., by account, token,
 * status), sorting, and device context. Used for security/audit dashboards,
 * user account session management, and reviewing currently valid/expired
 * sessions. Requires correct authorization and is typically logged for
 * audit/security policies. Results may include session tokens, device/user
 * agent info, timestamps, and status (active, revoked, expired).
 *
 * @param props.connection
 * @param props.body Pagination and search/filter criteria for session list
 *   retrieval.
 * @path /attendance/auth/sessions
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
    /** Pagination and search/filter criteria for session list retrieval. */
    body: IAttendanceAuthSession.IRequest;
  };
  export type Body = IAttendanceAuthSession.IRequest;
  export type Response = IPageIAttendanceAuthSession;

  export const METADATA = {
    method: "PATCH",
    path: "/attendance/auth/sessions",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/attendance/auth/sessions";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IPageIAttendanceAuthSession =>
    typia.random<IPageIAttendanceAuthSession>(g);
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
 * Retrieves details about a single authentication session by ID.
 *
 * Provides detailed information about an individual authentication session,
 * identified by session UUID. Used for security monitoring, forced logout,
 * device history, or troubleshooting issues such as unauthorized access.
 * Requires bearer authentication and owner/admin permission. Response includes
 * session metadata, token, issued/expires timestamps, device/user_agent/IP
 * details as per schema.
 *
 * @param props.connection
 * @param props.id UUID of the session to retrieve details for.
 * @path /attendance/auth/sessions/:id
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
    /** UUID of the session to retrieve details for. */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IAttendanceAuthSession;

  export const METADATA = {
    method: "GET",
    path: "/attendance/auth/sessions/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/attendance/auth/sessions/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceAuthSession => typia.random<IAttendanceAuthSession>(g);
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
 * Updates an authentication session (metadata/status change, soft revocation)
 * by ID.
 *
 * Allows authorized actors (typically the owner or admin) to update an active
 * session record. Used for forced logouts (setting revoked_at), session
 * extension, or updating device context. Updates never replace the original
 * session token but may record status changes (e.g., revoked, device details
 * edit). All updates audited for security compliance. Field constraints ensure
 * referential/account validity, and security-sensitive fields (token/issued_at)
 * are immutable. Requires bearer token authentication.
 *
 * @param props.connection
 * @param props.id UUID of the authentication session to update.
 * @param props.body Fields to update (e.g., revoke, extend expiry, user agent,
 *   device info).
 * @path /attendance/auth/sessions/:id
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
    /** UUID of the authentication session to update. */
    id: string & tags.Format<"uuid">;

    /**
     * Fields to update (e.g., revoke, extend expiry, user agent, device
     * info).
     */
    body: IAttendanceAuthSession.IUpdate;
  };
  export type Body = IAttendanceAuthSession.IUpdate;
  export type Response = IAttendanceAuthSession;

  export const METADATA = {
    method: "PUT",
    path: "/attendance/auth/sessions/:id",
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
    `/attendance/auth/sessions/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceAuthSession => typia.random<IAttendanceAuthSession>(g);
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
 * Deletes (revokes) a session token in attendance_auth_session (logout/token
 * revoke).
 *
 * This endpoint is used to delete and revoke a user's session token from the
 * attendance_auth_session table, permanently invalidating the specified
 * authentication session for compliance and security. Especially important for
 * account lockout, manual forced logout, or session expiration. Only available
 * to authenticated user roles mapped to attendance_auth_account (student,
 * teacher, parent, admin), and audit evidence is retained (session is flagged
 * as revoked rather than hard-deleted). Useful for situations where a session
 * is potentially compromised or simply needs to be terminated remotely. Linked
 * to attendant access and audit logs, so all deletions are evidence-tracked.
 * Typical error handling covers 401 (no valid token), 403 (insufficient
 * permission), 404 (session id does not exist for actor). This deletion does
 * not affect related role/account data, just the specific session token. For
 * successful deletion, returns 204 No Content, confirming session is now
 * terminated.
 *
 * @param props.connection
 * @param props.id Target session's ID to be deleted (UUID string from
 *   attendance_auth_session table).
 * @path /attendance/auth/sessions/:id
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
    /**
     * Target session's ID to be deleted (UUID string from
     * attendance_auth_session table).
     */
    id: string & tags.Format<"uuid">;
  };

  export const METADATA = {
    method: "DELETE",
    path: "/attendance/auth/sessions/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/attendance/auth/sessions/${encodeURIComponent(props.id ?? "null")}`;
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
