import { tags } from "typia";

import { IDiscussionBoardMember } from "./IDiscussionBoardMember";

/**
 * An administrator assignment entity. Connects a discussion board member with
 * system-wide admin privileges.
 *
 * Follows discussion_board_administrators schema, including assignment,
 * revocation, and related member linkage for UIs.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardAdministrator = {
  /** Administrator assignment ID. */
  id: string & tags.Format<"uuid">;

  /** FK to discussion_board_members.id (the member assigned as admin). */
  member_id: string & tags.Format<"uuid">;

  /** When administrative privileges were assigned. */
  assigned_at: string & tags.Format<"date-time">;

  /** When administrator privileges revoked; null if still active. */
  revoked_at?: (string & tags.Format<"date-time">) | null;

  /**
   * Expanded member details (ID, username, profile, etc) for management
   * panels, referencing discussion_board_members.
   */
  member?: IDiscussionBoardMember;
};
export namespace IDiscussionBoardAdministrator {
  /**
   * Object for filtering/searching administrator assignments. Used for admin
   * dashboards.
   *
   * Supports: time window, member username/email, and revoked status queries.
   */
  export type IRequest = {
    /** Page number for pagination. Default 1. */
    page?: number & tags.Type<"int32"> & tags.Minimum<1>;

    /** Number of records per page (default 20, max 100). */
    limit?: number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<100>;

    /** If true, only show currently active (not revoked) administrators. */
    active_only?: boolean;

    /** Return admins assigned after this timestamp. */
    assigned_after?: string & tags.Format<"date-time">;

    /** Return admins assigned before this timestamp. */
    assigned_before?: string & tags.Format<"date-time">;

    /**
     * Filter administrators whose member username matches this term
     * (partial match).
     */
    username?: string;
  };

  /**
   * Request body for assigning administrator privileges to a member. Used in
   * role escalation flows. Only requires member_id.
   */
  export type ICreate = {
    /** The member's UUID to be assigned as administrator. */
    member_id: string & tags.Format<"uuid">;
  };

  /**
   * Request body for administrative privilege update. Typically used only to
   * set revoked_at timestamp for removal of privileges. Future extensions may
   * allow admin notes/context.
   */
  export type IUpdate = {
    /** Timestamp for revoking admin privileges. Set to now on revocation. */
    revoked_at: (string & tags.Format<"date-time">) | null;
  };
}
