import { tags } from "typia";

/**
 * 알림 이벤트 마스터 엔터티(AttendanceNotification)
 *
 * Prisma attendance_notification 테이블의 모든 atomic 필드 포괄. 출석 이벤트 연동, 학생(자녀),
 * 교사(옵션), 반 정보 모두 FK 참조. message_template은 실제 통지 송신이력에서 베이스가 됨.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IAttendanceNotification = {
  /**
   * 알림 마스터 고유 식별자(UUID, PK)
   *
   * 모든 연관 관계 및 조회/정보수정/감사로그레퍼런스에 활용됩니다.
   */
  id: string & tags.Format<"uuid">;

  /**
   * 본 알림의 트리거가 된 attendance_attendance_record(출석 이벤트) UUID
   *
   * 반드시 FK로 정확한 출석 이벤트에 연결되어야 하며, 트랜잭션 추적에 사용됩니다.
   */
  attendance_record_id: string & tags.Format<"uuid">;

  /**
   * 해당 알림이 참조하는 학생(자녀) UUID.
   *
   * Parent notification 시스템에서는 이 값을 기준으로 수신대상 매핑이 동작합니다. 정합성 보증 필수.
   */
  student_id: string & tags.Format<"uuid">;

  /**
   * 이벤트 생성 주체(교사)의 UUID (nullable)
   *
   * 예: 자동 발송 이벤트는 null, 교사 수동발송·수정시만 실값 입력.
   */
  teacher_id?: (string & tags.Format<"uuid">) | null;

  /**
   * 해당 알림이 속한 학급 UUID.
   *
   * 학생+시간+이벤트 타입 조합에서 클래스별 집계·검색·뷰 구현에 사용.
   */
  classroom_id: string & tags.Format<"uuid">;

  /**
   * 알림 이벤트 유형(고정값): 'present', 'late', 'absent', 'leave' 등
   *
   * 오타/정책 위반 값 불가. 대시보드·지표 등 통계 필터 기준으로 사용.
   */
  event_type: string;

  /**
   * 알림이 트리거된 UTC 시간.
   *
   * 정확한 발생시점, 순번정렬, 기간 통계 등에 필수 key 역할을 합니다.
   */
  triggered_at: string & tags.Format<"date-time">;

  /**
   * 알림 발송 시 사용된 템플릿 문자열(가공 전 메시지)
   *
   * 개별 발송 로그의 실제 메시지 내용은 이 템플릿을 기반으로 가공/기록됨. 템플릿 형식, 변수필드 등 주의.
   */
  message_template: string;
};
export namespace IAttendanceNotification {
  /**
   * 알림 이벤트 마스터(AttendanceNotification) 검색, 리스트 패치 요청용 오브젝트
   *
   * 학생/클래스/이벤트타입/생성일자 기간조건별 페이징+검색에 활용됩니다.
   */
  export type IRequest = {
    /**
     * 알림 검색에서 특정 학생(자녀) 기준 조회시 사용되는 UUID.
     *
     * Attendance_student.id 참조, 없으면 null 또는 미입력. 부모·교사·관리자별 자녀/관할학생 조건조회에
     * 활용.
     */
    student_id?: (string & tags.Format<"uuid">) | null;

    /**
     * 알림 검색에서 특정 학급/classroom 기준 조회시 사용되는 UUID.
     *
     * Attendance_classroom.id 참조. 미입력/null이면 필터링 없음.
     */
    classroom_id?: (string & tags.Format<"uuid">) | null;

    /**
     * 알림 이벤트 유형별(part/전체) 검색을 위한 필드.
     *
     * 'present', 'late', 'absent', 'leave' 등 고정 문자열 값 사용. null은 전체/제외조건 검색.
     */
    event_type?: string | null;

    /**
     * 알림 생성 시간 시작 범위(검색조건). ISO8601 date-time 문자열.
     *
     * 기간검색, 기간 대시보드 등에 활용. null/미입력은 필터없음.
     */
    triggered_from?: (string & tags.Format<"date-time">) | null;

    /**
     * 알림 생성 시간 끝 범위(검색조건). ISO8601 date-time 문자열.
     *
     * Triggered_from와 쌍으로 기간검색시 사용, null/미입력은 제약없음.
     */
    triggered_to?: (string & tags.Format<"date-time">) | null;

    /** 페이지 번호. 기본값 1, 0/미입력/null시 시스템 기본 반영. */
    page?: number | null;

    /** 페이지 당 최대 레코드 수. 미입력/null 시 기본값(보통 100 내외) 적용. */
    limit?: number | null;
  };

