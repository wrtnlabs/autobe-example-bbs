import { tags } from "typia";

/**
 * 토론게시판 분석 및 통계 집계 데이터 상세.
 *
 * 각 레코드는 단일 기간(구간)/차원/세그먼트 조합에 대한 게시글/댓글/유저수/신고건수 집계입니다. Analytics 및 관리 대시보드의
 * 데이터 소스로 활용.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IDiscussionBoardEngagementStat = {
  /** 포럼 통계 집계 레코드의 PK(UUID). */
  id: string & tags.Format<"uuid">;

  /** 해당 통계가 특정 토픽에 한정되는 경우의 UUID. */
  topic_id?: (string & tags.Format<"uuid">) | null;

  /** 통계 산출 시작 시점(포함). */
  period_start: string & tags.Format<"date-time">;

  /** 통계 산출 종료 시점(포함 또는 정의에 따름). */
  period_end: string & tags.Format<"date-time">;

  /** 통계 집계의 구분 차원 ('site', 'topic', 'role', 'device_type' 등). */
  dimension: string;

  /** 세그먼트 값 (예: dimension=role 일 경우 'admin'/'moderator' 등). */
  segment_value: string;

  /** 지정 기간/구간 내 집계된 게시글 수. */
  post_count: number & tags.Type<"int32">;

  /** 집계 기간 내 전체 댓글(코멘트) 수. */
  comment_count: number & tags.Type<"int32">;

  /** 해당 구간의 고유 활성 사용자(MAU/WAU/DAU 등) 수. */
  active_user_count: number & tags.Type<"int32">;

  /** 해당 기간/구간 내 접수된 리포트 건수(신고/제재 등). */
  report_count: number & tags.Type<"int32">;
};
export namespace IDiscussionBoardEngagementStat {
  /**
   * 포럼 통계(EngagementStat) 검색 및 분석 필터/페이지 요청 타입.
   *
   * 통계 조회시 dimension, 기간, 토픽, 세그먼트별로 필터/집계가 가능합니다.
   */
  export type IRequest = {
    /** 통계 집계 대상을 특정 토픽으로 한정할 때 사용. */
    topic_id?: (string & tags.Format<"uuid">) | null;

    /** 집계 시작 범위(최소값, inclusive). */
    period_start_from?: string & tags.Format<"date-time">;

    /** 집계 종료 범위(최대값, inclusive). */
    period_end_to?: string & tags.Format<"date-time">;

    /** 집계 차원 구분(예: 'site', 'topic', 'role', 'device_type'). */
    dimension?: string;

    /** 세그먼트별 값: 집계 구간을 추가적으로 좁힐 때 사용. */
    segment_value?: string;

    /** 페이지 번호(페이지네이션). */
    page?: number & tags.Type<"int32">;

    /** 페이지당 최대 결과 수. */
    limit?: number & tags.Type<"int32">;
  };

  /**
   * 포럼 통계(분석/집계) 신규 생성 요청 타입.
   *
   * 집계 구간, 기준(dim, segment), 통계 항목별(게시글수, 댓글수, 사용자수, 신고수) 값이 모두 요구됩니다. PK는
   * 자동생성.
   */
  export type ICreate = {
    /** 특정 토픽 관련(구간) 통계만 저장할 경우의 대상 토픽 UUID. */
    topic_id?: (string & tags.Format<"uuid">) | null;

    /** 집계 기간 시작(포함). */
    period_start: string & tags.Format<"date-time">;

    /** 집계 기간 끝(포함/정의에 따름). */
    period_end: string & tags.Format<"date-time">;

    /** 통계 기준 구분 ('site', 'topic', 'role', 'device_type' 등 중 하나). */
    dimension: string;

    /** 세그먼트 값: 예) 'admin', 'member', 구분용 세그먼트. */
    segment_value: string;

    /** 해당 기간 내 게시글(글) 총계. */
    post_count: number & tags.Type<"int32">;

    /** 해당 기간 내 댓글 총계. */
    comment_count: number & tags.Type<"int32">;

    /** 해당 분석기간 내 활성 사용자(고유) 수. */
    active_user_count: number & tags.Type<"int32">;

    /** 동일 구간 내 접수된 신고 총계. */
    report_count: number & tags.Type<"int32">;
  };

  /**
   * 토론게시판 통계/집계 레코드의 수정/수정 요청 데이터 타입입니다.
   *
   * 대상 엔티티는 경로(engagementStatId 등)에서 지정. 수정하고자 하는 필드만 선택적으로 포함.
   */
  export type IUpdate = {
    /** (선택) 통계 집계 대상 토픽(조정/수정시). */
    topic_id?: (string & tags.Format<"uuid">) | null;

    /** 수정될 통계 집계 기간 시작(포함). */
    period_start?: string & tags.Format<"date-time">;

    /** 수정될 집계 기간 종료(포함/정의에 따름). */
    period_end?: string & tags.Format<"date-time">;

    /** 통계 기준 구분 업데이트. */
    dimension?: string;

    /** (선택) 세그먼트 값. */
    segment_value?: string;

    /** 수정시 새로운 게시글 총계. */
    post_count?: number & tags.Type<"int32">;

    /** 수정시 새로운 댓글 총계. */
    comment_count?: number & tags.Type<"int32">;

    /** 수정시 활성 사용자 총계. */
    active_user_count?: number & tags.Type<"int32">;

    /** 수정시 신고 건수. */
    report_count?: number & tags.Type<"int32">;
  };
}
