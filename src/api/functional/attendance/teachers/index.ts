import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IAttendanceTeacher } from "../../../structures/IAttendanceTeacher";
import { IPageAttendanceTeacher } from "../../../structures/IPageAttendanceTeacher";

/**
 * Create a new teacher (attendance_teacher) record.
 *
 * This API adds a new teacher entry in attendance_teacher. Expected request
 * data includes: school_id (required FK), auth_account_id (FK to authentication
 * account), name, email (unique), phone. Validation must ensure unique email,
 * valid school and auth account ids, and required fields. Only authorized roles
 * (admin) can perform this action. If a teacher with this email exists, 409
 * error should be returned. On success, returns created teacher record.
 *
 * @param props.connection
 * @param props.body New teacher entity creation data
 * @path /attendance/teachers
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
    /** New teacher entity creation data */
    body: IAttendanceTeacher.ICreate;
  };
  export type Body = IAttendanceTeacher.ICreate;
  export type Response = IAttendanceTeacher;

  export const METADATA = {
    method: "POST",
    path: "/attendance/teachers",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/attendance/teachers";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceTeacher => typia.random<IAttendanceTeacher>(g);
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
 * Paginated list/search for teachers from attendance_teacher table.
 *
 * This endpoint provides a paginated and searchable list of teachers from the
 * attendance_teacher table. It enables filtering by school, name, or email as
 * needed for school dashboards, admin management, and role assignment. The API
 * supports pagination (limit/offset), search term for name or email, sorting by
 * creation/update date, and additional filters as desired (e.g., by school_id).
 * This operation is secured by role-based access control: only admin and
 * teacher roles may call this endpoint. Input validation ensures only valid
 * filter parameters are accepted. If search yields no results, an empty list is
 * returned with pagination info. For related context, use POST for creation,
 * PUT for update, and DELETE for removal.
 *
 * @param props.connection
 * @param props.body Teacher list search and pagination filter parameters
 * @path /attendance/teachers
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
    /** Teacher list search and pagination filter parameters */
    body: IAttendanceTeacher.IRequest;
  };
  export type Body = IAttendanceTeacher.IRequest;
  export type Response = IPageAttendanceTeacher;

  export const METADATA = {
    method: "PATCH",
    path: "/attendance/teachers",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = () => "/attendance/teachers";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IPageAttendanceTeacher => typia.random<IPageAttendanceTeacher>(g);
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
 * Get single teacher (attendance_teacher) by id.
 *
 * This retrieves a single teacher's information for detailed view, audit, or
 * editing, by attendance_teacher.id (PK, UUID). Data includes all identifying,
 * contact, and linked school/classroom ids, as well as created/updated
 * timestamps. Role-based access enforcement is required (teacher self, admins,
 * possibly school supervisors). If not found or forbidden, 404/403 error
 * returned. Related endpoints include search (PATCH), creation (POST), and
 * update (PUT).
 *
 * @param props.connection
 * @param props.id Target teacher's id (attendance_teacher.id, UUID)
 * @path /attendance/teachers/:id
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
    /** Target teacher's id (attendance_teacher.id, UUID) */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IAttendanceTeacher;

  export const METADATA = {
    method: "GET",
    path: "/attendance/teachers/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/attendance/teachers/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceTeacher => typia.random<IAttendanceTeacher>(g);
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
 * Replace a teacher entity by id (attendance_teacher, PUT).
 *
 * This fully updates a teacher's record by PK id. Expects all necessary teacher
 * data (including school_id, auth_account_id, name, email, phone). Used for
 * corrections or HR-driven replacement of core teacher info. Validates: id
 * exists, new email does not duplicate an existing, all FK references are
 * valid. Authorization required (admin/possibly teacher self-update with
 * restrictions). 404 for not found, 409 for duplicate email. Updates updated_at
 * field on success. Returns updated teacher object.
 *
 * @param props.connection
 * @param props.id Target teacher's id (attendance_teacher.id, UUID)
 * @param props.body Updated teacher replacement data (full)
 * @path /attendance/teachers/:id
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
    /** Target teacher's id (attendance_teacher.id, UUID) */
    id: string & tags.Format<"uuid">;

    /** Updated teacher replacement data (full) */
    body: IAttendanceTeacher.IUpdate;
  };
  export type Body = IAttendanceTeacher.IUpdate;
  export type Response = IAttendanceTeacher;

  export const METADATA = {
    method: "PUT",
    path: "/attendance/teachers/:id",
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
    `/attendance/teachers/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceTeacher => typia.random<IAttendanceTeacher>(g);
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
 * Delete/remove teacher (attendance_teacher) by id.
 *
 * Soft deletes or fully removes a teacher record by id (UUID PK). Only an admin
 * can call this endpoint. Validates: teacher exists, is eligible for deletion
 * (check for linked classrooms, reassign if needed, etc.). May implement soft
 * delete or hard delete based on system policy. Returns 204 or deleted teacher
 * info. Errors include not found (404) or forbidden (403 if not allowed by
 * system constraints). Related endpoints for create/list/update.
 *
 * @param props.connection
 * @param props.id Target teacher id (UUID PK) to delete
 * @path /attendance/teachers/:id
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
    /** Target teacher id (UUID PK) to delete */
    id: string & tags.Format<"uuid">;
  };
  export type Response = IAttendanceTeacher;

  export const METADATA = {
    method: "DELETE",
    path: "/attendance/teachers/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/attendance/teachers/${encodeURIComponent(props.id ?? "null")}`;
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): IAttendanceTeacher => typia.random<IAttendanceTeacher>(g);
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
