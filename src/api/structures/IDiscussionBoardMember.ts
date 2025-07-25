import { tags } from "typia";

/**
 * Represents a registered, authenticated user of the discussion board. Derived
 * directly from the discussion_board_members Prisma table.
 *
 * Includes all core identity, profile, and activation fields, including those
 * used for member profile editing, authentication, role assignment, and
 * violation management. All descriptions reference the original Prisma column
 * comments and requirements analysis.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardMember = {
  /** Unique identifier for the member account. */
  id: string & tags.Format<"uuid">;

  /** Unique public identifier for display and search. */
  username: string;

  /** Email address used for system notifications and logins. */
  email: string & tags.Format<"email">;

  /** User's display name as shown on posts, comments, and profile. */
  display_name: string;

  /** URI to member's profile image. */
  profile_image_url?: string & tags.Format<"uri">;

  /** Member account active/inactive status. */
  is_active: boolean;

  /** Timestamp when the member registered. */
  created_at: string & tags.Format<"date-time">;

  /** Last time the member data was changed. */
  updated_at: string & tags.Format<"date-time">;

  /** Timestamp for soft deletion (null if not deleted). */
  deleted_at?: (string & tags.Format<"date-time">) | null;
};
export namespace IDiscussionBoardMember {
  /**
   * Request schema for member listing and advanced search. Admin and
   * moderator panels use it for flexible/targeted recruitment, management,
   * analytics, and audit flows—directly mapping to ERD/requirements for
   * high-performance role-based listing.
   */
  export type IRequest = {
    /**
     * Username filter. String, optional. Supports searching for members by
     * their unique identifier as displayed on profile, post attribution,
     * etc. Designed per ERD and search feature set.
     */
    username?: string | null;

    /**
     * Email address filter for advanced search/audit. Supports member
     * management UI, analytics, and compliance checks. May be restricted
     * based on admin/moderator role. String, must match RFC 5322/email
     * format if present.
     */
    email?: (string & tags.Format<"email">) | null;

    /**
     * Member display name search. Nullable, string. Serves member listing
     * navigation, social search, and admin analytics purposes. As
     * referenced in callouts, post lists, and account UI sections.
     */
    display_name?: string | null;

    /**
     * Boolean filter. Allows filtering members based on active/inactive
     * (banned/deactivated) status, per moderation and suspension/audit
     * requirements.
     */
    is_active?: boolean | null;

    /**
     * Start of creation window for member search. Optional, helps in
     * finding users registered during a particular range for system
     * analytics or audit workflows.
     */
    created_from?: (string & tags.Format<"date-time">) | null;

    /**
     * End of creation window for filtering member entities. Optional.
     * Supports admin-side member management analytics and reporting.
     */
    created_to?: (string & tags.Format<"date-time">) | null;

    /**
     * Pagination: which page/listing index to load. Optional; must be >0 if
     * set. Defaults controlled by UI or system config.
     */
    page?: (number & tags.Type<"int32"> & tags.Minimum<1>) | null;

    /**
     * Pagination: record count per page. Optional; upper-bounded for
     * performance. Defaults controlled by UI requirements or admin-side
     * controls.
     */
    limit?:
      | (number & tags.Type<"int32"> & tags.Minimum<1> & tags.Maximum<100>)
      | null;
  };

  /**
   * Request payload for registering a discussion board member. Enforces
   * constraints, privacy expectations, and onboarding UX/business rules as
   * per system requirements and ERD. Optional profile image; all other
   * properties required at creation. Hashing is pre-enforced externally for
   * password fields.
   */
  export type ICreate = {
    /**
     * Username to be registered. Must be unique within all member entities
     * (see constraints). Required for new account creation.
     */
    username: string;

    /**
     * Member's email for account registration, notification, and recovery
     * workflows. Required and unique per account. Must pass format
     * validation.
     */
    email: string & tags.Format<"email">;

    /**
     * Hashed password (never raw); required for credential management,
     * login enforcement, and security compliance. System must never
     * store/return raw passwords (see ERD comments).
     */
    hashed_password: string;

    /**
     * Member's display name for UI friendliness, required at registration;
     * may be shown publicly in some contexts per privacy policy.
     */
    display_name: string;

    /**
     * Optional profile photo URI at account creation (may be updated
     * later). Supports richer onboarding and profile UX.
     */
    profile_image_url?: string | null;
  };

  /**
   * The structure used to update fields held by a discussion board member in
   * the members table. This aligns with business rules for member update:
   * email, display name, password (hashed), profile image URI, active state.
   * Optionality is enforced based on atomic update capability, and strong
   * audit/traceability is maintained. Used for member self-profile edits or
   * moderator/admin-privileged updates.
   *
   * This schema ensures all updatable member fields are clearly annotated for
   * client/server validation. It references the original Prisma schema for
   * each member attribute and is intended for usage in REST update payloads
   * or admin update flows. All field descriptions are derived from the member
   * table Prisma comments, grouped per business function for UI clarity.
   */
  export type IUpdate = {
    /**
     * The member's unique public username. Used as a display identity, must
     * remain globally unique. From Prisma: 'Member's unique public
     * username... Ensures normalization as user identity is atomic and
     * required.'
     */
    username: string;

    /**
     * The member's email address for notifications, recovery, and
     * authentication. Unique, must be valid, compliant with notification
     * delivery and regulatory (GDPR) requirements. From Prisma: 'Email
     * address for system notifications, password recovery, and
     * authentication purposes... unique per member.'
     */
    email: string & tags.Format<"email">;

    /**
     * Only set if changing password. This is the secure password hash
     * (never the plain password), according to best practices for
     * credential security. Must meet strict complexity and hash algorithm
     * (argon2id, bcrypt, etc) requirement.
     */
    hashed_password: string;

    /**
     * Visible name on the board, friends list, etc. Enables user-facing
     * flexibility. Must be non-empty if provided.
     */
    display_name: string;

    /**
     * URI to a profile image (e.g., CDN address). Optional, used for
     * display in member lists, profile page, comments, post attributions.
     * Must follow valid URI standards. From Prisma: 'Optional URI to
     * member's profile image... example:
     * https://cdn.site.com/profiles/member-42.jpg'
     */
    profile_image_url?: string & tags.Format<"uri">;

    /**
     * Flag whether the account is active/enabled. Used for mod/admin
     * suspension and onboarding. From Prisma: 'Whether the member account
     * is active (able to log in/interact)... false for banned or
     * deactivated members.'
     */
    is_active: boolean;
  };
}
