import { tags } from "typia";

/**
 * 출석 방식(AttendanceAttendanceMethod) 단일 엔티티 스키마
 *
 * Prisma 테이블 attendance_attendance_method의 atomic 필드 전체 포함. 각 방식마다 id(고유값),
 * method_name(방식명), description(설명) 필수입니다.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IAttendanceAttendanceMethod = {
  /**
   * 출석 방식 고유 식별자(UUID)
   *
   * 프라이머리 키, 시스템 내부/프론트 모두 참조용으로 활용됩니다. 절대 중복되지 않는 값이 보장됩니다.
   */
  id: string & tags.Format<"uuid">;

  /**
   * 출석 방식명(예: 'CODE', 'QR', 'MANUAL')
   *
   * 실제 UI 표기, 대시보드, 설정 등에서 방식 선택의 기준 키 값으로 사용합니다. 반드시 유니크 및 표준화된 값만 허용해야 합니다.
   */
  method_name: string;

  /**
   * 출석 방식의 상세 설명입니다.
   *
   * 프론트 UI마다 부가 설명, 관리자 설명서 표기 등에 활용됩니다. 예: '6자리 임의코드 입력', '교사 QR스캔', 'NFC 등
   * 신기술 방식 등'.
   */
  description: string;
};
export namespace IAttendanceAttendanceMethod {
  /**
   * 출석 방식(AttendanceMethod) 리스트 조회 패치 요청 타입
   *
   * 방식명, 설명 등 키워드별 검색, 페이징(page, limit) 등 주요 파라미터를 담는 요청 오브젝트입니다. 사용자는
   * method_name(부분검색), description(부분검색), page, limit 등을 전달할 수 있습니다.
   */
  export type IRequest = {
    /**
     * 출석 방식에 대해 method_name(예: 'CODE', 'QR') 텍스트 검색 수행 시 사용합니다. nullable로
     * 부분 정확 검색 시 활용 가능합니다.
     */
    method_name?: string | null;

    /**
     * 방식 설명(description) 키워드 페이징/검색 시 사용하며, 상세조건(예: '블루투스', 'NFC' 키워드 등)
     * 지정에 활용됩니다.
     */
    description?: string | null;

    /**
     * 페이지 번호입니다.
     *
     * 기본값은 1(혹은 시스템 정책에 따라 정해짐)이며, null일 경우 1페이지로 간주합니다.
     */
    page?: number | null;

    /**
     * 페이지당 최대 레코드 수입니다.
     *
     * 기본값 100 등으로 제한되며, null 입력 시 기본값 적용됩니다.
     */
    limit?: number | null;
  };

  /**
   * 출석 방식 생성 요청 타입(AttendanceAttendanceMethod)
   *
   * 신규 방식 추가 시 필수로 들어가는 핵심 필드(method_name, description)만 포함하여, PK는 서버에서 자동
   * 생성됨. 입력값은 모두 atomic이어야 함.
   */
  export type ICreate = {
    /**
     * 출석 방식명(예: 'CODE', 'QR', 'MANUAL 등')
     *
     * 유니크(중복불가)하고, 시스템 정책상의 표준화된 명칭만 허용됩니다.
     */
    method_name: string;

    /**
     * 해당 출석 방식에 대한 상세 설명 텍스트입니다.
     *
     * 예시: '학생이 직접 임의코드 입력', '교사가 QR코드를 보여주면 스캔', '관리자 직접입력 등'.
     */
    description: string;
  };

  /**
   * 출석 방식(AttendanceAttendanceMethod) 수정(전체변경/put) 요청 타입
   *
   * PK(id)는 Path param으로 별도 전달 수정 가능 필드는 method_name, description 필드이며, 입력 값은
   * atomic해야 합니다. 필수 여부는 상황에 따라 다르지만, 대개 필요 시 부분(null값/누락)은 입력하지 않고, 변경 필드만
   * 전달합니다.
   */
  export type IUpdate = {
    /**
     * 수정할 출석 방식명(예: 'CODE', 'QR', ...)
     *
     * 중복되지 않아야 하며, 실제 정책상 허용된 명칭만 입력해야 합니다.
     */
    method_name?: string;

    /**
     * 수정할 출석 방식의 상세 설명입니다.
     *
     * 기존 방식(예: NFC, QR) 설명 일부 교체 또는 추가 설명 목적입니다.
     */
    description?: string;
  };
}
