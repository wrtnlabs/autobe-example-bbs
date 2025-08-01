import { tags } from "typia";

/**
 * Full notification object sent to or managed for a user in the notification
 * system.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardNotification = {
  /** UUID primary key for the notification row. */
  id: string & tags.Format<"uuid">;

  /** ID of the target user who receives/owns this notification. */
  recipient_id: string & tags.Format<"uuid">;

  /**
   * Reference to the related subscription trigger (if any; null for system
   * notifications).
   */
  subscription_id?: (string & tags.Format<"uuid">) | null;

  /** Type/category of notification ('system', 'reply', 'mention', etc.). */
  notification_type: string;

  /** Type of target entity (e.g., 'thread', 'topic'). */
  target_type: string;

  /** UUID of the notification's related thread/topic/post/etc. */
  target_id: string & tags.Format<"uuid">;

  /** Notification short message or display string. */
  message: string;

  /** Timestamp the notification was delivered (and visible to user). */
  delivered_at: string & tags.Format<"date-time">;

  /** When the user opened/read the notification. Null if still unread. */
  read_at?: (string & tags.Format<"date-time">) | null;

  /** Current delivery status ('delivered', 'pending', 'failed', etc.). */
  delivery_status: string;

  /** Error reason for failed delivery, if any (nullable). */
  failure_reason?: string | null;
};
export namespace IDiscussionBoardNotification {
  /**
   * Request/paging/filter/search criteria for notification queries for a
   * user.
   */
  export type IRequest = {
    /** UUID of the notification's recipient (member user). */
    recipient_id?: string & tags.Format<"uuid">;

    /** (Optional) Related subscription record for filtering notifications. */
    subscription_id?: string & tags.Format<"uuid">;

    /** Filter by notification type (e.g., 'reply', 'system', 'mention'). */
    notification_type?: string;

    /** Only return notifications related to this target entity type. */
    target_type?: string;

    /** Filter notifications by the specific entity they reference. */
    target_id?: string & tags.Format<"uuid">;

    /** Filter by delivery status (e.g., 'delivered', 'failed'). */
    delivery_status?: string;

    /** Return only read/unread notifications. */
    read?: boolean;

    /** Filter notifications delivered on/after this time. */
    delivered_at_from?: string & tags.Format<"date-time">;

    /** Filter notifications delivered before this time. */
    delivered_at_to?: string & tags.Format<"date-time">;

    /** Page number for pagination. */
    page?: number & tags.Type<"int32">;

    /** Results per page. */
    limit?: number & tags.Type<"int32">;
  };

  /** Request structure for creating a new notification event for a user. */
  export type ICreate = {
    /** UUID of member who should receive this notification. */
    recipient_id: string & tags.Format<"uuid">;

    /**
     * Associate the notification with a subscription event (nullable if
     * system-generated).
     */
    subscription_id?: (string & tags.Format<"uuid">) | null;

    /**
     * Type/category for the notification ('reply', 'mention', 'system',
     * etc.).
     */
    notification_type: string;

    /** Target entity type related to the notification. */
    target_type: string;

    /**
     * Target entity UUID (e.g., for the thread/topic/post related to the
     * event).
     */
    target_id: string & tags.Format<"uuid">;

    /** Main message text for display. */
    message: string;

    /** When the notification was delivered (ISO 8601 UTC). */
    delivered_at: string & tags.Format<"date-time">;

    /** Current delivery status (e.g., 'delivered', 'failed'). */
    delivery_status: string;

    /** Reason for failure, if delivery_status = 'failed' (nullable). */
    failure_reason?: string | null;
  };

  /**
   * Request structure for updating a notification event (e.g., when marking
   * as read or handling delivery errors).
   */
  export type IUpdate = {
    /** Updated or new message (for admin edits/corrections). */
    message?: string;

    /** Update the delivery status ('delivered', 'failed', etc.). */
    delivery_status?: string;

    /** Set or change the user read timestamp. */
    read_at?: (string & tags.Format<"date-time">) | null;

    /** Set/clear error/failure reason for delivery. Null to clear. */
    failure_reason?: string | null;
  };
}
