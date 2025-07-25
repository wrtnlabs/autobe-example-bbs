import { tags } from "typia";

/**
 * Mention(사용자 언급) 엔티티. 한 사용자가 게시물, 댓글, 스레드 등에서 다른 사용자를 '@유저명' 방식으로 언급했을 때 생성되는
 * 이벤트 기록입니다.
 *
 * Prisma discussion_board_mentions 테이블 구조, 주석 참조. 멤버간 직접 언급, 타겟 구분, 컨텍스트 추적 및
 * 알림 UX 연계가 가능합니다. 모든 언급은 발생자, 대상자, 발생 위치, 리소스 타입, 언제 발생했는지 원자적으로 기록됩니다. 중복방지 및
 * 레코드 단일성을 유지합니다.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardMention = {
  /**
   * 고유 식별자. Prisma discussion_board_mentions.id 참조.
   *
   * 각 언급 이벤트를 식별하는 UUID입니다.
   */
  id: string & tags.Format<"uuid">;

  /**
   * 언급된 사용자 ID. Prisma discussion_board_mentions.mentioned_member_id 컬럼.
   *
   * 알림, UX 하이라이트, 통계 분석에서 사용됩니다.
   */
  mentioned_member_id: string & tags.Format<"uuid">;

  /**
   * 언급(멘션)한 사용자(행위자)의 회원 ID. Prisma discussion_board_mentions.actor_member_id
   * 주석 참고.
   *
   * 알림 발신자 및 커뮤니티 활동 분석에 사용됩니다.
   */
  actor_member_id: string & tags.Format<"uuid">;

  /**
   * 언급이 발생한 컨텐츠 구분자. 예: 'post', 'comment', 'thread' 등. 혹은 향후 추가 확장된 값이 허용될 수
   * 있습니다.
   *
   * 실제 리소스 테이블명과 일치할 필요는 없습니다.
   */
  content_type: string;

  /** 언급이 직접 발생한 대상 개별 리소스 식별자. 예: 'b44f4c19-2e46-487c-a870-8916b57e9d72'. */
  content_id: string & tags.Format<"uuid">;

  /**
   * 언급 발생 시각. ISO8601 포맷.
   *
   * UX 정렬, 알림 기한 판단 등에 활용합니다.
   */
  created_at: string & tags.Format<"date-time">;
};
export namespace IDiscussionBoardMention {
  /**
   * Mention(사용자 언급) 검색/조회용 파라미터 스키마입니다. 고급 검색/필터/페이지네이션 모두 지원합니다.
   *
   * Prisma discussion_board_mentions 테이블 주석과 비즈니스 활용 케이스에 따라, 언급을 받은 사람, 한
   * 사람, 컨텐츠 종류, 시점, 목록 등 다양한 필터와 함께 사용 가능합니다.
   *
   * 주요 활용 시나리오는 '내가 언급된 모든 이력', '내가 누구를 얼마나 자주 @멘션 했는지', '특정 게시물/댓글에서 언급된 사람
   * 목록', '특정 기간에 발생한 Mentions' 등입니다.
   *
   * 각 값은 optional이며 필요 시 자동으로 누락 패스가 가능합니다.
   */
  export type IRequest = {
    /**
     * 언급된 대상 사용자 ID. Prisma discussion_board_mentions.mentioned_member_id
     * 컬럼 주석을 참고.
     *
     * 특정 사용자를 기준으로 본인이 언급된 이력만 조회하는 경우 필터로 사용합니다.
     */
    mentioned_member_id?: string & tags.Format<"uuid">;

    /**
     * 언급을 수행한 사용자(행위자)의 ID (Prisma
     * discussion_board_mentions.actor_member_id 참조).
     *
     * 내가 남에게 언급을 많이 했는지, 혹은 특정 사람의 언급만 필터링할 때 활용됩니다.
     */
    actor_member_id?: string & tags.Format<"uuid">;

    /**
     * 언급이 발생한 컨텍스트 또는 리소스 유형. (예시: 'post', 'comment', 'thread' 등의 지원 값이 있을
     * 수 있음)
     *
     * Prisma discussion_board_mentions.content_type 컬럼 주석 참고. 상세 비즈니스 룰에 따라
     * 값이 확장 가능합니다.
     */
    content_type?: string;

    /**
     * 언급이 실제로 발생한 개별 리소스(게시물, 댓글, 스레드 등)의 식별자입니다.
     *
     * 특정 글/thread/post/comment 등에서 발생한 Mentions를 역추적하거나 UI에서 맵핑시 사용됩니다.
     */
    content_id?: string & tags.Format<"uuid">;

    /**
     * 시작 날짜(검색 범위, 시작점 기준)로서 이 시간 이후의 언급만 조회됩니다. ISO 8601 표준. (선택, 미지정 시
     * 전체)
     */
    created_from?: string & tags.Format<"date-time">;

    /**
     * 종료 날짜(검색 범위, 끝 시점 기준)로서 이 시간 이전의 언급만 조회합니다. ISO 8601 표준. (선택, 미지정 시
     * 전체)
     */
    created_to?: string & tags.Format<"date-time">;

    /**
     * 페이지 번호. 0 기반 인덱스가 아니면, 1 기반을 사용한다고 UI에 명시 필요. 기본(옵션) 값 미지정시 1 또는 0.
     * Pagination의 일부분입니다.
     */
    page?: number & tags.Type<"int32">;

    /**
     * 페이지 단위 레코드 개수 제한. 기본값 UI 정책에 따름. 미지정시 20~100 권장. Pagination UX 제어에
     * 사용됩니다.
     */
    limit?: number & tags.Type<"int32">;
  };

