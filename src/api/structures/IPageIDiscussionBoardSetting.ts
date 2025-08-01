import { IPage } from "./IPage";
import { IDiscussionBoardSetting } from "./IDiscussionBoardSetting";

/**
 * 게시판 설정 목록에 대한 페이징 응답 컨테이너.
 *
 * 관리자 UI 또는 설정 API 리스트 인터페이스에 사용함.
 *
 * @autobe Generated by AutoBE - https://github.com/wrtnlabs/autobe
 */
export type IPageIDiscussionBoardSetting = {
  /** 페이지네이션 및 메타데이터 정보(현재 페이지, 전체, limit 등). */
  pagination: IPage.IPagination;

  /** 이 페이지 내의 설정 엔티티 목록. */
  data: IDiscussionBoardSetting[];
};
