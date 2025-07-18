import { tags } from "typia";

/**
 * 출석 코드 이벤트 로그 개별 데이터 타입
 *
 * 복수의 issued, used, expired 등 이벤트, 주체별 상세기록(teacher, student, admin, system 구분)
 * 및 에러 상세 등 감사, 보안, 이상 탐지 등 다양한 현장 수요에 대응
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IAttendanceAttendanceCodeLog = {
  /**
   * PK, 출석 코드 로그 레코드의 식별자
   *
   * Prisma: attendance_attendance_code_log.id
   */
  id: string & tags.Format<"uuid">;

  /**
   * 로그가 귀속된 출석코드 ID
   *
   * Prisma: attendance_attendance_code_log.code_id
   */
  code_id: string & tags.Format<"uuid">;

  /**
   * 이벤트 구분(issued/used/expired/revoked 등 정규화식 설명)
   *
   * Prisma: attendance_attendance_code_log.event_type
   */
  event_type: string;

  /**
   * 실제 이벤트 발생 시점(ISO8601)
   *
   * Prisma: attendance_attendance_code_log.event_time
   */
  event_time: string & tags.Format<"date-time">;

  /**
   * 행위 주체(교사, 학생, 관리자, 시스템 등)의 UUID(정규화/연관없을 시 null)
   *
   * Prisma: attendance_attendance_code_log.actor_id
   */
  actor_id?: (string & tags.Format<"uuid">) | null;

  /**
   * 행위 주체 분류(teacher/student/admin/system 등)
   *
   * Prisma: attendance_attendance_code_log.actor_type
   */
  actor_type: string;

  /**
   * 이벤트 상세/비고(자유서술식/오류 상세 등)
   *
   * Prisma: attendance_attendance_code_log.details
   */
  details?: string | null;
};
export namespace IAttendanceAttendanceCodeLog {
  /**
   * 출석 코드 Log 이력 리스트 검색/페이징용 요청 타입.
   *
   * 코드별 등 복합검색, 이벤트별(issued/used/expired…) 구분, 기간/주체·종류 필터 등 dashboard, 감사,
   * 보안이력 등 다양한 실무에 대응.
   */
  export type IRequest = {
    /**
     * 로그를 검색할 출석코드 PK(uuid)
     *
     * Prisma: attendance_attendance_code_log.code_id
     */
    code_id?: string & tags.Format<"uuid">;

    /**
     * 이벤트 구분(issued/used/expired/revoked 등)
     *
     * Prisma: attendance_attendance_code_log.event_type
     */
    event_type?: string;

    /**
     * 행위 주체(teacher, student, admin, system 등 정규화)
     *
     * Prisma: attendance_attendance_code_log.actor_type
     */
    actor_type?: string;

    /**
     * 이벤트 발생 시점(시작) 범위(YYYY-MM-DD 등)
     *
     * Prisma: attendance_attendance_code_log.event_time >= event_from
     */
    event_from?: string & tags.Format<"date-time">;

    /**
     * 이벤트 발생 시점(끝) 범위(YYYY-MM-DD)
     *
     * Prisma: attendance_attendance_code_log.event_time <= event_to
     */
    event_to?: string & tags.Format<"date-time">;

    /**
     * 페이징-조회할 페이지 인덱스(1-base)
     *
     * 기본=1
     */
    page?: number & tags.Type<"int32">;

    /** 페이지 당 개수 */
    limit?: number & tags.Type<"int32">;

    /** 정렬(Column명/기본 event_time desc 등) */
    sort?: string;
  };

