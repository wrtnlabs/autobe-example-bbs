import { IConnection, HttpError } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia, { tags } from "typia";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";

import { IDiscussionBoardSystemNotice } from "../../../../structures/IDiscussionBoardSystemNotice";

/**
 * Fetch detail for a specific system notice (discussion_board_system_notices)
 * by ID.
 *
 * Provides full details for a single system notice on the discussion board,
 * identified by its unique UUID systemNoticeId. Returns properties defined in
 * the discussion_board_system_notices schema: id, category_id (or null for
 * global), title, body, activation status, scheduling windows (start_at,
 * end_at), and timestamps (created_at, updated_at).
 *
 * Access control: All users can retrieve details for currently active and
 * public notices; only admin and moderator users can retrieve information about
 * inactive, expired, or scheduled future notices. Category association is
 * included if the notice is not global.
 *
 * This endpoint supports admin/moderator workflows, such as editing, auditing
 * or previewing scheduled notices. System integrates with audit log (not shown
 * here) for change traceability. Returns 404 if notice does not exist.
 *
 * Related endpoints: Creation (POST), update (PUT), deletion (DELETE).
 *
 * @param props.connection
 * @param props.systemNoticeId UUID of the system notice to retrieve. Must exist
 *   in discussion_board_system_notices.id.
 * @path /discussionBoard/member/systemNotices/:systemNoticeId
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
    /**
     * UUID of the system notice to retrieve. Must exist in
     * discussion_board_system_notices.id.
     */
    systemNoticeId: string & tags.Format<"uuid">;
  };
  export type Response = IDiscussionBoardSystemNotice;

  export const METADATA = {
    method: "GET",
    path: "/discussionBoard/member/systemNotices/:systemNoticeId",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
  } as const;

  export const path = (props: Props) =>
    `/discussionBoard/member/systemNotices/${encodeURIComponent(props.systemNoticeId ?? "null")}`;
  export const random = (): IDiscussionBoardSystemNotice =>
    typia.random<IDiscussionBoardSystemNotice>();
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
      assert.param("systemNoticeId")(() => typia.assert(props.systemNoticeId));
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