  /**
   * 알림 이벤트 마스터(AttendanceNotification) 신규 등록 요청 오브젝트
   *
   * 등록시, 모든 FK/relation이 null일 수 없으며, 교사 직접 생성/관리자 수정 등은 teacher_id에 실존 PK값을
   * 줌. 자동/시스템생성 등은 null.
   */
  export type ICreate = {
    /**
     * 본 알림 트리거의 실제 출석 이벤트(primary key, attendance_attendance_record PK)
     *
     * 연관 출석 이벤트가 반드시 존재/정합성 참조되어야 하며, null 되지 않습니다.
     */
    attendance_record_id: string & tags.Format<"uuid">;

    /**
     * 알림 발생대상 학생(자녀) UUID 값
     *
     * Attendance_student FK, 반드시 null이 아닌 값이 필요합니다.
     */
    student_id: string & tags.Format<"uuid">;

    /**
     * 해당 알림을 수동/직접 생성한 교사 UUID
     *
     * 없거나 시스템 자동이라면 null, 교사 직접일 경우 실 PK.
     */
    teacher_id?: (string & tags.Format<"uuid">) | null;

    /**
     * 알림 트리거 소속 학급 UUID
     *
     * 실제 학생/반/이벤트 코드 모두 올바른 FK가 필요합니다.
     */
    classroom_id: string & tags.Format<"uuid">;

    /**
     * 알림 이벤트 주요 타입 고정값(예: 'present', 'late', 'absent', 'leave' 등)
     *
     * 이벤트 발송 목적에 따라 시스템 정책에 등재된 값만 허용.
     */
    event_type: string;

    /**
     * 알림 트리거 발생 UTC 시각(ISO8601)
     *
     * 이벤트 기준시각 기록, 반드시 실존 시점 지정 필요.
     */
    triggered_at: string & tags.Format<"date-time">;

    /**
     * 실제 알림 메시지 발송 전 템플릿 본문 스트링
     *
     * 알림내용 일관성, 변수치환 등 시스템 구현에 반드시 필요.
     */
    message_template: string;
  };

  /**
   * 알림 마스터(AttendanceNotification) 수정(전체/부분)에 사용하는 오브젝트 타입
   *
   * 교사, 관리자만이 접근 가능하며, PK(id)는 URL/path로, 수정가능 필드 중 변경치만 전달. null 허용필드는 빈값 처리
   * 불가/null만 명확히.
   */
  export type IUpdate = {
    /**
     * 수정할 트리거 출석 이벤트 UUID
     *
     * Attendance_record와의 FK 참조를 갱신/오정정할 때 입력합니다.
     */
    attendance_record_id?: string & tags.Format<"uuid">;

    /**
     * 수정 대상 알림 마스터의 학생(자녀) UUID
     *
     * FK 일관성 위반 방지/정합성 보장을 위한 필드입니다.
     */
    student_id?: string & tags.Format<"uuid">;

    /**
     * 알림 생성/수정 주체 교사 UUID(옵션)
     *
     * 교사 직접관리로 null/변경가능한 값.
     */
    teacher_id?: (string & tags.Format<"uuid">) | null;

    /**
     * 수정 대상 알림 마스터의 학급 UUID
     *
     * FK 변경 시 필요한 필드.
     */
    classroom_id?: string & tags.Format<"uuid">;

    /**
     * 알림 이벤트 타입(예: 'present', 'absent', ...)
     *
     * 기존 이벤트 오기록/정정 등 수정현장 검증.
     */
    event_type?: string;

    /**
     * 알림 이벤트 트리거 시각(UTC, ISO8601)
     *
     * 수정시점 동기화, 데이터 일관성을 위해 반드시 일치해야 함.
     */
    triggered_at?: string & tags.Format<"date-time">;

    /**
     * 알림 메시지 템플릿 텍스트
     *
     * 오타/수정/포맷 변경 등 커뮤니케이션 목적의 필드.
     */
    message_template?: string;
  };

  /**
   * Attendance_notification 엔터티 삭제(알림 삭제) API의 응답 타입입니다. 본 타입은 삭제가 성공적으로
   * 수행되었을 때 클라이언트에 반환하는 데이터 구조로, 실제 정책 및 로직에 따라 삭제 완료 플래그(예: success: true),
   * 삭제된 알림의 식별자, 혹은 audit log/metadata 등의 정보를 포함할 수 있습니다.
   *
   * 표준적 활용 예시:
   *
   * - 알림 삭제 성공 시 응답: { "success": true, "deletedId": "...uuid..." }
   * - 삭제 실패/이미 삭제된 경우: HTTP 상태코드 및 예외 메시지가 별도 처리됨(이 타입에는 포함 X)
   *
   * 업무 정책상, 응답 본문이 비어있거나 삭제된 알림의 최소 식별자만 제공되어도 무관함. 시스템에 따라 소프트 삭제/하드 삭제 정책이
   * 다를 수 있으니 프론트 연동 시 정책 안내 필요.
   *
   * 기본 필드 설명:
   *
   * - Success: 삭제 성공 여부(boolean, true/false).
   * - DeletedId: 실제 삭제 처리된 attendance_notification의 id(UUID).
   */
  export type IDeleteResponse = {
    /**
     * 알림 삭제(탈퇴)가 정상적으로 처리됐는지 여부. true면 삭제 성공, false면 실패(단, 실패 응답 시에는 보통 전체
     * 응답이 에러구조/별도 처리됨).
     *
     * 예시: true
     */
    success: boolean;

    /**
     * 삭제된(소프트 또는 하드 삭제) attendance_notification 엔터티의 PK(uuid)값.
     *
     * 예시: "0d5030c8-3ff4-4a93-8231-6a4c7e987fed"
     */
    deletedId: string & tags.Format<"uuid">;
  };
}