  /**
   * Mentions 생성 API에 사용되는 요청 본문 타입입니다. '@멘션' 등에서 사용자간 직접 언급시 호출되는 스키마로, 주로 언급
   * 타겟, 컨텍스트, 위치 등만 명시하면 됩니다.
   *
   * Prisma 테이블 discussion_board_mentions의 주석 및 컬럼 상세 설명과 맞추어, 모든 생성 이벤트는 발생
   * 위치, 대상, 소유주 등을 명확히 기록해야 합니다. 발생자(member_id)는 인증 정보에서 추론(백엔드) 처리됩니다.
   */
  export type ICreate = {
    /**
     * 언급 타겟 회원 ID 값. Prisma discussion_board_mentions.mentioned_member_id
     * 필드에 대응.
     *
     * 특정인의 알림/멘션 UX 연결을 위함. 필수값.
     */
    mentioned_member_id: string & tags.Format<"uuid">;

    /**
     * 멘션이 발생한 위치의 구분자. 예: 'post', 'comment', 'thread' 등. Prisma
     * discussion_board_mentions.content_type 필드.
     *
     * 필수값. 클라이언트에서 유형별로 분기해야 함.
     */
    content_type: string;

    /**
     * 멘션 실제 발생 리소스의 고유 식별자. 해당 위치에 해당하는 UUID.
     *
     * 예: 특정 게시글/댓글/스레드 등. 필수값.
     */
    content_id: string & tags.Format<"uuid">;
  };

  /**
   * Mention Event에 대한 수정 요청 스키마입니다.
   *
   * 주로 인증, 관리, 예외적 감사(예: 잘못된 멘션 복구) 등에서만 일부 필드 갱신이 가능합니다. 실무상 생성 후 수정은 매우
   * 드물지만, 정책상 지원 구조는 보유합니다.
   */
  export type IUpdate = {
    /** 언급 대상자 ID. 관리/감사 목적으로만 변경 가능. */
    mentioned_member_id?: string & tags.Format<"uuid">;

    /** 멘션 발생 위치 변경. 실무상 거의 사용되지 않음. */
    content_type?: string;

    /** 멘션 적용 위치 UUID. 특수한 예외 시 감사 또는 관리자가 조작할 수 있음. */
    content_id?: string & tags.Format<"uuid">;
  };
}