  /**
   * 출석 코드 로그(attendance_attendance_code_log) 신규 이벤트 생성(저장)용 요청 DTO.
   *
   * 이 스키마는 새 코드 이벤트 발생(발급/사용/만료/실패 등)시 시스템·교사·학생 등에서 로그 이력을 기록하기 위한 데이터 구조를
   * 명확히 정의합니다. 필수 필드는 FK(코드), 이벤트타입, 시간, 행위자유형(actor_type) 네 가지입니다. 각 필드는
   * Prisma DB 주석에 기반해 상세한 설명/제약조건을 갖추고 있으며, 참조 무결성(코드), 역할별 상황 구분(행위자),
   * 시각적·감사적 정확성(타임스탬프) 보장이 특징입니다.
   *
   * Nullable 속성(actor_id, details)도 엄밀히 반영하였으며, 실제 실무에서는 업무 정책 또는 시스템 아키텍처에
   * 따라 actor_id=null 시 주로 시스템 자동 이벤트 또는 외부 트리거로 구분하여 감사지표를 구분합니다.
   *
   * 실제 사용 예시는 출석 코드가 최초 발급될 때(event_type='issued'), 학생이 입력해 사용
   * 시(event_type='used'), 자동 만료 시(event_type='expired'), 부정한 사용/오류
   * 시(event_type='failure') 등 업무 프로세스 전 영역을 포괄합니다.
   */
  export type ICreate = {
    /**
     * 출석 코드 로그를 생성할 때 참조되는 attendance_attendance_code 테이블의 고유 식별자(UUID).
     *
     * 해당 필드는 로그의 소속 출석 코드(출결 체크용 1회성 코드)를 명확하게 지정하며, 모든 로그(발급/사용/만료/실패 등)는
     * 반드시 어떤 코드에 귀속되어야 합니다. FK 제약 필수.
     *
     * 예시: '44c6e79d-f379-4323-bef3-cc8579eb5b60'.
     */
    code_id: string & tags.Format<"uuid">;

    /**
     * 특정 출석 코드 로그 이벤트의 타입. 예) 'issued'(발급), 'used'(사용), 'expired'(만료),
     * 'revoked'(폐기), 'failure'(실패). 원자값만 허용하며 케이스 센서티브. 소프트상 enum
     * 관리(문자열)이며, 시스템/감사용으로 확장 가능.
     *
     * 각 이벤트별로 실업무상 의미가 상이하므로, 입력 시 반드시 올바른 비즈니스 컨텍스트(예: 사용 시 'used', 만료 시
     * 'expired' 등)를 준수해야 함.
     *
     * 예시: 'used'.
     */
    event_type: string;

    /**
     * 이 로그 이벤트가 실제로 발생한 타임스탬프(ISO8601/RFC3339).
     *
     * 정확한 시각(예: 실제 발급/사용/만료 등) 기록을 위해 사용하는 표준 시각 필드. 업무상 절대 변경되지 않으며,
     * UTC+시간대 정책을 준수해야 함. 이력이 있는 이벤트의 경우 시스템에서는 이 시각을 기준으로 감사/통계 등을 집계함.
     *
     * 예시: '2025-07-09T15:40:00+09:00'.
     */
    event_time: string & tags.Format<"date-time">;

    /**
     * 이 출석코드 로그 이벤트를 유발한 주체의 UUID. 교사/학생/관리자/시스템 등 다양한 역할 주체와 연결 가능.
     * Nullable(이벤트에 따라 시스템 프로세스 등 비사용자일 수 있음).
     *
     * 폴리모픽 관계(교사, 학생, 관리자, 시스템 등)에 따라 다양한 케이스 허용. 실제 FK 제약은 역할별로 다르게 처리됨(앱상
     * 트래킹을 위함). 예시: 교사 발급 시 교사 id, 학생이 사용 시 학생 id 등. 시스템 자동발급/만료 등 경우에는
     * null.
     */
    actor_id?: (string & tags.Format<"uuid">) | null;

    /**
     * Event_type을 발생시킨 주체의 역할/타입(teacher, student, admin, system).
     *
     * 폴리모픽 행위자 판별과 접근권한 추적을 위함. DB상 atomic string이며, 호출 시점의 역할, 보안 감시, 후행
     * 감사 업무에서 활용함. 예시: 'teacher', 'student', 'admin', 'system'.
     */
    actor_type: string;

    /**
     * 해당 코드 이벤트 로그에 대한 부가설명, 사유, 기술적 에러, 클라이언트/디바이스/기기/IP 등 자유 텍스트. 예:
     * 오류발생, 특정 경고, device info, 추가 설명 등. nullable(특별한 설명 없을 시 null).
     *
     * 이 필드는 모든 상세설명, 네트워크 정보, 오류 메시지, 시스템 에러 트레이스 등 관리자가 참고할 만한 모든 추가 정보
     * 기록용. 민감하지 않은 부가정보 기록 허용.
     */
    details?: string | null;
  };

  /**
   * 출석 코드 로그(이벤트 기록) 수정(update) 요청 오브젝트
   *
   * 출석 코드 라이프사이클 이벤트(발급, 사용, 만료, 오류 등) 수정에 사용됩니다. 참조되는 코드 식별자(code_id), 이벤트
   * 타입(event_type), 발생시간(event_time), 액터 정보 등 올바른 event 기록 정상화 및 감사 목적에
   * 필수적입니다.
   */
  export type IUpdate = {
    /**
     * 출석 코드 로그가 참조하는 대상 코드의 UUID입니다.
     *
     * 이 값은 attendance_attendance_code 테이블의 id 필드와 연결되어, 어떤 출석 코드에 대한 이벤트
     * 로그인지 명확히 식별할 수 있습니다. 수정 API에서 잘못된 코드 매핑 수정이 필요할 때 활용됩니다.
     */
    code_id: string & tags.Format<"uuid">;

    /**
     * 코드 로그 이벤트의 종류를 지정합니다.
     *
     * 예시 값으로는 'issued', 'used', 'expired', 'revoked', 'failure' 등이 있습니다.
     * 비즈니스 정책 및 감사 목적에 따라 세부 구분값을 관리하며, 이벤트 실제 목적에 맞게 정확히 기술해야 합니다.
     */
    event_type: string;

    /**
     * 해당 이벤트가 발생한 정확한 UTC 타임스탬프를 명시합니다.
     *
     * 수정 시에도 정확한 변경/적용 시간 부여가 중요합니다. 즉, event_time은 발생 시각의 ISO8601 문자열이어야
     * 하며, 예: 2025-07-09T15:55:00+09:00 등입니다.
     */
    event_time: string & tags.Format<"date-time">;

    /**
     * 해당 출석 코드 이벤트를 발생시킨 주체의 UUID 식별자입니다.
     *
     * 교사/학생/관리자/시스템 등 여러 객체(다형성)와 매핑될 수 있으며, 실제 값은 context에 따라 다릅니다.
     * nullable로, 수정시 시나리오에 따라 변경할 수 있습니다.
     */
    actor_id?: (string & tags.Format<"uuid">) | null;

    /**
     * 이벤트 주체 유형을 명확히 구분하는 값입니다.
     *
     * 예: 'teacher', 'student', 'admin', 'system' 등 고정값을 사용해야 하며, 프론트엔드에서 액터
     * 표시/로그 연동시 활용됩니다. 테스트, 노출용, 감사용으로 반드시 명확한 구분값 사용 필요.
     */
    actor_type: string;

    /**
     * 해당 이벤트 발생에 대한 상세 비고, 메모 또는 추가 정보 입력란입니다.
     *
     * 이 값은 자유 텍스트(예: IP, 디바이스, 오류 코드 등)로, 보완 설명이나 시스템 트러블슈팅/감사 분석에 주요한 역할을
     * 합니다. 기본적으로 nullable 필드로, 값이 없는 경우 null 처리합니다.
     */
    details?: string | null;
  };
}
